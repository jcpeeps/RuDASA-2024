import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import Illustration from '/public/media/svg/login.svg'
import ProgressBar from '../components/signup-login/ProgressBar'
import Benefits from '../components/signup-login/Benefits'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import useUser from './api/useUser'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import fetchJson from '../lib/fetchJson'
import ClipLoader from "react-spinners/ClipLoader";

const { getData: getCountryData } = require('country-list');
const countries = getCountryData().sort((a, b) => a.name.localeCompare(b.name));

// Province now stores full name — no codes
const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape",
];

// Canonical geography hierarchy — Province → District → Facilities
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

export default function SignUp({ data }) {
    const { mutateUser } = useUser({
        redirectTo: '/portal',
        redirectIfFound: true
    });

    const initVals = {
        firstName: "",
        surname: "",
        email: "",
        password: "",
        cellNo: "",
        workNo: "",
        country: "South Africa",    // full name now
        province: "Eastern Cape",   // full name now
        address1: "",
        address2: "",
        address3: "",
        workPlace: "",
        district: "",
        signUpReason: "health-interest",
        jobDescription: "medical-officer",
        employmentArea: 'private-sector',
        workArea: '',
        professionalNumber: '',
        clubName: "",
        uniName: "",
        externalSupport: "false",
        contactName: "",
        contactRole: "",
        contactNo: "",
        contactEmail: "",
        supportName: "",
        privacyPolicy: false
    };

    const [formData, setFormData]           = useState({ ...initVals });
    const [formSubmitErr, setFormSubmitErr] = useState("");
    const [step, setStep]                   = useState(0);
    const [manualFacility, setManualFacility] = useState(false); // toggle for "type it below" mode

    // Derived district + facility lists from hierarchy
    const isSouthAfrica = formData.country === "South Africa";
    const availableDistricts = isSouthAfrica && formData.province && HIERARCHY[formData.province]
        ? Object.keys(HIERARCHY[formData.province]).sort()
        : [];
    const availableFacilities = isSouthAfrica && formData.province && formData.district && HIERARCHY[formData.province]?.[formData.district]
        ? HIERARCHY[formData.province][formData.district]
        : [];

    // Reset district + workPlace when province changes
    const handleProvinceChange = (newProvince) => {
        setManualFacility(false);
        setFormData({ ...formData, province: newProvince, district: "", workPlace: "" });
    };

    // Reset workPlace when district changes
    const handleDistrictChange = (newDistrict) => {
        setManualFacility(false);
        setFormData({ ...formData, district: newDistrict, workPlace: "" });
    };

    const handleSignup = async (vals) => {
        const payload = { type: "signup", data: vals };
        try {
            const response = await fetch('/api/sheets', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }).then(resp => resp.json());

            if (response.status == "error") {
                if ("code" in response) {
                    switch (response.code) {
                        case "emailTaken":
                        case "policyRejected":
                        case "invalidSignup":
                            setFormSubmitErr(response.message);
                            break;
                        default:
                            setFormSubmitErr("Something went wrong while trying to sign up. Please try again later.");
                            break;
                    }
                }
            } else {
                const loginVals = { email: vals.email, password: vals.password };
                const response = await fetchJson('/api/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginVals)
                });
                if (response.status == "failed" && ("code" in response)) {
                    setFormSubmitErr("Something went wrong while trying to log into your new account.\nPlease login manually via the Learning Portal.");
                }
                mutateUser(response);
            }
        } catch (error) {
            setFormSubmitErr("Failed to connect to server");
        }
    };

    let submitShow = false;
    if (step == 3 || (step == 2 && formData.signUpReason !== "rhc"))
        submitShow = true;

    const GeneralSchema = Yup.object().shape({
        firstName: Yup.string()
            .matches(/^([a-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]*)$/gi, 'First name can only contain letters')
            .required("Please enter your first name"),
        surname: Yup.string()
            .matches(/^([a-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]*)$/gi, 'Surname can only contain letters')
            .required("Please enter your surname"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password must contain an uppercase and lowercase letter and a number"),
    });

    const AddressSchema = Yup.object().shape({
        address1: Yup.string().required("Please provide an address"),
        workPlace: Yup.string().required("Place of work is required"),
        district: Yup.string().required("District is required"),
        cellNo: Yup.string()
            .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Invalid phone number')
            .required("Cell no. is required"),
        workNo: Yup.string()
            .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Invalid phone number'),
    });

    const RoleSchema = Yup.object().shape({
        signUpReason: Yup.string(),
        jobDesc: Yup.string(),
        employmentArea: Yup.string(),
        workArea: Yup.string()
            .max(100, "Work area must be less than 100 characters")
            .required("Work area is required"),
        professionalNumber: Yup.string(),
        privacyPolicy: Yup.boolean()
            .when("other", {
                is: () => { return submitShow; },
                then: Yup.boolean().isTrue("Please accept our policies")
            })
    });

    const ClubSchema = Yup.object().shape({
        clubName: Yup.string()
            .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'Club name can only contain letters')
            .required("Please enter your club name"),
        uniName: Yup.string()
            .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'University name can only contain letters')
            .required("University is required"),
        contactName: Yup.string()
            .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'Contact name can only contain letters')
            .required("Name is required"),
        contactRole: Yup.string()
            .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'Contact role can only contain letters')
            .required("Role is required"),
        contactNo: Yup.string()
            .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Invalid phone number'),
        contactEmail: Yup.string().email("Invalid email address").required("Email is required"),
        supportName: Yup.string()
            .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'Name can only contain letters')
            .required("Name is required"),
        privacyPolicy: Yup.boolean().isTrue("Please accept our policies"),
    });

    const Schema = [GeneralSchema, AddressSchema, RoleSchema, ClubSchema];

    return (
        <Layout pageTitle="RuDASA | Sign up" hide="true">
            <section>
                <div className="py-5 mb-5 container"></div>
                <div className="d-flex justify-content-center align-items-start mb-5 pb-5">
                    <Image src={Illustration} className="col-12 col-md-12 col-lg-5 col-xl-5" width={600} height={600} alt="Illustration" />
                    <div className="col-12 col-md-12 col-lg-5 col-xl-5 offset-md-1 offset-lg-1 d-flex flex-column align-items-center">
                        <h1 className="fw-bold w-100 mb-5 text-center text-primary">Sign Up</h1>
                        <ProgressBar step={step} rhc={formData.signUpReason === "rhc"} />
                        <div className="w-auto">
                            <Formik
                                initialValues={{ ...initVals }}
                                validationSchema={Schema[step]}
                                enableReinitialize
                                validateOnMount
                                isInitialValid={false}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true);
                                    await handleSignup(formData);
                                    setSubmitting(false);
                                }}
                            >
                                {({ errors, touched, handleChange, isValid, validateForm, isSubmitting }) => {
                                    //eslint-disable-next-line react-hooks/rules-of-hooks
                                    useEffect(() => {
                                        validateForm();
                                        //eslint-disable-next-line react-hooks/exhaustive-deps
                                    }, [step, submitShow]);

                                    return (
                                        <Form className="px-3 px-md-0">
                                            {
                                                //========== STEP 0 - GENERAL (unchanged) ===========//
                                                step == 0 ?
                                                    <div>
                                                        <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="firstName" className="text-primary fw-bold form-label ms-2">Name*</label>
                                                                <Field type="text" name="firstName" placeholder="First Name"
                                                                    className={`form-control border-0 border-bottom ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                                                                    value={formData.firstName}
                                                                    onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="firstName" className="invalid-feedback" />
                                                            </div>
                                                            <div className="w-auto form-group">
                                                                <label htmlFor="surname" className="text-primary fw-bold form-label ms-2">Surname*</label>
                                                                <Field type="text" name="surname" placeholder="Surname"
                                                                    className={`form-control border-0 border-bottom ${touched.surname && errors.surname ? "is-invalid" : ""}`}
                                                                    value={formData.surname}
                                                                    onChange={(e) => { setFormData({ ...formData, surname: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="surname" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                        <div className="mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="email" className="text-primary fw-bold form-label ms-2">Email Address*</label>
                                                                <Field type="email" name="email" placeholder="Email"
                                                                    className={`form-control border-0 border-bottom ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                                    value={formData.email}
                                                                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormSubmitErr(""); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="email" className="invalid-feedback" />
                                                            </div>
                                                            <div className="w-auto form-group">
                                                                <label htmlFor="password" id="password-tooltip" className="text-primary fw-bold form-label ms-2">
                                                                    Password*
                                                                    <span className="text-muted fw-normal ms-2 tooltip-text">
                                                                        ?
                                                                        <ReactTooltip anchorId="password-tooltip" place="right" content="For the members-only portal" />
                                                                    </span>
                                                                </label>
                                                                <Field type="password" name="password" placeholder="Password"
                                                                    className={`form-control border-0 border-bottom ${touched.password && errors.password ? "is-invalid" : ""}`}
                                                                    value={formData.password}
                                                                    onChange={(e) => { setFormData({ ...formData, password: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="password" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                //========== STEP 1 - ADDRESS (cascading dropdowns added) ===========//
                                                : step == 1 ?
                                                    <div>
                                                        {/* Country and Province */}
                                                        <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="country" className="text-primary fw-bold form-label">Country*</label>
                                                                <select id="country" className="form-select border-0 border-bottom" value={formData.country}
                                                                    onChange={(e) => setFormData({ ...formData, country: e.target.value, province: "Eastern Cape", district: "", workPlace: "" })}>
                                                                    {countries.map(c => (
                                                                        <option key={c.code} value={c.name}>{c.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            {isSouthAfrica &&
                                                                <div className="w-auto form-group" style={{ minWidth: '45%' }}>
                                                                    <label htmlFor="province" className="text-primary fw-bold form-label">Province*</label>
                                                                    <select id="province" className="form-select border-0 border-bottom" value={formData.province}
                                                                        onChange={(e) => handleProvinceChange(e.target.value)}>
                                                                        {provinces.map(name => (
                                                                            <option key={name} value={name}>{name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            }
                                                        </div>

                                                        {/* Phone numbers (unchanged) */}
                                                        <div className="mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="cellNo" className="text-primary fw-bold form-label ms-2">Cellphone number*</label>
                                                                <Field type="tel" name="cellNo" placeholder="Number"
                                                                    className={`form-control border-0 border-bottom ${touched.cellNo && errors.cellNo ? "is-invalid" : ""}`}
                                                                    value={formData.cellNo}
                                                                    onChange={(e) => { setFormData({ ...formData, cellNo: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="cellNo" className="invalid-feedback" />
                                                            </div>
                                                            <div className="w-auto form-group">
                                                                <label htmlFor="workNo" className="text-primary fw-bold form-label ms-2">Work Telephone</label>
                                                                <Field type="tel" name="workNo" placeholder="Number"
                                                                    className={`form-control border-0 border-bottom ${touched.workNo && errors.workNo ? "is-invalid" : ""}`}
                                                                    value={formData.workNo}
                                                                    onChange={(e) => { setFormData({ ...formData, workNo: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="workNo" className="invalid-feedback" />
                                                            </div>
                                                        </div>

                                                        {/* Address (free text — unchanged) + District + workPlace (now dropdowns) */}
                                                        <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="address1" id="address-tooltip" className="text-primary fw-bold form-label ms-2">
                                                                    Work Address*
                                                                    <span className="text-muted fw-normal ms-2 tooltip-text">
                                                                        ?
                                                                        <ReactTooltip anchorId="address-tooltip" place="right" content="Place of study if student" />
                                                                    </span>
                                                                </label>
                                                                <Field type="text" name="address1" placeholder="Line 1"
                                                                    className={`form-control border-0 border-bottom ${touched.address1 && errors.address1 ? "is-invalid" : ""}`}
                                                                    value={formData.address1}
                                                                    onChange={(e) => { setFormData({ ...formData, address1: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="address1" className="invalid-feedback" />
                                                                <Field className="form-control border-0 border-bottom my-2" type="text" placeholder="Line 2" name="address2"
                                                                    value={formData.address2}
                                                                    onChange={(e) => { setFormData({ ...formData, address2: e.target.value }); handleChange(e); }}
                                                                />
                                                                <Field className="form-control border-0 border-bottom" type="text" placeholder="Line 3" name="address3"
                                                                    value={formData.address3}
                                                                    onChange={(e) => { setFormData({ ...formData, address3: e.target.value }); handleChange(e); }}
                                                                />
                                                            </div>

                                                            <div className="w-auto">
                                                                {/* District — dropdown for SA, free text for other countries */}
                                                                <div className="mb-4 form-group">
                                                                    <label htmlFor="district" className="text-primary fw-bold form-label ms-2">District*</label>
                                                                    {isSouthAfrica ? (
                                                                        <select id="district" name="district"
                                                                            className={`form-select border-0 border-bottom ${touched.district && errors.district ? "is-invalid" : ""}`}
                                                                            value={formData.district}
                                                                            onChange={(e) => {
                                                                                handleDistrictChange(e.target.value);
                                                                                handleChange(e);
                                                                            }}>
                                                                            <option value="">— Select District —</option>
                                                                            {availableDistricts.map(d => (
                                                                                <option key={d} value={d}>{d}</option>
                                                                            ))}
                                                                        </select>
                                                                    ) : (
                                                                        <Field type="text" name="district" placeholder="District name"
                                                                            className={`form-control border-0 border-bottom ${touched.district && errors.district ? "is-invalid" : ""}`}
                                                                            value={formData.district}
                                                                            onChange={(e) => { setFormData({ ...formData, district: e.target.value }); handleChange(e); }}
                                                                        />
                                                                    )}
                                                                    <ErrorMessage component="div" name="district" className="invalid-feedback" />
                                                                </div>

                                                                {/* Place of work — dropdown for SA, free text for other countries */}
                                                                <div className="form-group">
                                                                    <label htmlFor="workPlace" className="text-primary fw-bold form-label ms-2">Place of work*</label>
                                                                    {isSouthAfrica ? (
                                                                        <>
                                                                            <select id="workPlace" name="workPlace"
                                                                                className={`form-select border-0 border-bottom ${touched.workPlace && errors.workPlace ? "is-invalid" : ""}`}
                                                                                value={formData.workPlace}
                                                                                disabled={!formData.district}
                                                                                onChange={(e) => {
                                                                                    setFormData({ ...formData, workPlace: e.target.value });
                                                                                    handleChange(e);
                                                                                }}>
                                                                                <option value="">
                                                                                    {formData.district ? `— Select Facility (${availableFacilities.length}) —` : "— Select District first —"}
                                                                                </option>
                                                                                {availableFacilities.map(f => (
                                                                                    <option key={f} value={f}>{f}</option>
                                                                                ))}
                                                                            </select>
                                                                            {/* Allow manual entry if facility not in list */}
                                                                            {!manualFacility && (
                                                                                <small className="text-muted ms-2 mt-1 d-block">
                                                                                    Not in the list?{' '}
                                                                                    <span
                                                                                        className="text-primary"
                                                                                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                                                        onClick={() => {
                                                                                            setManualFacility(true);
                                                                                            setFormData({ ...formData, workPlace: '' });
                                                                                        }}
                                                                                    >
                                                                                        Type it below
                                                                                    </span>
                                                                                </small>
                                                                            )}
                                                                            {manualFacility && (
                                                                                <>
                                                                                    <Field type="text" name="workPlace" placeholder="Type full facility name"
                                                                                        className={`form-control border-0 border-bottom mt-2 ${touched.workPlace && errors.workPlace ? "is-invalid" : ""}`}
                                                                                        value={formData.workPlace}
                                                                                        onChange={(e) => { setFormData({ ...formData, workPlace: e.target.value }); handleChange(e); }}
                                                                                    />
                                                                                    <small className="text-muted mt-1 d-block">
                                                                                        This must be the facility you are working in, e.g. Rob Ferreira Hospital, eDumbe CHC, Green Point Clinic.
                                                                                    </small>
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <Field type="text" name="workPlace" placeholder="Work name"
                                                                            className={`form-control border-0 border-bottom ${touched.workPlace && errors.workPlace ? "is-invalid" : ""}`}
                                                                            value={formData.workPlace}
                                                                            onChange={(e) => { setFormData({ ...formData, workPlace: e.target.value }); handleChange(e); }}
                                                                        />
                                                                    )}
                                                                    <ErrorMessage component="div" name="workPlace" className="invalid-feedback" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                //========== STEP 2 - ROLE (unchanged) ===========//
                                                : step == 2 ?
                                                    <div>
                                                        <div className="my-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="reason" className="text-primary fw-bold form-label ms-2">Reason for sign up*</label>
                                                                <select id="reason" className="form-select border-0 border-bottom" value={formData.signUpReason}
                                                                    onChange={(e) => setFormData({ ...formData, signUpReason: e.target.value })}>
                                                                    <option value="health-interest">Interest in rural health</option>
                                                                    <option value="information">Information</option>
                                                                    <option value="onboarding">Onboarding programme</option>
                                                                    <option value="rhc">Rural Health Club (Students)</option>
                                                                    <option value="event">Events</option>
                                                                    <option value="renew-membership">Renew membership</option>
                                                                </select>
                                                            </div>
                                                            <div className="w-auto form-group">
                                                                <label htmlFor="jobDesc" className="text-primary fw-bold form-label ms-2">Job Description*</label>
                                                                <select id="jobDesc" className="form-select border-0 border-bottom" value={formData.jobDescription}
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
                                                        </div>
                                                        <div className="mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="employmentArea" className="text-primary fw-bold form-label ms-2">Employment Area*</label>
                                                                <select id="employmentArea" className="form-select border-0 border-bottom" value={formData.employmentArea}
                                                                    onChange={(e) => setFormData({ ...formData, employmentArea: e.target.value })}>
                                                                    <option value="private-sector">Private sector</option>
                                                                    <option value="public-sector">Public sector</option>
                                                                    <option value="training-institute">Training institute</option>
                                                                    <option value="ngo">NGO</option>
                                                                    <option value="student">Student</option>
                                                                </select>
                                                            </div>
                                                            <div className="w-auto form-group">
                                                                <label htmlFor="workArea" className="text-primary fw-bold form-label ms-2">Work Area*</label>
                                                                <Field type="text" name="workArea" placeholder="Work Area"
                                                                    className={`form-control border-0 border-bottom ${touched.workArea && errors.workArea ? "is-invalid" : ""}`}
                                                                    value={formData.workArea}
                                                                    onChange={(e) => { setFormData({ ...formData, workArea: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="workArea" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                        <div className="mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto form-group">
                                                                <label htmlFor="professionalNumber" className="text-primary fw-bold form-label ms-2">Professional Number</label>
                                                                <Field type="text" name="professionalNumber" placeholder="Professional Number"
                                                                    className={`form-control border-0 border-bottom ${touched.professionalNumber && errors.professionalNumber ? "is-invalid" : ""}`}
                                                                    value={formData.professionalNumber}
                                                                    onChange={(e) => { setFormData({ ...formData, professionalNumber: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="professionalNumber" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                //========== STEP 3 - CLUB (unchanged) ===========//
                                                : step == 3 ?
                                                    <div>
                                                        <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="clubName" className="text-primary fw-bold form-label ms-2">Student Club*</label>
                                                                <Field type="text" name="clubName" placeholder="Student club name"
                                                                    className={`form-control border-0 border-bottom ${touched.clubName && errors.clubName ? "is-invalid" : ""}`}
                                                                    value={formData.clubName}
                                                                    onChange={(e) => { setFormData({ ...formData, clubName: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="clubName" className="invalid-feedback" />
                                                                <Field type="text" name="uniName" placeholder="University name"
                                                                    className={`form-control border-0 border-bottom ${touched.uniName && errors.uniName ? "is-invalid" : ""}`}
                                                                    value={formData.uniName}
                                                                    onChange={(e) => { setFormData({ ...formData, uniName: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="uniName" className="invalid-feedback" />
                                                            </div>
                                                            <div className="w-auto form-group">
                                                                <div className="mb-4 form-group">
                                                                    <label className="text-primary fw-bold form-label ms-2">Does Your Club Receive External Support?</label>
                                                                    <div className="d-flex ms-3">
                                                                        <div className="form-check me-4">
                                                                            <input id="support-yes" className="form-check-input" type="radio" name="support"
                                                                                onChange={(e) => { setFormData({ ...formData, externalSupport: "true" }); handleChange(e); }} />
                                                                            <label id="support-yes" className="form-check-label ms-2">Yes</label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input id="support-no" className="form-check-input" type="radio" name="support"
                                                                                onChange={(e) => { setFormData({ ...formData, externalSupport: "false" }); handleChange(e); }} />
                                                                            <label id="support-no" className="form-check-label ms-2 checked">No</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between">
                                                            <div className="w-auto me-sm-5 mb-4 mb-sm-0 form-group">
                                                                <label htmlFor="contactName" className="text-primary fw-bold form-label ms-2">Contact Person*</label>
                                                                <Field type="text" name="contactName" placeholder="Name"
                                                                    className={`form-control border-0 border-bottom ${touched.contactName && errors.contactName ? "is-invalid" : ""}`}
                                                                    value={formData.contactName}
                                                                    onChange={(e) => { setFormData({ ...formData, contactName: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="contactName" className="invalid-feedback" />
                                                                <Field type="text" name="contactRole" placeholder="Role"
                                                                    className={`form-control border-0 border-bottom ${touched.contactRole && errors.contactRole ? "is-invalid" : ""}`}
                                                                    value={formData.contactRole}
                                                                    onChange={(e) => { setFormData({ ...formData, contactRole: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="contactRole" className="invalid-feedback" />
                                                                <Field type="tel" name="contactNo" placeholder="Cellphone number"
                                                                    className={`form-control border-0 border-bottom ${touched.contactNo && errors.contactNo ? "is-invalid" : ""}`}
                                                                    value={formData.contactNo}
                                                                    onChange={(e) => { setFormData({ ...formData, contactNo: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="contactNo" className="invalid-feedback" />
                                                                <Field type="text" name="contactEmail" placeholder="Email"
                                                                    className={`form-control border-0 border-bottom ${touched.contactEmail && errors.contactEmail ? "is-invalid" : ""}`}
                                                                    value={formData.contactEmail}
                                                                    onChange={(e) => { setFormData({ ...formData, contactEmail: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="contactEmail" className="invalid-feedback" />
                                                            </div>
                                                            <div className="w-auto form-group">
                                                                <label htmlFor="supportName" className="text-primary fw-bold form-label ms-2">Person Giving Support*</label>
                                                                <Field type="text" name="supportName" placeholder="Name"
                                                                    className={`form-control border-0 border-bottom ${touched.supportName && errors.supportName ? "is-invalid" : ""}`}
                                                                    value={formData.supportName}
                                                                    onChange={(e) => { setFormData({ ...formData, supportName: e.target.value }); handleChange(e); }}
                                                                />
                                                                <ErrorMessage component="div" name="supportName" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                : ''
                                            }

                                            {/* Privacy policy checkbox */}
                                            {submitShow &&
                                                <div className="w-100 d-flex justify-content-center my-5">
                                                    <div className="form-check">
                                                        <Field type="checkbox" name="privacyPolicy"
                                                            className={`form-check-input ${touched.privacyPolicy && errors.privacyPolicy ? "is-invalid" : ""}`}
                                                            checked={formData.privacyPolicy}
                                                            onChange={(e) => { setFormData({ ...formData, privacyPolicy: !formData.privacyPolicy }); handleChange(e); }}
                                                        />
                                                        <label className="form-check-label" htmlFor="privacyPolicy">
                                                            I agree to the <a href="/privacy-policy.html" target="_blank">Privacy Policy</a>, <a href="/pdfs/value-statement.pdf" target="_blank">Value Statement</a> and <a href="/pdfs/code-of-conduct.pdf" target="_blank">Code of Conduct</a>
                                                            <label className="text-primary fw-bold form-label ms-2">*</label>
                                                        </label>
                                                        <ErrorMessage component="div" name="privacyPolicy" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            }

                                            {/* Navigation buttons */}
                                            <div className="w-100 d-flex flex-column flex-sm-row justify-content-end align-items-end align-items-sm-center">
                                                <small>Have an account? <Link href="/login">Log in</Link></small>
                                                <div className='d-flex mt-4 mt-sm-0'>
                                                    <button className="btn btn-lg btn-outline" disabled={step == 0}
                                                        onClick={() => setStep((currStep) => currStep - 1)}>
                                                        Back
                                                    </button>
                                                    <div className={`hover-button ${submitShow ? "d-none" : ""}`}>
                                                        <button className="btn btn-lg btn-secondary" disabled={!isValid}
                                                            onClick={() => setStep((currStep) => currStep + 1)}>
                                                            Next
                                                        </button>
                                                    </div>
                                                    <div className={`hover-button ${submitShow ? "" : "d-none"}`}>
                                                        <button className="btn btn-lg btn-secondary" type="submit" disabled={!isValid}>
                                                            {isSubmitting
                                                                ? <ClipLoader color="#fff" size={20} cssOverride={{ margin: "0 15px" }} />
                                                                : "Sign Up"
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="d-flex justify-content-end invalid-feedback">{formSubmitErr}</p>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
                <Benefits content={data.find(file => file.slug === "offers")} />
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const files = fs.readdirSync(path.join('markdown/sign-up'))
    const data = files.map((filename) => {
        const slug = filename.replace('.md', '')
        const markdown = fs.readFileSync(path.join('markdown/sign-up', filename), 'utf-8')
        let { data: frontmatter, content, sections } = matter(markdown, {
            section: function (section, file) { section.content = section.content.trim() + '\n'; }
        });
        if (sections === undefined) { sections = {}; }
        return { slug, frontmatter, content, sections }
    })
    return { props: { data } }
}
