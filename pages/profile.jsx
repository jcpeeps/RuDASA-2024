import React, { useState, useEffect } from 'react'
import useUser from './api/useUser'
import Layout from '../components/Layout'
import ClipLoader from "react-spinners/ClipLoader";

// Canonical geography hierarchy — Province → District → Facilities
// Same source of truth used in signUp.jsx
const HIERARCHY = {
    "Eastern Cape": {
        "Alfred Nzo District": ["Greenville Hospital","Khotsong Hospital","Madzikane kaZulu Hospital","Mt Ayliff Hospital","St.Patricks Hospital","Taylor Bequest Hospital"],
        "Amathole District": ["Adelaide FPA Hospital","Bhisho CHH","Butterworth Hospital","Cathcart Hospital","Fort Grey TB Hospital","Komga Hospital","Nkqubela TB Hospital","Nompumelelo Hospital","Nqgamakwe CHC","SS Gida Hospital","Stutterheim FPA Hospital","Tower Hospital","Victoria Hospital"],
        "Buffalo City Metropolitan": ["Cecilia Makiwane Hospital","Dimbaza CHC","Duncan Village Day Hospital","Empilweni Gompo CHC","Frere Hospital","Grey Hospital"],
        "Chris Hani District": ["All Saints Hospital","Cala Hospital","Cofimvaba Hospital","Cradock Hospital","Dordrecht FPA Hospital","Frontier Hospital","Glen Grey Hospital","Hewu Hospital","Indwe FPA Hospital","Komani Hospital","Martjie Venter FPA Hospital","Mjanyana Hospital","Molteno FPA Hospital","Ngonyama CHC","Sterkstroom FPA Hospital","Wilhelm Stahl Hospital"],
        "Joe Gqabi District": ["Aliwal North Hospital","Cloete Joubert Hospital","Empilisweni Hospital","James Town FPA Hospital","Lady Grey Hospital","Maclear FPA Hospital","Steynsburg Hospital"],
        "Nelson Mandela Bay Metropolitan": ["Dora Nginza Hospital","Empilweni TB Hospital","Jose Pearson TB Hospital","Letticia Bam CHC","Livingstone Hospital","Motherwell CHC","Orsmond TB Hospital","Uitenhage Hospital"],
        "OR Tambo District": ["Bambisana Hospital","Baziya CHC","Bevan Goqwana CHC","Canzibe Hospital","Dr Malizo Mpehle Memorial Hospital","Elliotdale CHC","Holly Cross Hospital","Idutywa CHC","Isilimela Hospital","Isipethu Hospital","Madwaleni Hospital","Mhlakulo CHC","Mqanduli CHC","Mthatha General Hospital","Nessie Knight Hospital","Ngcwangube CHC","Ntabankulu CHC","Port St Johns CHC","St. Elizabeth Hospital","St.Barnabas Hospital","Zithulele Hospital"],
        "Sarah Baartman District": ["Aberdeen FPA Hospital","Andries Vosloo Hospital","BJ Voster FPA Hospital","Fort England Hospital","Humansdorp Hospital","Jourbertina CHC","Majorie Parish TB Hospital","Midlands Hospital","Port Alfred CHH","Sawas Memorial FPA Hospital","Settlers Hospital","Sunday Valley FPA Hospital"]
    },
    "Free State": {
        "Lejweleputswa District": ["Katleho Hospital"],
        "Mangaung Metropolitan": ["Botshabelo Hospital"],
        "Thabo Mofutsanyana District": ["Dr J S Moroka Hospital","Elizabeth Ross Hospital","Mantsopa District Hospital","Mofumahadi Manapo Mopeli Hospital","Phekolong Hospital","Thebe Hospital"],
        "Xhariep District": ["Diamond Hospital Complex"]
    },
    "Gauteng": {
        "City of Ekurhuleni Metropolitan": ["Edenvale Hospital","Far East Rand Hospital","Germiston Hospital","Kwa-Thema CHC","Natalspruit Hospital","Nokuthela Ngwenya CHC","Pholosong Hospital","Sizwe Hospital","Tambo Memorial Hospital","Tembisa Hospital"],
        "City of Johannesburg Metropolitan": ["Charlotte Maxeke Academic Hospital","Chris Hani Baragwanath Hospital","Helen Joseph Hospital","Hillbrow CHC","Jabulani CHC","Rahima Moosa Mother and Child Hospital","South Rand Hospital","Tara Hospital"],
        "City of Tshwane Metropolitan": ["Dr George Mukhari Hospital","Jubilee Hospital","Kalafong Hospital","Laudium CHC","Mamelodi Stanza Bopape CHC","Odi Hospital","Pretoria West Hospital","Skinner Street CHC","Soshanguve CHC","Steve Biko Academic Hospital","Tshwane District Hospital","Weskoppies Hospital"],
        "Gert Sibande District": ["Standerton Hospital"],
        "Sedibeng District": ["Boipatong CHC","Heidelberg Hospital","Johan Heyns CHC","Kopanong Hospital","Levay Mbata CHC","Sebokeng Hospital","Sharpville CHC"],
        "West Rand District": ["Carletonville Hospital","Dr Yusuf Dadoo Hospital","Leratong Hospital","Sterkfontein Hospital"]
    },
    "KwaZulu-Natal": {
        "Amajuba District": ["Madadeni Hospital","Newcastle Hospital","Niemeyer Hospital"],
        "Harry Gwala District": ["Christ the King Hospital","East Griqualand and Usher Memorial Hospital","Pholela CHC","Rietvlei Hospital","St Apollinaris Hospital"],
        "King Cetshwayo District": ["Catherine Booth Hospital","Ekombe Hospital","KwaMagwaza Hospital","Lower Umfolozi War Memorial Hospital","Mbongolwane Hospital","Ngwelezana Hospital","Nkandla Hospital"],
        "Ugu District": ["G J Crookes Hospital","Murchison Hospital","St Andrews Hospital"],
        "Zululand District": ["Benedictine Hospital","Ceza Hospital","Itshelejuba Hospital","Nkonjeni Hospital","Vryheid Hospital"],
        "eThekwini Metropolitan": ["Addington Hospital","King Edward VIII Hospital","KwaDabeka CHC","Mahatma Gandhi Memorial Hospital","Osindisweni Hospital","Prince Mshiyeni Memorial Hospital","RK Khan Hospital","Tongaat CHC","Wentworth Hospital"],
        "iLembe District": ["Montebello Hospital","Ndwedwe CHC","Stanger Hospital","Sundumbili CHC","Umphumulo Hospital","Untunjambili Hospital"],
        "uMgungundlovu District": ["Appelsbosch Hospital","Bruntville CHC","Edendale Hospital","Imbalenhle CHC","Northdale Hospital"],
        "uMkhanyakude District": ["Bethesda Hospital","Hlabisa Hospital","Manguzi Hospital","Mosvold Hospital","Mseleni Hospital"],
        "uMzinyathi District": ["Charles Johnson Memorial Hospital","Church of Scotland Hospital","Dundee Hospital","Greytown Hospital"],
        "uThukela District": ["Emmaus Hospital","Estcourt Hospital","Ladysmith Hospital","St Chads CHC"]
    },
    "Limpopo": {
        "Capricorn District": ["Botlokwa Hospital","Helen Franz Hospital","Lebowakgomo Hospital","Mankweng Hospital","Polokwane Hospital","Seshego Hospital","Thabamoopo Hospital","W.F Knobel Hospital","Zebediela Hospital"],
        "Mopani District": ["Dr C.N Phatudi Hospital","Evuxakeni Hospital","Kgapane Hospital","Letaba Hospital","Maphutha L Malatji Hospital","Nkhensani Hospital","Sekororo Hospital","Van Velden Hospital"],
        "Sekhukhune District": ["Dilokong Hospital","Groblersdal Hospital","Jane Furse Hospital","Matlala Hospital","Mecklenburg Hospital","Philadelphia Hospital","St Ritas Hospital"],
        "Vhembe District": ["Donald Fraser Hospital","Elim Hospital","Hayani Hospital","Louis Trichardt Hospital","Malamulele Hospital","Mussina Hospital","Siloam Hospital","Tshilidzini Hospital"],
        "Waterberg District": ["Ellisras Hospital","FH Odendaal Hospital","George Masebe Hospital","Mokopane Hospital","Thabazimbi Hospital","Voortrekker Hospital","Warmbath Hospital"]
    },
    "Mpumalanga": {
        "Ehlanzeni District": ["Barberton Hospital","Lydenburg Hospital","Mapulaneng Hospital","Matibidi Hospital","Matikwana Hospital","Rob Ferreira Hospital","Sabie Hospital","Shongwe Hospital","Themba Hospital","Tintswalo Hospital","Tonga Hospital"],
        "Gert Sibande District": ["Amajuba Hospital","Bethal Hospital","Carolina Hospital","Elsie Ballot Hospital","Embhuleni Hospital","Ermelo Hospital","Evander Hospital","Piet Retief Hospital","Standerton Hospital"],
        "Nkangala District": ["Belfast/HA Grove Hospital","Bernice Samuel Hospital","Impungwe Hospital","KwaMhlanga Hospital","Middleburg Hospital","Mmametlhake Hospital","Waterval Boven Hospital","Witbank Hospital"]
    },
    "North West": {
        "Bojanala Platinum District": ["Brits Hospital","Moses Kotane Hospital","Rustenburg Hospital"],
        "Dr Kenneth Kaunda District": ["Klerksdorp/Tshepong Hospital Complex","Nic Bodenstein Hospital","Potchefstroom Hospital","Witrand Hospital"],
        "Dr Ruth Segomotsi Mompati District": ["Christiana Hospital","Ganyesa Hospital","Schweizer Renecke Hospital","Vryburg Hospital"],
        "Ngaka Modiri Molema District": ["Gelukspan Hospital","General De la Rey Hospital","Mahikeng Provincial Hospital"]
    },
    "Northern Cape": {
        "Frances Baard District": ["Barkly West Hospital","Hartswater Hospital","Jan Kempdorp Hospital","Kimberley Hospital Complex","Warrenton Hospital"],
        "John Taolo Gaetsewe District": ["Kuruman Hospital","Oliphantshoek Hospital","Postmasburg Hospital","Tshwaragano Hospital"],
        "Namakwa District": ["Brandvlei Hospital","Calvinia Hospital","Carnarvon Hospital","Fraserburg CHC","Garies Hospital","Loeriesfontein CHC","Pofadder CHC","Port Nolloth Hospital","Springbok Hospital","Sutherland CHC"],
        "Pixley Ka Seme District": ["Colesberg Hospital","De Aar Hospital","Douglas Hospital","Griekwastad Hospital","Noupoort Hospital","Prieska Hospital","Victoria West Hospital"],
        "ZF Mgcawu District": ["Gordonia Hospital","Grobelaarshoop CHC","Kakamas Hospital","Keimoes Hospital"]
    },
    "Western Cape": {
        "Cape Winelands District": ["Breedevalley Hospital","Brewelskloof Hospital","Paarl Hospital","Worcester Hospital"],
        "Central Karoo District": ["Beaufort West Hospital"],
        "City of Cape Town Metropolitan": ["Alexandra Hospital","Eerste River Hospital","False Bay Hospital","GF Jooste Hospital","Groote Schuur Hospital","Helderberg Hospital","Karl Bremer Hospital","Khayelitsha Hospital","Lentegeur Hospital","Mitchells Plain Hospital","Mowbray Maternity Hospital","New Somerset Hospital","Red Cross Hospital","Tygerberg Hospital","Western Cape Rehabilitation Centre"],
        "Garden Route District": ["George Hospital","Knysna Hospital","Mosselbay Hospital","Oudtshoorn Hospital","Riversdale Hospital","Uniondale Hospital"],
        "Overberg District": ["Caledon Hospital","Hermanus Hospital","Otto Du Plessis Hospital"],
        "West Coast District": ["Cederberg Hospital","Citrusdal Hospital","Clanwilliam Hospital","Lappa Munnik Hospital","Matzikama Hospital","Radie Kotze Hospital","Swartland Hospital","Vredenburg Hospital","Vredendal Hospital","Wesfleur Hospital"]
    }
};

const provinces = Object.keys(HIERARCHY).sort();

export default function Profile() {
    const { user } = useUser({
        redirectTo: '/login',
        redirectIfFound: false
    });

    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadError, setLoadError]           = useState("");
    const [submitting, setSubmitting]         = useState(false);
    const [submitMsg, setSubmitMsg]           = useState("");
    const [submitErr, setSubmitErr]           = useState("");
    const [manualFacility, setManualFacility] = useState(false);

    const [formData, setFormData] = useState({
        province:       "",
        district:       "",
        workPlace:      "",
        jobDescription: "medical-officer",
    });

    // Fetch current profile values once we know who's logged in
    useEffect(() => {
        if (!user || !user.isLoggedIn || !user.email) return;

        async function fetchProfile() {
            try {
                const response = await fetch('/api/sheets', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type: "getProfile", data: { email: user.email } })
                }).then(r => r.json());

                if (response.status === "success") {
                    setFormData({
                        province:       response.data.province       || "",
                        district:       response.data.district       || "",
                        workPlace:      response.data.workPlace      || "",
                        jobDescription: response.data.jobDescription || "medical-officer",
                    });
                    // If the district isn't in our hierarchy under this province,
                    // or workPlace isn't in the list, fall back to manual entry mode
                    const districtList = HIERARCHY[response.data.province]
                        ? Object.keys(HIERARCHY[response.data.province])
                        : [];
                    if (!districtList.includes(response.data.district)) {
                        setManualFacility(true);
                    }
                } else {
                    setLoadError(response.message || "Could not load your profile.");
                }
            } catch (e) {
                setLoadError("Failed to connect to server.");
            } finally {
                setLoadingProfile(false);
            }
        }

        fetchProfile();
    }, [user]);

    const availableDistricts = formData.province && HIERARCHY[formData.province]
        ? Object.keys(HIERARCHY[formData.province]).sort()
        : [];
    const availableFacilities = formData.province && formData.district && HIERARCHY[formData.province]?.[formData.district]
        ? HIERARCHY[formData.province][formData.district]
        : [];

    const handleProvinceChange = (newProvince) => {
        setManualFacility(false);
        setFormData({ ...formData, province: newProvince, district: "", workPlace: "" });
    };

    const handleDistrictChange = (newDistrict) => {
        setManualFacility(false);
        setFormData({ ...formData, district: newDistrict, workPlace: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitMsg("");
        setSubmitErr("");

        if (!formData.province || !formData.district || !formData.workPlace || !formData.jobDescription) {
            setSubmitErr("Please fill in all fields before saving.");
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch('/api/sheets', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "updateProfile",
                    data: {
                        email: user.email,
                        province: formData.province,
                        district: formData.district,
                        workPlace: formData.workPlace,
                        jobDescription: formData.jobDescription,
                    }
                })
            }).then(r => r.json());

            if (response.status === "success") {
                setSubmitMsg("Your profile was updated successfully.");
            } else {
                setSubmitErr(response.message || "Something went wrong. Please try again.");
            }
        } catch (e) {
            setSubmitErr("Failed to connect to server.");
        } finally {
            setSubmitting(false);
        }
    };

    const isLoading = !user || user.isLoggedIn === false;

    return (
        <Layout pageTitle="RuDASA | My Profile">
            <section className="container py-5" style={{ paddingTop: '140px' }}>
                <div className="d-flex flex-column align-items-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h1 className="fw-bold text-primary mb-2">My Profile</h1>

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : loadingProfile ? (
                        <div className="my-5">
                            <ClipLoader color="#3ab57a" size={30} />
                        </div>
                    ) : loadError ? (
                        <p className="text-danger">{loadError}</p>
                    ) : (
                        <>
                            <p className="mb-4 text-center" style={{ color: '#555' }}>
                                Update your workplace details below. Changed jobs, moved facilities, or your role has
                                changed since you signed up? Keep your record accurate so RuDASA can support you correctly.
                            </p>

                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="mb-4">
                                    <label className="text-primary fw-bold form-label">Email</label>
                                    <input type="text" className="form-control border-0 border-bottom" value={user.email} disabled />
                                </div>

                                <div className="row mb-4">
                                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                                        <label className="text-primary fw-bold form-label">Province*</label>
                                        <select className="form-select border-0 border-bottom" value={formData.province}
                                            onChange={(e) => handleProvinceChange(e.target.value)}>
                                            <option value="">— Select Province —</option>
                                            {provinces.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="text-primary fw-bold form-label">District*</label>
                                        <select className="form-select border-0 border-bottom" value={formData.district}
                                            disabled={!formData.province}
                                            onChange={(e) => handleDistrictChange(e.target.value)}>
                                            <option value="">
                                                {formData.province ? "— Select District —" : "— Select Province first —"}
                                            </option>
                                            {availableDistricts.map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-primary fw-bold form-label">Place of Work*</label>
                                    {!manualFacility ? (
                                        <>
                                            <select className="form-select border-0 border-bottom" value={formData.workPlace}
                                                disabled={!formData.district}
                                                onChange={(e) => setFormData({ ...formData, workPlace: e.target.value })}>
                                                <option value="">
                                                    {formData.district ? `— Select Facility (${availableFacilities.length}) —` : "— Select District first —"}
                                                </option>
                                                {availableFacilities.map(f => (
                                                    <option key={f} value={f}>{f}</option>
                                                ))}
                                            </select>
                                            {formData.district && (
                                                <small className="text-muted mt-1 d-block">
                                                    Not in the list?{' '}
                                                    <span className="text-primary" style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                        onClick={() => { setManualFacility(true); setFormData({ ...formData, workPlace: '' }); }}>
                                                        Type it manually
                                                    </span>
                                                </small>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <input type="text" className="form-control border-0 border-bottom" placeholder="Facility name"
                                                value={formData.workPlace}
                                                onChange={(e) => setFormData({ ...formData, workPlace: e.target.value })}
                                            />
                                            {availableFacilities.length > 0 && (
                                                <small className="text-muted mt-1 d-block">
                                                    <span className="text-primary" style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                        onClick={() => setManualFacility(false)}>
                                                        Choose from list instead
                                                    </span>
                                                </small>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="text-primary fw-bold form-label">Job Description*</label>
                                    <select className="form-select border-0 border-bottom" value={formData.jobDescription}
                                        onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}>
                                        <option value="medical-officer">Medical officer/GP</option>
                                        <option value="community-service">Community service</option>
                                        <option value="intern">Intern</option>
                                        <option value="medical-student">Medical student</option>
                                        <option value="academic">Academic/lecturer/trainer</option>
                                        <option value="registrar">Registrar</option>
                                        <option value="consultant">Consultant</option>
                                        <option value="other-health-professional">Other health professional</option>
                                        <option value="non-health-professional">Non health professional</option>
                                    </select>
                                </div>

                                {submitMsg && <p className="text-success fw-bold">{submitMsg}</p>}
                                {submitErr && <p className="text-danger fw-bold">{submitErr}</p>}

                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-lg btn-secondary" disabled={submitting}>
                                        {submitting
                                            ? <ClipLoader color="#fff" size={20} cssOverride={{ margin: "0 15px" }} />
                                            : "Save Changes"
                                        }
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </section>
        </Layout>
    )
}
