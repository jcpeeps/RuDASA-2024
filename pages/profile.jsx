import React, { useState, useEffect } from 'react'
import useUser from './api/useUser'
import Layout from '../components/Layout'
import ClipLoader from "react-spinners/ClipLoader";

// Canonical geography hierarchy — Province → District → Facilities
// Same source of truth used in signUp.jsx
const HIERARCHY = {
    "Eastern Cape": {
        "Alfred Nzo District": ["Greenville Hospital","Khotsong Hospital","Madzikane kaZulu Hospital","Maluti CHC","Mt Ayliff Hospital","Sipetu Hospital","St.Patricks Hospital","Tabankulu CHC","Taylor Bequest Hospital (Matatiele)"],
        "Amathole District": ["Adelaide FPA Hospital","Bedford Hospital","Butterworth Hospital","Cathcart Hospital","Elliotdale Community Health Centre","Fort Beaufort Hospital","Hobeni Clinic","Idutywa Village CHC","Komga Hospital","Madwaleni Hospital","Middledrift CHC","Nompumelelo Hospital","Nqabara Health Centre","Nqgamakwe CHC","SS Gida Hospital","Stutterheim FPA Hospital","Tafalofefe Hospital","Tower Hospital","Tower Psychiatric Hospital","Victoria Alice Hospital","Victoria Hospital","Willowvale CHC","Winterberg SANTA Hospital","Xhora CHC"],
        "Buffalo City Metropolitan": ["Bhisho CHH","Bhisho Hospital","Cambridge Clinic (Sprigg Street Clinic)","Cecilia Makiwane Hospital","Dimbaza CHC","Duncan Village CHC","Duncan Village Day Hospital","Empilweni Gompo CHC","Fort Grey TB Hospital","Frere Hospital","Grey Hospital","Mount Coke CHC","Needs Camp Clinic","Newhaven Hospital","Newhaven Provincial Aided Chronic Sick Hospital","Nkqubela TB Hospital","Nontyatyambo CHC","Pefferville Clinic"],
        "Chris Hani District": ["All Saints Hospital","Cala Hospital","Cofimvaba Hospital","Cradock Hospital","Dordrecht FPA Hospital","Elliot Hospital","Frontier Hospital","Glen Grey Hospital","Hewu Hospital","Indwe FPA Hospital","Komani Hospital","Kuyasa CHC","M Venter Hospital","Martjie Venter FPA Hospital","Mjanyana Hospital","Molteno FPA Hospital","Ngcobo CHC","Ngonyama CHC","Nomzamo CHC","Rocklands Clinic Ntabethemba","Sterkstroom FPA Hospital","Tarkastad Town Clinic","Thornhill CHC","Whittlesea CHC","Wilhelm Stahl Hospital","Zwelakhe Dalasile CHC"],
        "Joe Gqabi District": ["Aliwal North Hospital","Burgersdorp Hospital","Cloete Joubert Hospital","Empilisweni Hospital","James Town FPA Hospital","Lady Grey Hospital","Maclear FPA Hospital","St Francis Chronic Hospital","St. Francis Provincial Aided Hospital","Steynsburg Hospital","Tayler Bequest Hospital (Elundini)","Taylor Bequest Hospital (Mount Fletcher)","Umlamli Hospital","Walter Sisulu University (NHLS)"],
        "Nelson Mandela Bay Metropolitan": ["Central CHC (Sandford)","Dora Nginza Hospital","Elizabeth Donkin Hospital","Empilweni TB Hospital","Gqebera CHC","Jose Pearson TB Hospital","Korsten CHC","Kwazakhele CHC","Letticia Bam CHC","Livingstone Hospital","Lorraine Frail Care Centre","Motherwell CHC","New Brighton CHC","Orsmond TB Hospital","Port Elizabeth Provincial Hospital","Rosedale CHC","SAMHS Port Elizabeth Sickbay","Uitenhage Hospital","West End CHC"],
        "OR Tambo District": ["Bambisana Hospital","Baziya CHC","Bedford Orthopaedic Hospital","Bevan Goqwana CHC","Canzibe Hospital","Dr Malizo Mpehle Hospital","Dr Malizo Mpehle Memorial Hospital","Elliotdale CHC","Holly Cross Hospital","Idutywa CHC","Isilimela Hospital","Isipethu Hospital","Makhotyana CHC","Mbekweni CHC","Mhlakulo CHC","Mqanduli CHC","Mthatha Chest Hospital","Mthatha General Hospital","Nelson Mandela Academic Hospital","Nessie Knight Hospital","Ngangelizwe CHC","Ngcwangube CHC","Ntabankulu CHC","Port St Johns CHC","Qumbu CHC","SAMHS Mthatha 14 SAI Sickbay","St. Elizabeth Hospital","St. Lucy's Hospital","St.Barnabas Hospital","Tombo CHC","Zithulele Hospital"],
        "Sarah Baartman District": ["Aberdeen FPA Hospital","Andries Vosloo Hospital","BJ Voster FPA Hospital","Fort England Hospital","Graaff-Reinet Day Hospital","Humansdorp Hospital","Jourbertina CHC","Majorie Parish TB Hospital","Margery Parkes TB Hospital","Midlands Hospital","P.Z. Meyer Hospital","Port Alfred CHH","Port Alfred Hospital","SAMHS Grahamstown Sickbay","Sawas Hospital","Sawas Memorial FPA Hospital","Settlers Hospital","Sunday Valley FPA Hospital","Temba TB Hospital","Willowmore Hospital","Willowmore Provincial Aided Hospital"]
    },
    "Free State": {
        "Fezile Dabi District": ["Boitumelo Clinic","Boitumelo Hospital","Deneysville Clinic","Fezi Ngumbentombi Hospital","Frankfort Clinic","Frankfort Mobile Clinic (1)","Frankfort Mobile Clinic (2)","Heilbron Clinic","Heilbron Mobile Clinic","Kananelo CHC","Kganya CHC","Koppies Mobile Clinic","Lesedi CHC","Mafube Hospital","Metsimaholo Clinic","Parys Clinic","Parys Dental Clinic","Parys Hospital","Parys Mobile Clinic No 1","Parys Mobile Clinic No 2","PAX CHC","Qalabotjha Clinic","Rammulotsi Clinic","Rheederspark Clinic","SAMHS Kroonstad Sickbay","Sandersville Clinic","Sasolburg Clinic","Sasolburg Mobile Clinic","Sasolburg Mobile Clinic No","Schonkenville Clinic","Seeisoville Clinic","Steynsrus Mobile Clinic","Thusanong Clinic – (Parys)","Tokollo Hospital","Tumahole Clinic","Villiers Clinic","Vredefort Mobile Clinic","Zamdela CHC"],
        "Lejweleputswa District": ["Allanridge Clinic","Bongani Hospital","Boshof Clinic","Bothaville Phc Clinic","Bronville Clinic","Dealesville Clinic","Flora Park Clinic","Geneva Clinic","Hanipark Clinic","Harmony Goldmine Hospital","Health Clinic (Welkom)","Hennenman Clinic","Hoopstad Clinic","Hope CHC","Ikgomotseng Clinic","Katleho Hospital","Kgotsong Clinic","Kopano CHC","Kopano MDR Hospital","Masilo Clinic","Matjhabeng Clinic","Meloding Clinic","Metsimaholo Parys Hospital","Mohau Hospital","Nala Hospital","Riebeeckstad Clinic","Seeisoville Clinic","Thabong Clinic","Thusanong Hospital","Tshepong Clinic","Virginia Clinic","Welkom Clinic","Winburg Clinic","Winburg Hospital"],
        "Mangaung Metropolitan": ["Bainsvlei Clinic","Batho Clinic","Batho Psychiatry Clinic","Bayswater Clinic","Bethlehem Clinic","Bethlehem Dental Clinic","Bloemspruit Clinic","Blue Gum Bosch Clinic","Bohlokong Clinic","Boiketlo Clinic","Bolata Clinic","Botshabelo Hospital","Brentpark Clinic","Busamed BFIA Hospital","Central Park Clinic","Dinkweng Clinic","Dr JS Moroka Hospital","Eva-Mota Clinic","Fauna Clinic","Fichardtpark Clinic","Free State National District Hospital","Free State Psyc Comp Hospital","Freedom Square Clinic","Harrismith Clinic","Heidedal CHC","Heidedal Clinic","Heidedal Poly Clinic","Highway Junction Clinic","Hilton Clinic","Intabazwe Clinic","Itumeleng Clinic","Kagisanong Clinic","Kopanong Clinic","Leratswana Clinic","Lesedi Clinic","Leseding Clinic","Lindley Clinic","Lourierpark Clinic","Lusaka Clinic","Ma-Haig Clinic S","Makeneng Clinic","Makhalaneng Clinic","Malesaona Clinic","Manapo Dental Clinic","Matsieng Clinic","Memel (Helpmekaar) Clinic","Monontsha Clinic","Monument Clinic","Mphatlalatsane Clinic","Mphohadi Clinic","MUCPP CHC","Mucpp Maternity Clinic","Noorderbloem Clinic","Nothnagel Clinic","Nthabiseng Clinic","Paballong Clinic","Paul Roux Clinic","Pelonomi Hospital","Petsana Clinic","Phahameng Clinic","Potlako Motlohi Clinic","Pule Sefatsa Clinic","Rearabetswe Clinic","Reitumetse Clinic","Reitz Clinic","Relebohile Clinic","Riverside Clinic","SAMHS 3 Military Hospital","SAMHS Bloemfontein Military Medical Clinic","Sekamotho Mota Clinic","Tebang Clinic","Thaba Nchu Clinic","Thaba-Bosiu Clinic","Thusa Bophelo Clinic","Tina-Moloi Clinic","Tseki Clinic","Tshiame (B) Clinic","Tshirela Clinic","Universitas (C) Hospital","Universitas Academic Hospital","University of Free State (NHLS)","Vrede Dental Clinic","Westdene Clinic","Zamani Clinic"],
        "Thabo Mofutsanyana District": ["Bethlehem Clinic","Bethlehem Dental Clinic","Bohlokong Clinic","Clocolan Clinic","Dihlabeng (Bethlehem) Hospital","Elizabeth Ross Hospital","Excelsior Clinic","Harrismith Clinic","Hobhouse Clinic","Intabazwe Clinic","Itemoheng Hospital","John Daniel Newberry Hospital","Ladybrand Clinic","Lindley Clinic","Mamello CHC","Mantsopa District Hospital","Mantsopa Hospital","Manyatseng Clinic","Matwabeng Clinic","Memel (Helpmekaar) Clinic","Meqheleng Clinic","Mofumahadi Manapo Mopeli Hospital","Monontsha Clinic","Namahali Clinic","Nketoana Hospital","Paul Roux Clinic","Petsana Clinic","Phekolong Hospital","Phumelela Hospital","Phuthaditjaba Clinic","Phuthuloha Hospital","Qholaqhwe Clinic","Reitz Clinic","Senekal Farms Clinic","Senorita Ntlabathi Hospital","Thebe Hospital","Tshiame (B) Clinic","Tweespruit Clinic","Vrede Dental Clinic","Vredefort Mobile Clinic"],
        "Xhariep District": ["Albert Nzula District Hospital","Bophelong (Petrusburg) CHC","Diamond (Diamant) Hospital","Diamond Hospital Complex","Embekweni Hospital","Fauresmith Clinic","Jacobsdal Clinic","Lephoi Clinic (Bethulie)","Luckhoff Clinic","Matlakeng Clinic","Oppermansdorp Clinic","Philippolis Clinic","Qibing Clinic - Wepener","Stoffel Coetzee Hospital","Van Stadensrus Clinic"]
    },
    "Gauteng": {
        "City of Ekurhuleni Metropolitan": ["Alberton North Clinic","Alrapark Ext 3 Clinic","Andries Raditsela Clinic","Bakerton Health Post","Bapsfontein Clinic","Barcelona Clinic","Bedfordview Clinic","Bertha Gxowa GateWay Clinic","Bertha Gxowa Hospital","Birchleigh Clinic","Birchleigh North Clinic","Bluegum View Sonto Tobela Clinic","Bluegum View Zamani Clinic","Boksburg Civic Centre Clinic","Boksburg North Clinic","Bonaero Park Clinic","Brackenhurst Clinic","Brakpan Civic Clinic","Calcot Dlepu Clinic","Chief Albert Luthuli Clinic","Crystal Park Clinic","Crystal Park Satellite Clinic","Dan Kubheka Clinic","Dark City Community Health Centre","Daveyton Clinic","Daveyton Extension Clinic","Daveyton Main CDC","Daveyton Main Community Day Centre","Dawn Park Clinic","Dresser Clinic","Duduza Clinic","Dukathole Clinic","East Rand Santa Hospital","Eden Park Clinic","Edenvale Clinic","Edenvale General Hospital","Edenvale Hospital","Ekurhuleni District Office","Elsburg Clinic","Emaphupheni Clinic","Endayeni Clinic","Erin Clinic","Esangweni CHC","Ethafeni Clinic","Etwatwa Phillip Moyo Community Health Centre","Far East Rand Hospital","Geluksdal Clinic","Germiston City Clinic","Germiston Hospital","Goba Clinic","Greenfields Clinic","HC East Rand","Isabella Clinic","Itireleng Clinic (Edenvale)","Jabulane Dumane CHC","Joy Clinic","Katlehong North Clinic","Kempton Park Civic Centre Clinic","Kemston Clinic","Khumalo Clinic","Klopperpark Clinic","Knights Chest Hospital","Kwa-Thema CHC","Kwa-Thema Community Health Centre","Leondale Clinic","Lethabong Clinic","Lucky Mkwanazi Clinic","Magagula Clinic","Mary Moodley Memorial Clinic","Moleleki Clinic","Motsamai Clinic","Natalspruit Hospital","Nigel Clinic","Nokuthela Ngwenya CHC","Nokuthula Ngwenya Community Health Centre","Northmead Clinic","Olifantsfontein Clinic","Palmridge Clinic","Payneville Clinic","Phenduka Clinic","Phillip Moyo CHC","Phola Park Community Health Centre","Pholosong Hospital","Phutanang Clinic","Rabie Ridge Clinic","Ramaphosa Clinic","Ramokonopi CHC","Reedville Clinic","Reiger Park Clinic","Rondebult Clinic","SAMHS Dunnottar Sickbay","Sead Clinic","Selope Thema Clinic","Simunye Clinic (Tsakane)","Sizwe Hospital","Slovo Park Clinic","Sonto Thobela Clinic","Spartan Clinic","Springs Clinic (Replaced First Avenue Clinic)","Sunriseview Clinic","Tamaho Clinic","Tambo Memorial Hospital","Tembisa Health Clinic","Tembisa Hospital","Tembisa Main Clinic","Thelle Mogoerane Regional Hospital","Thembelisha Clinic","Tokoza Penduka Clinic","Tokoza Phola Park Clinic","Tsakane Clinic","Tsakane Ext 10 Clinic","Tsietsi Clinic","Tswelopele Clinic","Van Dyk Park Clinic","Villa Lisa Clinic","Vosloorus Ext 28 Clinic","Vosloorus Ext 9 Clinic","Vosloorus Health Centre","Vosloorus Poly Clinic","Wannenburg Clinic","Wattville Clinic","White City Clinic","Zonkizizwe 1 Clinic","Zonkizizwe 2 Clinic"],
        "City of Johannesburg Metropolitan": ["80 Albert Street Clinic","Alex Clinic","Alexandra 4th Avenue Clinic","Alexandra 8th Avenue Clinic","Alexandra CHC","Alexandra Clinic","Alexandra East Bank Clinic","Alexandra Eastbank Clinic","Alexandra Health Centre","Alphen Square North mobile clinic","Barney Molokoane Clinic","Bellavista Clinic","Berario Clinic","Bez Valley Clinic","Bheki Mlangeni District Hospital","Biokinetics Centre","Bophelong Clinic (Doornkop)","Bophelong Clinic (Ivory Park)","Bosmont Clinic","Bristlecone Clinic","Cardiac Rehabilitation and Exercise Clinic","CBD Health Office Clinic","Charles Hurwitz Santa Hospital","Charlotte Maxeke Academic Hospital","Charlotte Maxeke Hospital","Charlotte Maxeke Johannesburg Academic Hospital","Chiawelo CHC","Chiawelo Clinic","Chiawelo Community Health Centre","Chris Hani Baragwanath Academic Hospital","Chris Hani Baragwanath Hospital","City of Johannesburg District Office","Claremont Clinic","Crosby Clinic","Crown Gardens Clinic","Crown Gardens Satellite Clinic","Davidsonville Clinic","Diepkloof Clinic (LG)","Diepkloof Clinic (Provincial)","Diepsloot Clinic","Diepsloot South Clinic","Discoverers CHC","Discoverers Community Health Centre","Dobsonville Nokuphila Clinic","Ebony Park / Kaalfontein Clinic","Edenvale Hospital","Eighth Avenue Clinic","Eikenhof Clinic","Eldorado Park Clinic","Eldorado Park Ext 1 Mobile Clinic","Eldorado Park Ext 2 Clinic","Eldorado Park Ext 9 Clinic","Elias Motsoaledi Clinic","Ennerdale Ext 8 Clinic","Ennerdale Ext 9 Clinic","Ennerdale Ext 9 Mobile Clinic","Esselen Clinic","Esselen Street Clinic","Esselen Street HIV/Aids Programme Clinic","Finetown Clinic","Fleurhof Clinic","Florida Clinic","Fordsburg Clinic","Fourth Avenue Clinic","Germiston Hospital","Glenanda Clinic","Green Village Clinic","Halfway House Clinic","Helderkruin Clinic","Helen Joseph Hospital","Hikhensile Clinic","Hillbrow CHC","Hillbrow Community Health Centre","HIV/Aids Information Centre","Itireleng CHC","Itireleng Clinic","Itireleng Community Health Centre","Ivory Park Hikensile Clinic","Ivory Park Mpumelelo Clinic","Jabavu CHC","Jabavu Clinic","Jabavu Community Health Centre","Jabulani CHC","Jabulani Dumani Community Health Centre","Jeppe Clinic","Jeppe Street Clinic","Joubert Park Clinic","Kibler Park Clinic","Kibler Park Satellite Clinic","Klipspruit West Clinic","Kliptown Clinic","Kliptown Clinic (Eldorado Park)","Kliptown Mobile Clinic (Soweto)","Lawley 2 Clinic","Lawley Clinic","Lawley Ext 1 Clinic","Lenasia Clinic (Provincial)","Lenasia Ext 10 Clinic","Lenasia Ext 2 Main Clinic","Lenasia Health Centre (Ext 2)","Lenasia South CHC","Lenasia South Civic Clinic","Lenasia South Community Health Centre","Lenasia South District Hospital","Lillian Ngoyi CHC","Lillian Ngoyi Community Health Centre","Malvern Clinic","Mandela Sisulu Clinic","Marlboro Clinic","Marshalls Town Clinic","Mayfair Clinic","Mayibuye Clinic","Meadowlands Zone 2 Clinic (LG)","Meadowlands Zone 2 Clinic (Provincial)","Michael Maponya Clinic (LG)","Michael Maponya Clinic (Provincial)","Mid-Ennerdale Clinic","Midrand West Clinic","Mobile Clinic","Mofolo CHC","Mofolo Community Health Centre","Mofolo South Clinic","Moroka Clinic","Mpumelelo Clinic","Naledi Mobile Clinic","Nancefield Mobile Clinic","Nokuphila Clinic","Noordgesig Clinic (LG)","Noordgesig Clinic (Provincial)","OR Tambo CHC","OR Tambo Clinic","Orange Farm Ext 7 Clinic","Orchards Clinic (John Fotheringham Clinic)","Orlando Clinic (LG)","Orlando Clinic (Provincial)","Parkhurst Clinic","Petervale Clinic","Princess Clinic","Protea Glen Mobile Clinic","Protea South Clinic","Rabie Ridge Clinic","Rahima Moosa Hospital","Rahima Moosa Mother and Child Hospital","Randburg Clinic","Rex Street Clinic","Riverlea Clinic","Riverlea Major Clinic","Roodepoort Clinic","Roodepoort West Princess Clinic","Rosebank (satellite) Clinic","Rosebank Clinic (Johannesburg)","Rosettenville Clinic","SAMHS Doornkop Sickbay","Sandown Clinic","Sandringham Park Avenue Clinic","Senaoane Clinic","Shanty Clinic","Shanty Mobile Clinic","Sinethemba Clinic","Sinqobile Clinic","Siphumlile Clinic","Sizwe Tropical Disease Hospital","Slovo Park Mobile Clinic","Slovoville Mobile Clinic","Sol Plaatjie Clinic","Sophiatown Clinic","South Hills Clinic","South Hills Satellite Clinic","South Rand Hospital","Soweto Diepkloof Clinic","Soweto Dobsonville Itereleng Community Health","Soweto Dobsonville Nokuphila Clinic","Soweto Meadowlands Clinic","Soweto Mofolo South Clinic","Soweto Protea South Clinic","Soweto Senoane Clinic","Soweto Tladi Clinic","Stretford CHC","Stretford Clinic","Tara H Moross Centre Hospital","Tara Hospital","Tara The H Moross Centre","Thembelihle Clinic","Thoko Mngoma Clinic","Thuthukani Clinic","Thutukani Clinic","Tladi Clinic (LG)","Tladi Clinic (Provincial)","Tshepisong Clinic","University of the Witwatersrand (NHLS)","Urban Health Clinic","Vlakfontein Clinic","Weilers Farm Clinic","Weilers Farm Mobile Clinic","Weltevreden Park Clinic","Wendywood Clinic","Westbury Clinic","Wildebeesfontein Clinic","Windsor Clinic","Winnie Mandela Clinic","Witkoppen Clinic","Yeoville Clinic","Zandspruit Clinic","Zevenfontein mobile clinic","Zola CHC","Zola Clinic (LG)","Zola Community Health Centre","Zondi Clinic"],
        "City of Tshwane Metropolitan": ["Atteridgeville Clinic","Atteridgeville Phomolong Clinic","Bronkhorstspruit Hospital","City of Tshwane District Office","Cullinan Rehab Hospital","Danville Clinic","Dark City CHC","Dr George Mukhari Academic Hospital","Dr George Mukhari Hospital","East Lynne Clinic","Eersterust CHC","Eersterust Clinic","Eldoraigne Clinic","FF Ribeiro Clinic","Jubilee District Hospital","Jubilee Hospital","Kalafong Hospital","Kalafong Provincial Tertiary Hospital","Karenpark Clinic","Kgabo CHC","KT Motubatse Community Health Centre","Laudium CHC","Laudium Clinic","Lyttelton Clinic","Lyttleton Clinic","Mamelodi Hospital","Mamelodi Regional Hospital","Mamelodi Stanza Bopape CHC","Mamelodi West Clinic","Odi District Hospital","Odi Hospital","Olievenhoutbosch Clinic","Olivenhoutbosch Clinic","Phedisong 4 CHC","Pretoria West Hospital","Rooihuiskraal Clinic","Rosslyn Clinic","SAMHS 1 Military Hospital","SAMHS Tek Base Military Medical Clinic","SAMHS Waterkloof AFB Sickbay","Saulsville Clinic","Saulsville Gazankulu Clinic","Sefako Makgatho Health Sciences University (NHLS)","Skinner Street CHC","Soshanguve CHC","Soshanguve Community Health Centre 3","Stanza Bopape CHC","Stanza Bopape Community Health Centre","Steve Biko Academic Hospital","Temba CHC","Thaba Tshwane OH Clinic","Tshepong TB Hospital","Tshwane District Hospital","Tshwane Rehabilitation Hospital","University of Pretoria (NHLS)","Weskoppies Hospital"],
        "Gert Sibande District": ["Standerton Hospital"],
        "Sedibeng District": ["Boipatong CHC","Bophelong CDC (Emfuleni)","Bophelong Clinic","Empilisweni CDC","Empilisweni Clinic","Heidelberg Hospital","Johan Heyns CHC","Johan Heyns Community Health Centre","Kopanong Hospital","Levai Mbata Community Health Centre","Levay Mbata CHC","Meyerton Clinic","Midvaal CDC","Midvaal Community Health Centre","Ratanda CDC","Sebokeng Hospital","Sedibeng District Office","Sharpville CHC"],
        "West Rand District": ["Bekkersdal Clinic","Bekkersdal West CHC","Carletonville Hospital","Dr Yusuf Dadoo Hospital","HC West Rand","Kagiso Clinic","Khutsong CHC","Leratong Hospital","Luipaardsvlei Clinic","Mogale City Central Clinic","Mogale Clinic","Mohlakeng CHC","Mohlakeng Clinic","Muldersdrift Clinic","Noordheuwel Clinic","Randgate Clinic","Sterkfontein Hospital","West Rand District Office"]
    },
    "KwaZulu-Natal": {
        "Amajuba District": ["Charlestown Clinic","Dannhauser CHC","Durnacol Clinic","Emfundweni Clinic","Greenock Clinic","Groenvlei Clinic","Ingogo Clinic","Ladybank Clinic","Madadeni 1 Clinic","Madadeni 5 Clinic","Madadeni 7 Clinic","Madadeni Hospital","Mndozo Clinic","Naas Farm Clinic","Nellies Farm Clinic","Newcastle Clinic","Newcastle Hospital","Niemeyer Hospital","Niemeyer Memorial Hospital","Osizweni 1 Clinic","Osizweni 2 Clinic","Osizweni 3 Clinic","Rosary Clinic","Stafford Clinic","Sukumani Clinic","Thandanani (Dannhauser) Clinic","Thembalihle Clinic","Verdriet Clinic"],
        "Harry Gwala District": ["Christ the King Hospital","East Griqualand and Usher Memorial Hospital","Gcinokuhle Clinic","Gowanlee Clinic","Gqumeni Clinic","Gugwini Clinic","Gwala Clinic","Hlokozi Clinic","Ibisi Clinic","Ixopo Clinic","Jolivet Clinic","Kilmun Clinic","Kokstad Clinic","KwaMashumi Clinic","Ladam Irene Clinic","Lourdes Clinic","Malenge Clinic","Mntungwana Clinic","Mnyamana Clinic","Mqatsheni Clinic","Mvoti Clinic","Mvubukazi Clinic","Ndawana Clinic","Ndwebu Clinic","Nokweja Clinic","Pholela CHC","Qulashe Clinic","Rietvlei Hospital","Sandanezwe Clinic","Sangcwaba Clinic","Sihleza Clinic","Singisi Clinic","Siphamandla Clinic","Sokhela Clinic","St Apollinaris Hospital","St Francis Hospital","St Margaret's CHC","St Margaret's TB MDR Hospital","Tsatsi Memorial Clinic","Umzimkhulu Hospital","Umzimkulu Clinic","Underberg Clinic"],
        "King Cetshwayo District": ["Brackenham Clinic","Buchanana Clinic","Catherine Booth Hospital","Chwezi Clinic","Cinci Clinic","Dinuntuli Clinic","Dondotha Clinic","Ekhombe Hospital","Ekombe Hospital","Ekuphumuleni Clinic","Empangeni Clinic","Ensingweni Clinic","Eshowe Hospital","Esibhudeni Clinic","Ewangu Clinic","Gingindlovu Clinic","Halambu Clinic","Isiboniso Clinic","Khandisa Clinic","King Dinizulu Clinic","KwaMagwaza Hospital","Kwambiza Clinic","Kwambonambi (Sappi) Clinic","KwaYanguye Clinic","Lower Umfolozi War Memorial Hospital","Luwamba Clinic","Mabamba Clinic","Mabhuqweni Clinic","Malunga Clinic","Mandaba Clinic","Mandlanzini Clinic","Manyane Clinic","Mathungela Clinic","Mbongolwane Hospital","Meerensee Clinic","Melmoth Clinic","Mfongosi Clinic","Mthungweni Clinic","Mvutshini Clinic","Ndabaningi Clinic","Ndlangubo Clinic","Ndundulu Clinic","Ngudwini Clinic","Ngwelezana Clinic","Ngwelezana Hospital","Ngwelezane Hospital","Nhlabane Clinic","Nkandla Hospital","Nkwalini Clinic","Nogajuka Clinic","Nomponjwana Clinic","Nongamlane Clinic","Nseleni CHC","Ntambanana Clinic","Ntumeni Clinic","Ntuze Clinic","Nxamalala (Eshowe) Clinic","Ocilwane Clinic","Osungulweni Clinic","Phaphamani Clinic","Queen Nandi Regional Hospital","Richards Bay Clinic","Samungu Clinic","Siphilile Clinic","Sokhulu Clinic","Thalaneni Clinic","Umbonambi Clinic","Umkhontokayise Clinic","Vumanhlamvu Clinic","Xulu Clinic"],
        "Ugu District": ["Assisi Clinic","Baphumile Clinic","Bhobhoyi Clinic","Bhomela Clinic","Braemar Clinic","Dlangezwa Clinic","Dududu Clinic","Dunstan Farrell TB Hospital","Elim Clinic","G J Crookes Hospital","Gamalakhe CHC","Gcilima Clinic","GJ Crooke's Hospital","Gqayinyanga Clinic","Harding Clinic","Izingolweni Clinic","Khayelihle Clinic","KwaJali Clinic","KwaMbunde Clinic","Ludimala (Mlondi) Clinic","Mabheleni Clinic","Madlala Clinic","Marburg Clinic","Margate Clinic","Mbonwa Clinic","Mbotho Clinic","Meadow Sweet Clinic","Mfundo Arnold Lushaga CHC","Mgangeni Clinic","Mgayi Clinic","Morrison's Post Clinic","Mthimude Clinic","Murchison Hospital","Mvutshini (Hibiscus Coast) Clinic","Ndelu Clinic","Nhlalwane Clinic","Ntabeni Clinic","Ntimbankulu Clinic","Pennington Clinic","Phungashe Clinic","Pisgah Clinic","Port Edward Clinic","Port Shepstone Clinic","Port Shepstone Hospital","Santombe Clinic","Scottburgh Clinic","Shelly Beach Clinic","Southport Clinic","St Andrews Hospital","St. Faith's Clinic","Thembalesizwe Clinic","Thonjeni Clinic","Turton CHC","Turton Community Health Centre","Umtentweni Clinic","Umzinto Clinic","Weza Clinic","Xhamini Clinic"],
        "Zululand District": ["Altona Clinic","Belgrade Clinic","Benedictine Hospital","Bhekumthetho Clinic","Bhekuzulu Clinic","Buxedene Clinic","Ceza Hospital","Dengeni Clinic","eDumbe CHC","Ekubungazeleni Clinic","Emkhwakhweni Clinic","Esidakeni Clinic","Ezimfabeni Clinic","Friesgewacht Clinic","Fuduka Clinic","Gluckstadt Clinic","Hartland Clinic","Hlengimpilo Clinic","Hlobane Clinic","iDlebe Clinic","Itshelejuba Hospital","Kahhemulana Clinic","Khambi Clinic","KwaMame Clinic","KwaNkundla Clinic","KwaShoba Clinic","Lomo Clinic","Longridge Colliery Mine Hospital","Louwsburg Clinic","Luneburg Clinic","Mabedlane Clinic","Magagadolo Clinic","Mahashini Clinic","Makhosini Clinic","Makhwela Clinic","Maphophoma Clinic","Mashona Clinic","Mason Street Clinic","Mdumezulu Clinic","Mondlo 2 Clinic","Mountain View Hospital","Mpungamhlophe Clinic","Ncemaneni Clinic","Ncotshane Clinic","Ndlozana Clinic","Ngqeku Clinic","Nhlekiseni Clinic","Nhlopheni Clinic","Nhlungwana Clinic","Njoko Clinic","Nkonjeni Hospital","Nkunzana Clinic","Nomdiya Clinic","Ntababomvu Clinic","Okhukho Clinic","Ombimbini Clinic","Ophuzana Clinic","Paulpietersburg Clinic","Pongola Clinic","Princess Mhlosheni Clinic","Qalukubheka Clinic","Queen Nolonolo Clinic","Siloah Clinic","Siloah Lutheran Hospital","Siyakhathala Clinic","Sizana Clinic","Sovane Clinic","St Francis Hospital","Stedham Clinic","Swart Mfolozi Clinic","Thembumusa Clinic","Thulasizwe Hospital","Tobolsk Clinic","Ulundi A Clinic","Usuthu Clinic","Vryheid Hospital","Vumani Clinic","Wela Clinic","Zilulwane Clinic"],
        "eThekwini Metropolitan": ["Adams Mission Clinic","Addington Hospital","Amanzimtoti Clinic","Amaoti Clinic","Athlone Park Hall Clinic","Austerville Clinic","Bayview Clinic","Beatrice Street Clinic","Besters Clinic","Bluff Clinic","Caneside Clinic","Cato Manor CHC","Charles James TB Hospital","Chatsworth Township Centre Clinic","Chesterville Clinic","Clairwood Hospital","Clare Estate Clinic","Clermont Clinic","Craigieburn Clinic","Danganya Clinic","Don McKenzie TB Hospital","Dr Pixley Ka Seme Memorial Hospital","Ekuhlengeni Sanatorium Hospital","Ekuphileni (Umlazi L) Clinic","Ezimwini Clinic","Folweni Clinic","FOSA TB Hospital","Fredville Clinic","Glen Earle Clinic","Goodwins Clinic","Grove End Clinic","Halley Stott Clinic","Hambanathi Clinic","Hillcrest Hospital","Hlengisizwe CHC","Inanda C CHC","Inanda Seminary Clinic","Inkosi Albert Luthuli Central Hospital","Isipingo Clinic","King Dinuzulu (King George V) Hospital","King Edward VIII Hospital","Kingsburgh Clinic","Klaarwater Clinic","Kloof Clinic","KwaDabeka CHC","KwaMakhutha Clinic","KwaMashu B Clinic","KwaMashu Poly CHC","KwaNdengezi Clinic","KwaNgcolosi Clinic","KwaZulu-Natal Child Hospital","La Lucia Clinic","Lamontville Clinic","Lancers Road Clinic","Lindelani Clinic","Lovu Clinic","Luganda Clinic","Magabheni Clinic","Mahatma Gandhi Memorial Hospital","Maphephetheni Clinic","Mariannridge Clinic","McCord Provincial Eye Hospital","McCords Hospital","Merebank Clinic","Mfume Clinic","Mpola Clinic","Mpumalanga Clinic","Msunduze Bridge Clinic","Mzamo Clinic","Nagina Clinic","Nazareth Clinic","New Germany Clinic","Newlands West Clinic","Newtown A CHC","Nkwali Clinic","Nsimbini Clinic","Ntshongweni Clinic","Ntuzuma Clinic","Odidini Clinic","Oral and Dental Institute","Osindisweni Hospital","Osizweni (Umlazi Q) Clinic","Ottawa Clinic","Overport Clinic","Peaceville Clinic","Phoenix CHC","Pinetown Clinic","Prince Mshiyeni Hospital","Prince Mshiyeni Memorial Hospital","Prince Zulu CDC (Durban Chest) Clinic","Qadi Clinic","Queensburgh Clinic","R.K. Khan Hospital","Redcliffe Clinic","Reservoir Hills Clinic","RK Khan Hospital","SAMHS Bluff Military Medical Room","Savannah Park Clinic","Sea Cow Lake Clinic","Shallcross Clinic","Shongweni Dam Clinic","Sivananda Clinic","St Aidans Hospital","St Annes Clinic","St Mary's Hospital","St Mary's Hospital (Mariannhill)","Stonebridge Clinic","Sydenham Heights Clinic","Tongaat CHC","Trenance Park Clinic","Tshelimnyama Clinic","Umbumbulu Clinic","Umkomaas Clinic","Umlazi AA Clinic","Umlazi D Clinic","Umlazi G - Dorothy Nyembe Clinic","Umlazi K Clinic","Umlazi N/Boyi Simelane Clinic","Umlazi U21 Clinic","Umnini Clinic","Umzomuhle - Umlazi H Clinic","University of Kwa-Zulu Natal (NHLS)","Verulam Clinic","Waterfall Clinic","Waterloo Clinic","Wentworth Hospital","Woodhurst Clinic","Wyebank Clinic","Zwelibomvu Clinic"],
        "iLembe District": ["Amatikulu Chronic Home Hospital","Chibini Clinic","Esidumbini Clinic","General Justice Gizenga Mpanza (Stanger) Regional Hospital","KwaNyuswa Clinic","Montebello Hospital","Mwolokohlo Clinic","Ndwedwe CHC","Stanger Hospital","Sundumbili CHC","Thafamasi Clinic","Umphumulo Hospital","Untunjambili Hospital","Wosiyane Clinic"],
        "uMgungundlovu District": ["Appelsbosch Hospital","Bruntville CHC","Doris Goodwin TB Hospital","East/Boom CHC","Edendale Hospital","Esigodini Clinic","Fort Napier Hospital","Gcumisa Clinic","Gomane Clinic","Grange Clinic","Grey's Hospital","Howick Clinic","Imbalenhle CHC","Impilwenhle Clinic","Injabulo Clinic","Khan Road Clinic","Mafakathini Clinic","Maguzu Clinic","Mahlutshini Clinic","Mambedwini Clinic","Masons Clinic","Mayizekanye Clinic","Mbuthisweni (Inhlazuka) Clinic","Mooi River Clinic","Mpophomeni Clinic","Mpumuza Clinic","Ncwadi Clinic","Ndaleni Clinic","Ngubeni (Sondelani) Clinic","Northdale Clinic","Northdale Hospital","Ntembeni Clinic","Nxamalala (Impendle) Clinic","Pata Clinic","Phatheni Clinic","Richmond Chest Hospital","Richmond Clinic","Richmond Hospital","Scottsville Clinic","Sinathing Clinic","Sobantu Clinic","Songonzima Clinic","Taylors Halt Clinic","Town Hill Hospital","Umgeni Hospital","Umgeni Waterfall Hospital","Willowfountain Clinic","Woodlands Clinic"],
        "uMkhanyakude District": ["Bethesda Hospital","Bhekabantu Clinic","Ekuhlehleni Clinic","Empophomeni Clinic","Esiyembeni Clinic","Ezimpondweni Clinic","eZwenelisha Clinic","Gedleza Clinic","Gunjaneni Clinic","Gwaliweni Clinic","Hlabisa Hospital","Hluhluwe Clinic","Inhlwathi Clinic","Jozini Clinic","Kwambuzi Clinic","KwaMsane Clinic","KwaNdaba Clinic","KwaZibi Clinic","Mabibi Clinic","Macabuzela Clinic","Machibini Clinic","Madonela Clinic","Madwaleni Clinic","Mahlungulu Clinic","Makhathini Clinic","Makhowe Clinic","Manaba Clinic","Manguzi Hospital","Manyiseni Clinic","Maputa Clinic","Mbazwana Clinic","Mboza Clinic","Mduku Clinic","Mhlekazi Clinic","Mkuze Clinic","Mnqobokazi Clinic","Mosvold Hospital","Mpembeni Clinic","Mpukunyoni Clinic","Mseleni Hospital","Mshudu Clinic","Mtubatuba Clinic","Mvelabusha Clinic","Ndumo Clinic","Nkundusi Clinic","Nkungwini Clinic","Nondabuya Clinic","Ntondweni Clinic","Ntshongwe Clinic","Ophansi Clinic","Ophondweni Clinic","Oqondweni Clinic","Othobothini CHC","Phelandaba Clinic","SAMHS Mtubatuba Sickbay","Shemula Clinic","Sipho Zungu Clinic","Somkhele Clinic","Thengane Clinic","Zama Zama Clinic"],
        "uMzinyathi District": ["Amakhabela Clinic","Amatimatolo Clinic","Charles Johnson Memorial Hospital","Church of Scotland Hospital","Collessie Clinic","Cwaka Clinic","Douglas Clinic","Dundee Hospital","Ehlanzeni Clinic","Empathe Clinic","Eshane Clinic","Felani Clinic","Glenridge Clinic","Greytown Hospital","Greytown TB Hospital","Gunjana Clinic","Hlathi Dam Clinic","Inkosi Thathezakhe Clinic","Isandlwana Clinic","Kranskop (Mambulu) Clinic","KwaNyezi Clinic","KwaSenge Clinic","Mandleni Clinic","Mangeni Clinic","Manxili Clinic","Masotsheni Clinic","Mawele Clinic","Mazabeko Clinic","Mhlangana Clinic","Mhlungwane Clinic","Mkhonjane Clinic","Mkhuphula Clinic","Msizini Clinic","Muden Clinic","Mumbe Clinic","Ngabayena Clinic","Ngubevu Clinic","Nkande Clinic","Nocomboshe Clinic","Nondweni Clinic","Ntembisweni Clinic","Ntinini Clinic","Pine Street (Greytown) Clinic","Pomeroy CHC","Rorke's Drift Clinic","Sakhimpilo (Dundee Sibongile) Clinic","Sibuyane Clinic","Siphimpilo (Glencoe Sithembile) Clinic","Ukuthula Clinic","Wasbank Clinic","Zamimpilo Clinic"],
        "uThukela District": ["Acaciavale Clinic","AE Haviland Memorial Clinic","Amazizi Clinic","Bergville Clinic","Busingatha Clinic","Connor Street Clinic","Cornfields Clinic","Driefontein Clinic","Dukuza Clinic","Ekuvukeni Clinic","Emmaus Hospital","Estcourt Hospital","Ezakheni 2 Clinic","Ezakheni E Clinic","Fordeville Clinic","Gcinalishone Clinic","Injisuthi Clinic","Kleinfontein Clinic","KwaMteyi Clinic","Ladysmith Hospital","Limehill Clinic","Limit Hill Clinic","Madiba Clinic","Matiwaneskop Clinic","Ncibidwane Clinic","Ntabamhlope Clinic","Oliviershoek Clinic","Rockcliff Clinic","Sahlumbe Clinic","SAMHS Ladysmith Sickbay","Sigweje Clinic","St Chads CHC","Steadville Clinic","Walton Clinic","Watersmeet Clinic","Wembezi Clinic"]
    },
    "Limpopo": {
        "Capricorn District": ["A. Mamabolo Clinic","Alldays Clinic","Ambergate Clinic","Block 14 Clinic","Blouberg CHC","Boschsplaats Clinic","Botlokwa Hospital","Buffelshoek Clinic","Buite Clinic","Burgerrecht Clinic","Byldrift Clinic","Chuene Clinic","Dendron Clinic","Devrede Clinic","Diana Clinic","Dikgale Clinic","Dithabaneng Clinic","Donald CHC","Dr Machupe Memorial Hospital","Dr Machupe Mphahlele CHC","Eisleben Clinic","Evelyn. Lekganyane Clinic","Gideon Clinic","Goedgevonden Clinic","Goedtrou Clinic","Grootdraai Clinic","Helen Franz Hospital","Hwelereng Clinic","Indermark Clinic","J.Mamabolo Clinic","Kibi Clinic","Krantzplaast Clinic","Kromhoek Clinic","Laastehoop Clinic","Lebowakgomo (Groothoek Memorial) Hospital","Lebowakgomo Clinic","Lebowakgomo Hospital","Ledwaba Clinic","Lesfontein Clinic","Lonsdale Clinic","Mafefe Clinic","Maja Clinic","Makanye Clinic","Makgato Clinic","Makotopong Clinic","Malemati Clinic","Mamotshwa Clinic","Mamushi Clinic","Manamela Clinic","Mankweng Clinic","Mankweng Hospital","Mapodu Clinic (Spitzkop)","Maraba Clinic","Mashashane Clinic","Mashite Clinic","Mathabatha Clinic","Matlala Clinic","Matoks Clinic","Mogoto Clinic","Mohodi Clinic","Molepo Clinic","Moletjie Clinic","Moletlane Clinic","Montz Clinic","Morotse Thamagane Clinic","Mothiba Clinic","Mphahlele Clinic","Mushubaba (Matamanyane) Clinic","My darling Clinic","Nobody Clinic","Percy Clinic","Perskebuilt Clinic","Phuti Clinic","Pietersburg Hospital","Polokwane Hospital","Potgieter Street CHC","Rakgoatha Clinic","Ramokgopa Clinic","Ratshaatshaa CHC","Rethabile CHC","Rosenkrantz Clinic","Sadu Clinic","SAMHS Polokwane Military Medical Clinic","Schoongesight Clinic","Seakamela Clinic","Sebayeng Clinic","Sehlale Clinic","Sello Moloto Clinic","Semenya Clinic","Seobi-Dkgale Clinic","Seshego 2 Clinic","Seshego 3 Clinic","Seshego 4 Clinic","Seshego Hospital","Slypsteen Clinic","Smugglers Union Clinic","Soetfontein Clinic","St Joseph's Hospital","Taaiboschgroet Clinic","Thabamoopo Hospital","Towerfontein Clinic","UitKyk Clinic","Unit B Clinic","Unit R Clinic","University of Limpopo (NHLS)","W.F Knobel Hospital","Zebediela Estate Clinic","Zebediela Hospital","Zeist Clinic"],
        "Mopani District": ["Basani Clinic","Bellevue Clinic","Benfarm Clinic","Bismark Clinic","Bochabelo Clinic","Bolobedu Clinic","Busstop Clinic","Calais Clinic","Carlotta Clinic","Charlie Rangaan Clinic","Dan Clinic","Dr C.N Phatudi Hospital","Dr Hugo Clinic","Duiwelskloof CHC","Dzumeri CHC","Evuxakeni Hospital","Giyani CHC","Grace Mugodeni CHC","Hlaneki Clinic","Hoedspruit Clinic","Humulani Clinic","Jamela Clinic","Julesburg CHC","Kgapane Clinic","Kgapane Hospital","Khakhala-Hlomla Clinic","Kheyi Clinic","Khujwana Clinic","Kremetart Clinic","Lebaka Clinic","Lenyenye Clinic","Lephepane Clinic","Letaba Hospital","Letsitele Clinic","Loloka Clinic","Lorraine Clinic","Lulekani CHC","Maake Clinic","Mabins Clinic","Madumane Clinic","Mahale Clinic","Makgope Clinic","Makhushane Clinic","Makhuva Clinic","Mamaila Clinic","Mamanyoha Clinic","Mamitwa Clinic","Mapayeni Clinic","Maphalle Clinic","Maphutha L Malatji Hospital","Mariveni Clinic","Mashishimale Clinic","Matsotsosela Clinic","Matswi Clinic","Mawa Clinic","Medingen Clinic","Mhlava- Willem Clinic","Middlewater Clinic","Modjadji V Clinic","Mogoboya Clinic","Moime Clinic","Mokgapeng Clinic","Mokgwathi Clinic","Morapalala Clinic","Morutji Clinic","Motupa Clinic","Msengi Clinic","Muhlava Clinic","Namakgale A Clinic","Namakhale B Clinic","Ndengeza Clinic","Ngove Clinic","Nkhensani Hospital","Nkomo Clinic","Nkowankowa CHC","Nkuri Clinic","Ntluri Clinic","Nyavana Clinic","Ooghoek Clinic","Phalaborwa CHC","Pheeha Clinic","Ramotshinyadi Clinic","Raphahelo Clinic","Ratanang Clinic","Relela Clinic","Rotterdam Clinic","SAMHS Ba-Phalaborwa Sickbay","SAMHS Hoedspruit Military Base Hospital","Seapole Clinic","Sekgopo Clinic","Sekororo Clinic","Sekororo Hospital","Selwane Clinic","Senobela Clinic","Shikhumba Clinic","Shiluvana CHC","Shivulani Clinic","Shotong Clinic","Sikhimini Clinic","Sophia Clinic","The Oaks Clinic","Thomo Clinic","Tours Clinic","Turkey Clinic","Tzaneen Busstop Clinic","Tzaneen La Clinic","Van Velden Hospital","Van Velden Memorial Hospital","Willows Clinic","Xitlakati Clinic","Zangoma Clinic","Zava Clinic"],
        "Sekhukhune District": ["Boshkloof Clinic","Burgersfort Health Centre","Dichoeong Clinic","Dikgalaopeng Clinic","Dilokong Hospital","Eensaam Clinic","Eerstegeluk Clinic","Elandsdoring Clinic","Elandskraal Clinic","Goedgedagcht Clinic","Groblersdal Clinic","Groblersdal Hospital","HC Boshoff CHC","Hlogotluo Clinic","Ikageng Clinic","Jane Furse Hospital","Klipspruit Clinic","Kwarilagte Clinic","Madibong Clinic","Magalies Clinic","Magokubjane Clinic","Makepsvlei Clinic","Makofane Clinic","Mamone Clinic","Mampane Clinic","Manganeng Clinic","Mankotsane Clinic","Manotoane Clinic","Marble hall Clinic","Marishane Clinic","Marulaneng Clinic","Mashabela Clinic","Matlala Clinic","Matlala Hospital","Matsageng Clinic","Matsepe Clinic","Mecklenburg Hospital","Mmotoaneng Clinic","Mmutlane Clinic","Moeding Clinic","Moganyaka Clinic","Mohlaletse Clinic","Motetema Clinic","Motlolo Clinic","Motsepe Clinic","Motshana Clinic","Moutse east Clinic","Moutse West Clinic","Mphanama Clinic","Naboomkopies Clinic","Nchabeleng CHC","Nchabeleng Clinic","Ngwaabe Clinic","Nkoana Clinic","Penge CHC","Phaahla Clinic","Phamamanoge Clinic","Phasha Clinic","Phathantswane Clinic","Philadelphia Hospital","Phokoane Clinic","Poulos Masha Clinic","Praktiseer Clinic","Probeering Clinic","Rammupudu Clinic","Reitfontein Clinic","Riba Clinic","Rietfontein Clinic","Rosenekal Clinic","Schoonoord Clinic","Selala Clinic","Selepe Clinic","Sephaku Clinic","Seroka Clinic","Setlaboswane Clinic","Spitpunt Clinic","St Ritas Hospital","Sterspruit Clinic","Swaranang Clinic","Taung Clinic","Tooitskraal Clinic","Tshehlwaneng Clinic","Tswaing Clinic","Van der Merweskraal Clinic","Witfontein Clinic","Zaaiplaas Clinic"],
        "Vhembe District": ["Bungeni CHC","Damani Clinic","Davhana Clinic","De Hoop Clinic","Donald Fraser Hospital","Duvhuledza Clinic","Dzingahe Clinic","Dzwerani Clinic","Elim Hospital","Folovhodwe Clinic","Fondwe Clinic","Gondeni Clinic","Guyini Clinic","Ha Mutsha Clinic","Hayani Hospital","Helderwater Clinic","Khakhu Clinic","Khensani Clinic","Khomele Clinic","Kulani Clinic","Kurhuleni Clinic","Kutama Clinic","Lambani Clinic","Levubu Clinic","Louis Trichardt Hospital","Louistrichart Clinic","Lwamondo Clinic","Madala Clinic","Madimbo Clinic","Madombidzha Clinic","Magwedza Clinic","Makahlule Clinic","Makhado CHC","Makonde Clinic","Makuleke Clinic","Makuya Clinic","Malamulele Clinic","Malamulele Hospital","Manavhela Clinic","Manenzhe Clinic","Manyima Clinic","Marseilles Clinic","Masakona Clinic","Mashamba Clinic","Mashau Clinic","Masisi Clinic","Matavhela Clinic","Matiyani Clinic","Matsa Clinic","Matsheka Clinic","Mavambe Clinic","Mbilwi Clinic","Mbokota Clinic","Mhinga Clinic","Mphambo CHC","Mpheni Clinic","Mphephu Clinic","Mtititi Clinic","Mudimeli Clinic","Muila Clinic","Mukhomi Clinic","Mukula Clinic","Mulala Clinic","Muledane Clinic","Mulenzhe Clinic","Mulima Clinic","Murangoni Clinic","Musina Clinic","Mussina Hospital","Mutale CHC","Muwaweni Clinic","Nancefield Clinic","Nghezimani Clinic","Nthabalala Clinic","Ntlhaveni Clinic D","Ntlhaveni Clinic-C","Ntlhaveni E Clinic","Olifantshoek Clinic","Peningotsa Clinic","Pfanani Clinic","Phadzima Clinic","Phiphidi Clinic","Rabali Clinic","Rambuda Clinic","Riverplaats Clinic","Rumani Clinic","Sambandou Clinic","SAMHS Makhado Sickbay","Sereni Clinic","Shakadza Clinic","Shayamdima Clinic","Shigalo Clinic","Shikundu Clinic","Shingwezi Clinic","Sibasa Clinic","Siloam Hospital","Straightchardt Clinic","Strekstroom Clinic","Thengwe Clinic","Thohoyandou CHC","Tiyani CHC","Tlangelani Clinic","Tshakuma Clinic","Tshaulu Clinic","Tshififi Clinic","Tshifudi Clinic","Tshikundamalema Clinic","Tshikuwi Clinic","Tshilidzini Hospital","Tshilwavhusiku CHC","Tshimbupfe Clinic","Tshino Clinic","Tshiombo Clinic","Tshipise Clinic","Tshisaulu Clinic","Tshiungani Clinic","Tshivase thondo Clinic","Tshixwadza Clinic","Tswinga Clinic","Valdezia Clinic","Vhambelani Maelula Clinic","Vhufuli – Tshitekere Clinic","Vhuri-vhuri Clinic","Vleifontein Clinic","Vuvha Clinic","Vyeboom Clinic","Waterval Clinic","Wayeni Clinic","William Eddie CHC"],
        "Waterberg District": ["Abbotspoort Clinic","Alma Clinic","Anglo Platinum Mine Hospital","Armoede Clinic","Bakenberg Clinic","Bavaria Clinic","Bela Bela Clinic","Bokwalakwala Clinic","Chalema Clinic","Chromite Clinic","Dwaalboom Clinic","Ellisras Clinic","Ellisras Hospital","FH O MDR Hospital","FH Odendaal Hospital","Ga-Madiba Clinic","George Masebe Hospital","Jakkalskuil Clinic","Kromdraai Clinic","Lekhureng Clinic","Lephalale Clinic","Mabuela Clinic","Mahwelereng Clinic Zone 1","Mahwelereng Clinic Zone 2","Makgobe Clinic","Mamaselela Clinic","Mankuwe Clinic","Mapela Clinic","Marapong CHC","Marapong Clinic","Mattanau Clinic","Modimolle Town Clinic","Mogalakwena /Manyoge Clinic","Mokamole Clinic","Mokopane Hospital","Mookgophong CHC","Mosesetjane Clinic","Northam Clinic","Paulos Clinic","Phafola Clinic","Phagameng Clinic","Pholotji Clinic","Pienaarsrivier Clinic","Platinum Health Setaria Mine Hospital","Platinum Health Union Mine Hospital","Rebone Clinic","Regorogile Clinic 1","Regorogile Clinic 2","Roedtan Clinic","Rooiberg Clinic","Segole Clinic","Sekgakgapeng Clinic","Seleka Clinic","Settlers Clinic","Shongoane Clinic","Steenbokpan Clinic","Sterkwater Clinic","Swartklip Clinic","Swartklip Mine Hospital","Thabaleshoba CHC","Thabazimbi Hospital","Thabazimbi Town Clinic","Tiberius Clinic","Tshamahansi Clinic","Vaalkop Clinic","Vaalwater Clinic","Voortrekker Hospital","Warmbath Hospital","Warmbaths Town Clinic","Weltevreden / Nkidikitlane Clinic","Witpoort Hospital"]
    },
    "Mpumalanga": {
        "Ehlanzeni District": ["Agincourt CHC","Arthurseat Clinic","Arthurstone Clinic","Barberton Hospital","Barberton Hospital Gate Clinic","Barberton Town Clinic","Belfast Clinic","Bhubezi CHC","Bhuga CHC","Block B Clinic","Block C Clinic","Bongani TB Hospital","Boschfontein Clinic","Boulders Clinic","Bourkes Luck Clinic","Brondal Clinic","Brondal Kliniek","Brooklyn Clinic","Buffelshoek Clinic","Buffelspruit Clinic","Calcutta Clinic","Casteel Clinic","Cathyville Clinic","Clau Clau Clinic","Cork Clinic","Cottondale Clinic","Cunningmoore Clinic","Dingleydale Clinic","Dludluma Clinic","Driekoppies Clinic","Dwaleni Clinic","Dwarsloop CHC","Edinburgh Clinic","Elandsfontein Clinic","Eziweni (Pienaar) Clinic","Eziweni Clinic","Figtree Clinic","Gate Clinic","Glenthorpe Clinic","Glory Hill Clinic","Goromane Clinic","Gottenburg Clinic","Gutshwa Clinic","Harmony Hill Clinic","Hazyview Clinic","Hluvukani CHC","Hluvukani Clinic","Islington Clinic","Jeppes Reef Clinic","Jeppes Rust Clinic","Jerusalem Clinic","Jim Brown Clinic","Justicia Clinic","Kaapmuiden Clinic","Kaapsehoop Clinic","Kabokweni CHC","Kabokweni Clinic","Kamhlushwa Clinic","Kanyamazane CHC","Kanyamazane Clinic (CHC)","Khumbula Clinic","Kildare Clinic","Komatipoort (Municipality) Clinic","Komatipoort Clinic","Langloop CHC","Langloop Clinic","Legogote Clinic","Lillydale Clinic (Bhubezi)","Louieville Clinic","Lowscreek Clinic","Ludlow Clinic","Luphisi Clinic","Lydenburg Gate Clinic","Lydenburg Hospital","M'Africa CHC","M'Africa CHC (Emjindini)","Madras Clinic","Makoko Clinic","Malelane Clinic","Malelane Clinic (Municipality)","Mananga Clinic","Mangweni CHC","Mangweni Clinic","Manzini Clinic","Mapulaneng Hospital","Mariti Clinic","Mashishing Clinic","Masibekela Clinic","Matibidi Hospital","Matikwana Hospital","Matsulu CHC","Matsulu Community Health Clinic","Maviljan Clinic","Mbangwane Clinic","Mbonisweni Clinic","Mbuzini Clinic","Mgobodi CHC","Mgobodi Clinic","Middelplaas Clinic","Mjejane Clinic","Mkhuhlu Clinic","Moreipuso Clinic","Mpakeni Clinic","Msogwaba Clinic","Mthimba Clinic","Murhotso Clinic","Mzinti Clinic","Naas CHC","Naas Community Health Centre","Ndindindi Clinic","Nelspruit CHC","Nelspruit Community Health Centre","Nelsville Clinic","Nelsville Satellite Clinic","Nkwalini (Matsulu C) Clinic","Ntunda CHC","Ntunda Clinic","Oakley Clinic","Orinocco Clinic","Phiva Clinic","Phola Ntsikazi Clinic","Phola-Nzikasi CHC","Pilgrims Rest Clinic","Renee Clinic","Richtershoek Clinic","Rob Ferreira Hospital","Rolle Clinic","Sabie Clinic","Sabie Hospital","Sabie Municipal Clinic","SAMHS Nelspruit Sickbay","Sand River Clinic","Schoemansdal Clinic","Schulzendal Clinic","Shabalala Clinic","Shatale Clinic","Shilangu Clinic","Shongwe Hospital","Sibange Clinic","Sibuyile (Pienaar) Clinic","Sibuyile Clinic","Sikhwahlane Clinic","Simile Clinic","Skukuza Clinic","Steenbok Clinic","Strydom Blok Clinic","Strydomblok (Municipality) Clinic","Tekwane South Public Clinic","Thekwane Clinic","Themba Hospital","Thokozani Clinic","Thulamahashe CHC","Tintswalo Hospital","Tonga Block B Clinic","Tonga Block C Clinic","Tonga Hospital","Town Clinic","Utah Clinic MP","Valencia (satellite) Clinic","Valencia Clinic","Welverdiend Clinic","White River Municipal Clinic","Xanthia Clinic","Zoeknog Clinic","Zwelisha Clinic"],
        "Gert Sibande District": ["Amajuba Hospital","Amajuba Memorial Hospital","Amersfoort Clinic","Amsterdam CHC","Amsterdam Clinic","Badplaas CHC","Balfour Clinic","Bethal Hospital","Bethal Town Clinic","Bettysgoed Clinic","Carolina Clinic","Carolina Hospital","Chrissiesmeer / KwaChibikhulu Clinic","Daggakraal (Thembalokuphila) CHC","Davel Clinic","Derby Clinic (Rustplaas)","Diepdale Clinic","Dirkiesdorp Clinic","Dirkiesdorp Municipal Health Clinic","Driefontein Clinic","Driefontein New Stands CHC","Driefontein Old Stands Clinic","Dundonald CHC","Dundonald Community Health Center","Eerstehoek Clinic","Elsie Ballot Hospital","Elukwatini Clinic","Embalenhle CHC","Embalenhle CHC Ext 4","Embalenhle Ext. 4 CHC","Embalenhle Ext.14 Clinic","Embhuleni Hospital","Emthonjeni Clinic","Emzinoni Clinic","Entombe CHC","Ermelo Hospital","Ermelo Town Clinic","Ethandukukhanya Clinic","Evander Clinic","Evander Gold Mining hospital","Evander Hospital","Ezamokuhle Clinic","Fernie 1 Clinic","Fernie 2 Clinic","Glenmore Clinic MP","Greylingstad Clinic","Grootvlei CHC","Grootvlei Clinic","Hartebeeskop Clinic","Hartebeeskop Clinic (Oshoek Road)","Iswepe CHC","Kempville Clinic","Kinross Clinic","Kinross Municipal Clinic","Kromdraai Clinic","KwaNgema CHC","KwaNgema Clinic","Kwazanele Clinic","Langverwacht Ext 14 Clinic","Langverwaght Geriatic Clinic","Lebohang CHC","Lebohang Landra Clinic","Lilian Mambakazi CHC","Lilian Mambakazi Community Health Centre","Lochiel CHC","Lochiel Community Health Centre","Lothair/Silindile Clinic","Mayflower CHC","Mbhejeka Clinic","Mispel Clinic","Mispel Street Clinic","Mkhondo Town Clinic","Mncindi Clinic","Mooiplaas Clinic","Morgenzon Clinic","Msimango Clinic","New Scotland Clinic","Nhlazatshe 4","Nhlazatshe 6 Clinic","Nthoroane Clinic","Paulina Morapeli CHC","Perdekop CHC","Phola Park CHC","Phola Park Community Health Centre","Piet Retief Hospital","Prince Mkolishi Community Health Centre","Sakhile Clinic","SAMHS Camden Military Medical Clinic","Sead CHC","Sead Clinic","Secunda Clinic","Sesifuba TB Hospital","Sheepmore CHC","Silobela Clinic","Sinqobile Clinic","Sinqobile Clinic (Daggakraal)","Siyathemba CHC MP","Standerton Hospital","Standerton Spec TB Hospital","Stanwest Clinic","Swallowsnest Clinic","Tjakastad Clinic","Trichardt Clinic","Ubuhle Bempilo CHC (Breyten Clinic)","Ubuhlebempilo Breyten CHC","Vlakplaas Clinic","Volkrust Clinic","Volksrust Municipal Clinic","Vukuzakhe Clinic","Wakkerstroom Clinic","Wakkerstroom Municipal Clinic","Warburton CHC","Warburton Clinic MP","Winifred Maboa CHC","Winkelhaak Mine Hospital"],
        "Nkangala District": ["Ackerville Clinic","Allemansdrift B Clinic","Allemansdrift CHC","Arnot Colliery Mine Hospital","Beatty Clinic","Beatty Street Clinic","Belfast Gate Clinic","Belfast Municipal Clinic","Belfast/HA Grove Hospital","Bernice Samuel Hospital","Bloedfontein Clinic","Boekenhouthoek Clinic","Botleng Clinic","Botleng Ext 3","Botleng Ext 3 Clinic","De Beersput Clinic","Delmas Clinic","Diphalane (Pankop) CHC","Doornkop Clinic","Douglas Colliery Mine Hospital","Eastdene Clinic","Empilweni C","Empilweni Clinic MP","Empumelelweni CHC","Emthonjeni Clinic","Ext 6 Clinic","Ext 8 Clinic","Gembokspruit","Gembokspruit Clinic","Goederede C","Goederede Clinic","Greenside CHC","HA Grove Hospital","Haakdoringlaagte/Ga Maria Clinic","Hendrina Clinic","Hlalanikahle Clinic","Impungwe Hospital","Kalkfontein Clinic","Kameelpoortnek Clinic","Kameelrivier B Clinic","Klarinet CHC","Klipfontein Clinic eMalahleni","Klipplaatdrift Clinic","Koornfontein Mine Hospital","Kriel Clinic","Kriel Municipal Clinic","Kwa Guqa Extension 10 CHC","Kwaggafontein A Clinic","Kwaggafontein CHC","Kwamahlanga CHC","KwaMhlanga Hospital","Kwazamokuhle Clinic","Leeufontein Clinic","Lefiso CHC","Lefiswane Clinic","Loding Clinic","Louis Street Clinic","Louise Clinic","Lynville Clinic","Machadodorp Clinic MP","Marapyane CHC","Marapyane Community Health Centre","Mathyzensloop Clinic","Mhluzi Clinic","Middelburg Civic Centre Clinic","Middelburg Ext 6 Clinic","Middelburg Ext 8 Clinic","Middelburg Gate Clinic","Middelburg Mine Hospital","Middleburg Hospital","Mmametlhake CHC","Mmametlhake Hospital","Moloto CHC","Moripe Clinic","Moripe/Kameelrivier A Clinic","Nasaret Clinic","Newtown Parkhome Clinic","Nokaneng CHC","Ogies Clinic","Pankop/Diphalane CHC","Phake Clinic","Phola CHC","Phola Township Clinic - T.B Unit","Pieterskraal Clinic","Poly Clinic","Pullenshope Clinic","Rhenosterkop Clinic","Rietspruit Clinic","Sakhelwe Clinic","SAMHS Middelburg Sickbay","Seabe CHC","Seabe Clinic","Senzangakhona Clinic","Simunye Clinic","Siphosensimbi CHC","Siyabuswa CHC","Siyabuswa Community Health Centre","Siyathuthuka Clinic","Sr Mashiteng(Mhluzi) Clinic","Thembalethu CHC","Thubelihle CHC","Thubelihle Clinic","Troya Clinic","Tweefontein A Clinic","Tweefontein C Clinic","Tweefontein D Clinic","Tweefontein G Clinic","Tweefontein H Clinic","Tweefontein M Clinic","Vaalbank Clinic","Valschfontein Clinic","Verena CHC","Verena Community Health Clinic","Vlaklaagte 1 Clinic","Vlaklaagte 2 CHC","Vriesgewacht Clinic","Waterval Boven Clinic","Waterval Boven Hospital","Waterval CHC","Waterval Community Health Center","Weltevrede Clinic","Witbank Hospital","Witbank Special TB Hospital","Witlaagte Clinic","Wolwekraai Clinic","Wonderfontein Clinic"]
    },
    "North West": {
        "Bojanala Platinum District": ["Andrew Saffey Mine Hospital","Bafokeng CHC","Bapong CHC","Boitekong CHC","Brits Hospital","Impala Mine Hospital","Job Shimankana Tabane Hospital","Koster Hospital","Letlhabile CHC","Mabeskraal CHC","Madibeng sub-District Office","Mogwase CHC","Moretele sub-District Office","Moses Kotane Hospital","Moses Kotane sub-District Office","Pella CHC","Rustenburg Hospital","Rustenburg Platinum Mine Hospital","Rustenburg sub-District Office","Swartruggens CHC","Tlhabane CHC"],
        "Dr Kenneth Kaunda District": ["Anglogold Western Deep Levels Hospital","Boiki Thlapi CHC","Botshabelo CHC","City of Matlosana sub-District Office","Grace Mokgomo CHC","JB Marks CHC","Jouberton CHC","Klerksdorp/Tshepong Hospital Complex","Leeudoringstad CHC","Maquassi Hills sub-District Office","Nic Bodenstein Hospital","Potchefstroom Hospital","Promosa CHC","SAMHS Potchefstroom Military Base Clinic","Stilfontein Clinic","Tigane CHC","Tlokwe Sub-District Office","Tswelelang 2 CHC","Ventersdorp CHC","Ventersdorp Hospital","Witrand Hospital","Witrand Psychiatric Hospital"],
        "Dr Ruth Segomotsi Mompati District": ["Bloemhof CHC","Bray CHC","Christiana Hospital","Ganyesa CHC","Ganyesa Hospital","Huhudi CHC","Joe Morolong Memorial Hospital","Mamusa CHC","Manthe CHC","Morokweng CHC","Piet Plessis CHC","Pudumoe CHC","Reivilo CHC","Schweizer Renecke Hospital","Stella CHC","Taung Hospital","Tlakgameng CHC","Vryburg Hospital"],
        "Ngaka Modiri Molema District": ["Atamelang CHC","Bophelong Psychiatric Hospital","Borakalalo CHC","Coligny CHC","Delareyville CHC","Dinokana CHC","Disobotla Clinic","Gelukspan Hospital","General De la Rey Hospital","Itsoseng CHC","Lehurutshe Hospital","Lekoko CHC","Mahikeng Provincial Hospital","Mahikeng sub-District Office","Makgobistadt CHC","Mokgola Clinic","Montshioa Stadt CHC","Moshana CHC","Ottosdal CHC","Ramatlabama CHC","Ratlou CHC","Ratlou sub-District Office","SAMHS Molopo Sickbay","SAMHS Zeerust Sickbay","Sannieshof CHC","Thusong Hospital","Tswaing sub-District Office","Tswelelopele CHC","Unit 9 CHC","Zeerust Hospital"]
    },
    "Northern Cape": {
        "Frances Baard District": ["Barkly West Hospital","Beaconsfield Clinic","Betty Gaetsewe Clinic","De Beershoogte Clinic","Delportshoop Clinic","Dr Winston Torres Clinic","Florianville (Floors) Clinic","Galeshewe Day Hospital","Ganspan Clinic","Greenpoint Clinic","Hartswater Hospital","Jan Kempdorp CHC","Jan Kempdorp Hospital","Kimberley Hospital Complex","Kimberly Hospital","Pampierstad CHC","Pholong Clinic","Prof ZK Matthews Hospital","Robert Mangaliso Sobukwe Hospital","SAMHS Kimberley Sickbay","SAMHS Midlands Sickbay","Warrenton CHC","Warrenton Hospital","West End Specialised Psychiatric Hospital","West End Specialised TB Hospital"],
        "John Taolo Gaetsewe District": ["Cassels CHC","Danielskuil CHC","Deorham Clinic","Kagiso CHC","Kamden CHC","Kuruman Hospital","Loopeng CHC","Olifantshoek CHC","Oliphantshoek Hospital","Postmasburg Hospital","Tshwaragano Hospital"],
        "Namakwa District": ["Alexander Bay CHC","Brandvlei CHC","Brandvlei Hospital","Calvinia Hospital","Fraserburg CHC","Garies Hospital","Joe Slovo CHC","Loeriesfontein CHC","Nababeep CHC","Pofadder CHC","Port Nolloth CHC","Port Nolloth Hospital","Springbok Hospital","Sutherland CHC","Williston CHC"],
        "Pixley Ka Seme District": ["Breipaal Clinic","Carnarvon CHC","Carnarvon Hospital","Colesberg Hospital","De Aar Hospital","Douglas (Hester Malan) CHC","Douglas Hospital","Griekwastad (Helpmekaar) CHC","Griekwastad Hospital","Hopetown (Wege) CHC","Manne Dipico Hospital","Noupoort (Fritz Visser) CHC","Noupoort Hospital","Prieska Hospital","Richmond CHC","Victoria West (BJ Kempengedenk) CHC","Victoria West Hospital","Vosburg CHC"],
        "ZF Mgcawu District": ["Askham CHC","Danielskuil CHC","Gordonia Hospital","Groblershoop CHC","Harry Surtie Hospital","Kakamas Hospital","Keimoes CHC","Keimoes Hospital","Kenhardt CHC","Postmasburg Hospital","Rietfontein CHC","SAMHS Lohatla Military Base Hospital","SAMHS Upington Sickbay","Upington TB Hospital"]
    },
    "Western Cape": {
        "Cape Winelands District": ["Avian Park Clinic","Bella Vista Clinic","Bergsig Clinic","Breedevalley Hospital","Breerivier Clinic","Brewelskloof Hospital","Ceres CDC","Ceres Forensic Pathology Service","Ceres Hospital","Cloetesville CDC","Cogmanskloof Clinic","Dalvale Clinic","De Doorns Clinic","De Wet Satellite Clinic","Dirkie Uys Street Satellite Clinic","Don And Pat Bilton Clinic","Drakenstein Palliative Hospice","Empilisweni (Worcester) Clinic","Gouda Clinic","Groendal Clinic","Groenleegte care cure Paarl","Happy Valley Clinic","Huis Mccrone Clinic","Idas Valley Clinic","Kayamandi Clinic","Klapmuts Clinic","Klein Drakenstein Clinic","Kylemore Clinic","Langeberg Sub-District Oral Health Service","Mbekweni CDC","Mcgregor Clinic","Montagu Clinic","Montagu Hospital","Nduli Clinic","Nieuwedrift Clinic","Nkqubela Clinic","Op Die Berg Clinic","Orchard Clinic","Overhex Satellite Clinic","Paarl Forensic Pathology Service","Paarl Hospital","Patriot Plein Clinic","Phola Park Clinic","Pniel Satellite Clinic","Prince Alfred Hamlet Clinic","Rawsonville Clinic","Regina Centre","Riviersonderend Clinic","Robertson Hospital","Sandhills Clinic","Saron Clinic","Simondium Clinic","Soetendal Clinic","Sonstraal TB Hospital","Stellenbosch Hospital","TC Newman CDC","Touws River Clinic","Tulbagh Clinic","Tygerberg Community Dental Clinic","Tygerberg Oral Health Centre","University of Stellenbosch (NHLS)","Wellington CDC","Windmeul Clinic","Wolseley Clinic","Worcester (Eben Donges) Hospital","Worcester CDC","Worcester Forensic Pathology Service","Worcester Hospital","Zolani Clinic"],
        "Central Karoo District": ["Beaufort West CDC","Beaufort West Forensic Pathology Service","Beaufort West Hospital","Hillside Clinic","Klaarstroom Satellite Clinic","Kwamandlenkosi Clinic","Laingsburg Clinic","Laingsburg Forensic Pathology Service","Laingsburg Hospital","Leeu-Gamka Clinic","Matjiesfontein Satellite Clinic","Merweville Satellite Clinic","Murraysburg Clinic","Murraysburg Hospital","Nelspoort Clinic","Nelspoort Transitional Care Hospital","Nieuveldpark Clinic","Prince Albert Clinic","Prince Albert Hospital","Toekomsrus Clinic"],
        "City of Cape Town Metropolitan": ["Albow Gardens CDC","Alexandra Hospital","Asla Clinic","Aurora Satellite Clinic","Bellville South CDC","Betty's Bay Satellite Clinic","Bishop Lavis CDC","Boland Bank CHC","Bothasig CDC","Brackengate Transitional Care","Brewelskloof TB Hospital","Brooklyn Chest Hospital","Cape Town Reproductive Health Centre","Chatsworth Clinic","Conradie Hospital","Crossroads CDC","Darling Clinic","DELFT CHC","District Six CDC","DP Marais TB Hospital","DR Abdurahman CDC","Dr Ivan Toms CDC","Du Noon CHC","Durbanville CDC","Eerste River Hospital","Elsies River CHC","False Bay Hospital","Fisantekraal CDC","GF Jooste Hospital","Good Hope CDC","Goodwood CDC","Gordon's Bay CDC","Grassy Park CDC","Green Point CDC","Groote Schuur Hospital","Guguletu CHC","Gustrouw CDC","Hanover Park CHC","Heideveld CDC","Helderberg Hospital","Hope Street Oral Health Service","Hout Bay Harbour CDC","Ikhwezi CDC","Inzame Zabantu CDC","Karl Bremer Hospital","Kensington CDC","Khayelitsha (Site B) CHC","Khayelitsha Hospital","Kleinvlei CDC","Kraaifontein CHC","Kuyasa CDC","Lady Michaelis CDC","Langa CHC","Lentegeur Hospital","Lentegeur Hospital Oral Health Service","Lentegeur Oral Health Service","Life Orthopaedic Hospital","Life Sports Science Ortho","Long Street Reproductive Health Center","Lotus River CDC","Luvuyo CDC","Macassar CDC","Maitland CDC","Maitland Oral Health Service","Mamre CDC","Matthew Goniwe CDC","Metro Men'S Health Centre","Mfuleni CDC","Michael Mapongwana CDC","Mitchells Plain CHC","Mitchells Plain Hospital","Mitchells Plain Oral Health Centre","Mowbray Maternity Hospital","New Somerset Hospital","Nolungile CDC","Nomzamo CDC","Nyanga CDC","Observatory Forensic Pathology Institute","Ocean View CDC","Orthotic And Prosthetic Centre","Parow CDC","Pelican Park CDC","Pr Alice Ortho Hospital","Protea Park CDC","Ravensmead CDC","Red Cross Hospital","Red Cross War Memorial Children'S Hospital","Reed Street CDC","Retreat CHC","Robbie Nurock CDC","Ruyterwacht CDC","SAMHS 2 Military Hospital","SAMHS Eersterivier Sickbay","SAMHS Wingfield Military Medical Clinic","SAMHS Youngsfield Military Medical Clinic","SAMHS Ysterplaat Sickbay","Saxon Sea CDC","Scottsdene CDC","Sir Lowry's Pass CDC","Somerset West CDC","St Monica's Hospital","St Vincent (CCT) CDC","St Vincent CDC","Stikland Hospital","Strand CDC","Symphony Way CDC","Tafelsig CDC","Town 2 CDC","Tygerberg Academic Hospital","Tygerberg Community Dental Clinic","Tygerberg Forensic Pathology Service","Tygerberg Hospital","Tygerberg Oral Health Centre","University of Cape Town (NHLS)","Valkenberg Hospital","Vanguard CHC","Victoria Hospital","Wesfleur Hospital","Western Cape Rehabilitation Centre","Westridge Oral Health Service","Witsand Satellite Clinic","Woodstock CDC","Yzerfontein Satellite Clinic"],
        "Garden Route District": ["Alan Blyth Hospital","Albertinia Clinic","Alma CDC","Amalienstein Clinic","Asla Clinic","Blanco Clinic","Bongolethu Clinic","Brandwacht Satellite Clinic","Bridgeton CDC","Calitzdorp (Bergsig) Clinic","Conville CDC","Crags Clinic","D'almeida CDC","Dana Bay Satellite Clinic","De Rust (Blommenek) Clinic","Dysselsdorp Clinic","Eyethu Clinic","Friemersheim Satellite Clinic","George Central Clinic","George Forensic Pathology Service","George Hospital","George Provincial Hospital","George Road Satellite Clinic","Great Brak River Clinic","Haarlem Clinic","Harry Comay TB Hospital","Hartenbos Satellite Clinic","Heidelberg Clinic","Herbertsdale Satellite Clinic","Herold Satellite Clinic","Hornlee Clinic","Karatara Satellite Clinic","Keurhoek Satellite Clinic","Khayelethu Clinic","Knysna CDC","Knysna Forensic Pathology Service","Knysna Hospital","Knysna Town Clinic","Kranshoek Clinic","Kuyasa (George) Clinic","Kwanokuthula CDC","Ladismith (Nissenville) Clinic","Lawaaikamp Clinic","Melkhoutfontein Satellite Clinic","Mossel Bay Forensic Pathology Service","Mossel Bay Hospital","Mosselbay Hospital","New Horizon Clinic","Oudtshoorn Clinic","Oudtshoorn Forensic Pathology Service","Oudtshoorn Hospital","Oudtshoorn Oral Health Service","Pacaltsdorp Clinic","Parkdene Clinic","Plettenberg Bay Clinic","Riversdale Clinic","Riversdale Forensic Pathology Service","Riversdale Hospital","Rosemoor Clinic","SAMHS Oudtshoorn Sickbay","Sedgefield Clinic","Slangrivier Satellite Clinic","Sonskynvallei Satellite Clinic","Still Bay Satellite Clinic","Thembalethu CDC","Toekomsrus Clinic","Touwsranten Clinic","Uniondale (Lyonsville) Clinic","Uniondale Hospital","Van Wyksdorp Satellite Clinic","Vlakte Plaas Health Post","Wittedrif Satellite Clinic","Zoar Clinic"],
        "Overberg District": ["Barrydale Clinic","Bereaville Satellite Clinic","Betty'S Bay Satellite Clinic","Botrivier Clinic","Bredasdorp Clinic","Buffeljagsrivier Clinic","Caledon Clinic","Caledon Hospital","Elim Satellite Clinic","Gansbaai Clinic","Genadendal Clinic","Grabouw CHC","Greyton Clinic","Hawston Clinic","Hermanus CDC","Hermanus Forensic Pathology Service","Hermanus Hospital","Kleinmond Clinic","Napier Clinic","Otto Du Plessis Hospital","Pearly Beach Satellite Clinic","Railton Clinic","Riviersonderend Clinic","Stanford Clinic","Struisbaai Clinic","Suurbraak Clinic","Swellendam Hospital","Swellendam PHC Clinic","Tesselaarsdal Satellite Clinic","Villiersdorp Clinic","Voorstekraal Satellite Clinic","Waenhuiskrans Satellite Clinic"],
        "West Coast District": ["Abbotsdale Clinic","Bitterfontein Satellite Clinic","Cederberg Hospital","Chatsworth Clinic","Citrusdal Clinic","Citrusdal Hospital","Clanwilliam Clinic","Clanwilliam Hospital","Dalvale Clinic","Darling Clinic","Diazville Clinic","Die Wieg Hospital","Doringbaai Satellite Clinic","Ebenhaezer Satellite Clinic","Eendekuil Satellite Clinic","Elands Bay Satellite Clinic","Goedverwacht Satellite Clinic","Graafwater Clinic","Hanna Coetzee Clinic","Kalbaskraal Satellite Clinic","Klawer Clinic","Kliprand Satellite Clinic","Koekenaap Satellite Clinic","Koringberg Satellite Clinic","Laingville Clinic","Lalie Cleophas Clinic","Lamberts Bay Clinic","Langebaan Clinic","LAPA Munnik Hospital","Lappa Munnik Hospital","Leipoldtville Satellite Clinic","Louwville Clinic","Lutzville Clinic","Malmesbury CDC","Malmesbury Forensic Pathology Service","Malmesbury Infectious Disease Hospital","Matzikama Hospital","Molsvlei Satellite Clinic","Moorreesburg Clinic","Nuwerus Satellite Clinic","Paternoster Satellite Clinic","Piketberg Clinic","Porterville Clinic","Radie Kotze Hospital","Redelinghuys Satellite Clinic","Riebeek Kasteel Clinic","Riebeek Wes Clinic","Rietpoort Satellite Clinic","Riverlands Satellite Clinic","Saldanha Clinic","SAMHS Langebaanweg Military Base Hospital","SAMHS Saldanha Military Medical Clinic","Saron Clinic","Sonstraal TB Hospital","Steenberg'S Cove Satellite Clinic","Stofkraal Satellite Clinic","Swartland Hospital","Van Rhynsdorp Clinic","Velddrif Clinic","Vredenburg Clinic","Vredenburg Forensic Pathology Service","Vredenburg Hospital","Vredendal Central Clinic","Vredendal Forensic Pathology Service","Vredendal Hospital","Vredendal North Clinic","Wesfleur Hospital","Wittewater Satellite Clinic","Wupperthal Satellite Clinic","Yzerfontein Satellite Clinic"]
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
        firstName:         "",
        surname:            "",
        cellNo:             "",
        workNo:             "",
        province:           "",
        district:           "",
        workPlace:          "",
        jobDescription:     "medical-officer",
        employmentArea:     "private-sector",
        workArea:           "",
        professionalNumber: "",
    });

    // Treats known "placeholder junk" values as if the field were empty.
    // Prevents members from seeing the literal word "Unknown" (written by
    // the Lookup cleaning scripts for unmatched values) displayed back to
    // them as if it were their real data.
    const PLACEHOLDER_VALUES = ["unknown", "undefined", "null", "n/a", "-"];
    const cleanValue = (val) => {
        if (!val) return "";
        const trimmed = String(val).trim();
        return PLACEHOLDER_VALUES.includes(trimmed.toLowerCase()) ? "" : trimmed;
    };

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
                    const cleanedDistrict  = cleanValue(response.data.district);
                    const cleanedWorkPlace = cleanValue(response.data.workPlace);

                    setFormData({
                        firstName:         cleanValue(response.data.firstName),
                        surname:            cleanValue(response.data.surname),
                        cellNo:             cleanValue(response.data.cellNo),
                        workNo:             cleanValue(response.data.workNo),
                        province:           cleanValue(response.data.province),
                        district:           cleanedDistrict,
                        workPlace:          cleanedWorkPlace,
                        jobDescription:     cleanValue(response.data.jobDescription)     || "medical-officer",
                        employmentArea:     cleanValue(response.data.employmentArea)     || "private-sector",
                        workArea:           cleanValue(response.data.workArea),
                        professionalNumber: cleanValue(response.data.professionalNumber),
                    });
                    // If the district isn't in our hierarchy under this province,
                    // or workPlace isn't in the list, fall back to manual entry mode.
                    // An empty/sanitized district (was "Unknown") also lands here,
                    // correctly showing a blank field for the member to fill in themselves.
                    const districtList = HIERARCHY[response.data.province]
                        ? Object.keys(HIERARCHY[response.data.province])
                        : [];
                    if (!districtList.includes(cleanedDistrict)) {
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

        if (!formData.firstName || !formData.surname || !formData.cellNo ||
            !formData.province || !formData.district || !formData.workPlace ||
            !formData.jobDescription || !formData.employmentArea) {
            setSubmitErr("Please fill in all required fields before saving.");
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
                        firstName: formData.firstName,
                        surname: formData.surname,
                        cellNo: formData.cellNo,
                        workNo: formData.workNo,
                        province: formData.province,
                        district: formData.district,
                        workPlace: formData.workPlace,
                        jobDescription: formData.jobDescription,
                        employmentArea: formData.employmentArea,
                        workArea: formData.workArea,
                        professionalNumber: formData.professionalNumber,
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
            <section className="container py-5">
                <div className="py-5 mb-5 container"></div>
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
                                        <label className="text-primary fw-bold form-label">First Name*</label>
                                        <input type="text" className="form-control border-0 border-bottom"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="text-primary fw-bold form-label">Surname*</label>
                                        <input type="text" className="form-control border-0 border-bottom"
                                            value={formData.surname}
                                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                                        <label className="text-primary fw-bold form-label">Cellphone Number*</label>
                                        <input type="tel" className="form-control border-0 border-bottom"
                                            value={formData.cellNo}
                                            onChange={(e) => setFormData({ ...formData, cellNo: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="text-primary fw-bold form-label">Work Telephone</label>
                                        <input type="tel" className="form-control border-0 border-bottom"
                                            value={formData.workNo}
                                            onChange={(e) => setFormData({ ...formData, workNo: e.target.value })}
                                        />
                                    </div>
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
                                            <input type="text" className="form-control border-0 border-bottom" placeholder="Type full facility name"
                                                value={formData.workPlace}
                                                onChange={(e) => setFormData({ ...formData, workPlace: e.target.value })}
                                            />
                                            <small className="text-muted mt-1 d-block">
                                                This must be the facility you are working in, e.g. Rob Ferreira Hospital, eDumbe CHC, Green Point Clinic.
                                            </small>
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

                                <div className="row mb-4">
                                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                                        <label className="text-primary fw-bold form-label">Employment Area*</label>
                                        <select className="form-select border-0 border-bottom" value={formData.employmentArea}
                                            onChange={(e) => setFormData({ ...formData, employmentArea: e.target.value })}>
                                            <option value="private-sector">Private sector</option>
                                            <option value="public-sector">Public sector</option>
                                            <option value="training-institute">Training institute</option>
                                            <option value="ngo">NGO</option>
                                            <option value="student">Student</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="text-primary fw-bold form-label">Work Area</label>
                                        <input type="text" className="form-control border-0 border-bottom" placeholder="e.g. Family Medicine"
                                            value={formData.workArea}
                                            onChange={(e) => setFormData({ ...formData, workArea: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-primary fw-bold form-label">Professional Number</label>
                                    <input type="text" className="form-control border-0 border-bottom"
                                        value={formData.professionalNumber}
                                        onChange={(e) => setFormData({ ...formData, professionalNumber: e.target.value })}
                                    />
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
