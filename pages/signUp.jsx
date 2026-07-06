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
        "City of Ekurhuleni Metropolitan": ["Alberton North Clinic","Bapsfontein Clinic","Bedfordview Clinic","Birchleigh Clinic","Birchleigh North Clinic","Bluegum View Sonto Tobela Clinic","Bluegum View Zamani Clinic","Brackenhurst Clinic","Chief Albert Luthuli Clinic","Crystal Park Satellite Clinic","Dan Kubheka Clinic","Dark City Community Health Centre","Daveyton Clinic","Daveyton Main Community Day Centre","Dawn Park Clinic","Duduza Clinic","East Rand Santa Hospital","Eden Park Clinic","Edenvale Clinic","Edenvale General Hospital","Edenvale Hospital","Etwatwa Phillip Moyo Community Health Centre","Far East Rand Hospital","Germiston Hospital","Goba Clinic","HC East Rand","Katlehong North Clinic","Kemston Clinic","Klopperpark Clinic","Kwa-Thema CHC","Kwa-Thema Community Health Centre","Mary Moodley Memorial Clinic","Natalspruit Hospital","Nokuthela Ngwenya CHC","Nokuthula Ngwenya Community Health Centre","Northmead Clinic","Payneville Clinic","Phola Park Community Health Centre","Pholosong Hospital","Rabie Ridge Clinic","Reiger Park Clinic","Sizwe Hospital","Tambo Memorial Hospital","Tembisa Hospital","Thelle Mogoerane Regional Hospital","Tokoza Penduka Clinic","Tokoza Phola Park Clinic","Tsakane Clinic","Vosloorus Health Centre","Wattville Clinic"],
        "City of Johannesburg Metropolitan": ["80 Albert Street Clinic","Alexandra 4th Avenue Clinic","Alexandra 8th Avenue Clinic","Alexandra Clinic","Alexandra East Bank Clinic","Alexandra Health Centre","Barney Molokoane Clinic","Bellavista Clinic","Berario Clinic","Bez Valley Clinic","Bheki Mlangeni District Hospital","Bophelong Clinic (Doornkop)","Bophelong Clinic (Ivory Park)","Bosmont Clinic","Bristlecone Clinic","Charles Hurwitz Santa Hospital","Charlotte Maxeke Academic Hospital","Charlotte Maxeke Johannesburg Academic Hospital","Chiawelo Clinic","Chiawelo Community Health Centre","Chris Hani Baragwanath Academic Hospital","Chris Hani Baragwanath Hospital","Claremont Clinic","Crosby Clinic","Crown Gardens Satellite Clinic","Davidsonville Clinic","Diepkloof Clinic (LG)","Diepkloof Clinic (Provincial)","Diepsloot Clinic","Diepsloot South Clinic","Discoverers Community Health Centre","Dobsonville Nokuphila Clinic","Ebony Park / Kaalfontein Clinic","Eikenhof Clinic","Eldorado Park Ext 1 Mobile Clinic","Eldorado Park Ext 2 Clinic","Eldorado Park Ext 9 Clinic","Elias Motsoaledi Clinic","Ennerdale Ext 8 Clinic","Ennerdale Ext 9 Clinic","Ennerdale Ext 9 Mobile Clinic","Esselen Clinic","Esselen Street Clinic","Finetown Clinic","Fleurhof Clinic","Florida Clinic","Fordsburg Clinic","Glenanda Clinic","Green Village Clinic","Halfway House Clinic","Helderkruin Clinic","Helen Joseph Hospital","Hikhensile Clinic","Hillbrow CHC","Hillbrow Community Health Centre","Itireleng Clinic","Itireleng Community Health Centre","Ivory Park Hikensile Clinic","Ivory Park Mpumelelo Clinic","Jabavu Clinic","Jabavu Community Health Centre","Jabulani CHC","Jabulani Dumani Community Health Centre","Jeppe Clinic","Jeppe Street Clinic","Joubert Park Clinic","Kibler Park Satellite Clinic","Klipspruit West Clinic","Kliptown Clinic","Kliptown Clinic (Eldorado Park)","Kliptown Mobile Clinic (Soweto)","Lawley 2 Clinic","Lawley Clinic","Lenasia Clinic (Provincial)","Lenasia Ext 10 Clinic","Lenasia Health Centre (Ext 2)","Lenasia South Civic Clinic","Lenasia South Community Health Centre","Lillian Ngoyi Community Health Centre","Malvern Clinic","Mandela Sisulu Clinic","Mayfair Clinic","Mayibuye Clinic","Meadowlands Zone 2 Clinic (LG)","Meadowlands Zone 2 Clinic (Provincial)","Michael Maponya Clinic (LG)","Michael Maponya Clinic (Provincial)","Mid-Ennerdale Clinic","Midrand West Clinic","Mofolo Community Health Centre","Mofolo South Clinic","Moroka Clinic","Mpumelelo Clinic","Naledi Mobile Clinic","Nancefield Mobile Clinic","Nokuphila Clinic","Noordgesig Clinic (LG)","Noordgesig Clinic (Provincial)","OR Tambo Clinic","Orange Farm Ext 7 Clinic","Orchards Clinic (John Fotheringham Clinic)","Orlando Clinic (LG)","Orlando Clinic (Provincial)","Parkhurst Clinic","Petervale Clinic","Princess Clinic","Protea Glen Mobile Clinic","Protea South Clinic","Rahima Moosa Mother and Child Hospital","Randburg Clinic","Rex Street Clinic","Riverlea Major Clinic","Roodepoort Clinic","Rosebank Clinic (Johannesburg)","Rosettenville Clinic","Sandown Clinic","Senaoane Clinic","Shanty Clinic","Shanty Mobile Clinic","Sinethemba Clinic","Sinqobile Clinic","Siphumlile Clinic","Sizwe Tropical Disease Hospital","Slovo Park Mobile Clinic","Slovoville Mobile Clinic","Sol Plaatjie Clinic","Sophiatown Clinic","South Hills Satellite Clinic","South Rand Hospital","Stretford Clinic","Tara Hospital","Tara The H Moross Centre","Thembelihle Clinic","Thoko Mngoma Clinic","Thuthukani Clinic","Thutukani Clinic","Tladi Clinic (LG)","Tladi Clinic (Provincial)","Tshepisong Clinic","Urban Health Clinic","Vlakfontein Clinic","Weilers Farm Clinic","Weilers Farm Mobile Clinic","Weltevreden Park Clinic","Wendywood Clinic","Westbury Clinic","Wildebeesfontein Clinic","Windsor Clinic","Winnie Mandela Clinic","Witkoppen Clinic","Yeoville Clinic","Zandspruit Clinic","Zola Clinic (LG)","Zola Community Health Centre","Zondi Clinic"],
        "City of Tshwane Metropolitan": ["Atteridgeville Clinic","Atteridgeville Phomolong Clinic","Danville Clinic","Dr George Mukhari Academic Hospital","Dr George Mukhari Hospital","East Lynne Clinic","Eersterust Clinic","Eldoraigne Clinic","FF Ribeiro Clinic","Jubilee District Hospital","Jubilee Hospital","Kalafong Hospital","Kalafong Provincial Tertiary Hospital","Karenpark Clinic","KT Motubatse Community Health Centre","Laudium CHC","Laudium Clinic","Lyttelton Clinic","Mamelodi Regional Hospital","Mamelodi Stanza Bopape CHC","Mamelodi West Clinic","Odi District Hospital","Odi Hospital","Olievenhoutbosch Clinic","Pretoria West Hospital","Rooihuiskraal Clinic","Rosslyn Clinic","Saulsville Clinic","Saulsville Gazankulu Clinic","Skinner Street CHC","Soshanguve CHC","Soshanguve Community Health Centre 3","Stanza Bopape Community Health Centre","Steve Biko Academic Hospital","Thaba Tshwane OH Clinic","Tshepong TB Hospital","Tshwane District Hospital","Weskoppies Hospital"],
        "Gert Sibande District": ["Standerton Hospital"],
        "Sedibeng District": ["Boipatong CHC","Bophelong Clinic","Empilisweni Clinic","Heidelberg Hospital","Johan Heyns CHC","Johan Heyns Community Health Centre","Kopanong Hospital","Levai Mbata Community Health Centre","Levay Mbata CHC","Meyerton Clinic","Midvaal Community Health Centre","Sebokeng Hospital","Sharpville CHC"],
        "West Rand District": ["Bekkersdal Clinic","Carletonville Hospital","Dr Yusuf Dadoo Hospital","HC West Rand","Kagiso Clinic","Leratong Hospital","Luipaardsvlei Clinic","Mogale City Central Clinic","Mogale Clinic","Mohlakeng Clinic","Muldersdrift Clinic","Noordheuwel Clinic","Randgate Clinic","Sterkfontein Hospital"]
    },
    "KwaZulu-Natal": {
        "Amajuba District": ["Charlestown Clinic","Dannhauser CHC","Durnacol Clinic","Emfundweni Clinic","Greenock Clinic","Groenvlei Clinic","Ingogo Clinic","Ladybank Clinic","Madadeni 1 Clinic","Madadeni 5 Clinic","Madadeni 7 Clinic","Madadeni Hospital","Newcastle Hospital","Niemeyer Hospital"],
        "Harry Gwala District": ["Christ the King Hospital","East Griqualand and Usher Memorial Hospital","Gcinokuhle Clinic","Gowanlee Clinic","Gqumeni Clinic","Gugwini Clinic","Gwala Clinic","Hlokozi Clinic","Ibisi Clinic","Ixopo Clinic","Jolivet Clinic","Kilmun Clinic","Kokstad Clinic","KwaMashumi Clinic","Ladam Irene Clinic","Lourdes Clinic","Malenge Clinic","Pholela CHC","Rietvlei Hospital","St Apollinaris Hospital","St Francis Hospital","Umzimkhulu Hospital"],
        "King Cetshwayo District": ["Brackenham Clinic","Buchanana Clinic","Catherine Booth Hospital","Chwezi Clinic","Cinci Clinic","Dinuntuli Clinic","Dondotha Clinic","Ekhombe Hospital","Ekombe Hospital","Ekuphumuleni Clinic","Empangeni Clinic","Ensingweni Clinic","Eshowe Hospital","Esibhudeni Clinic","Ewangu Clinic","Gingindlovu Clinic","Halambu Clinic","Isiboniso Clinic","Khandisa Clinic","King Dinizulu Clinic","KwaMagwaza Hospital","Kwambiza Clinic","Kwambonambi (Sappi) Clinic","KwaYanguye Clinic","Lower Umfolozi War Memorial Hospital","Luwamba Clinic","Mabamba Clinic","Mabhuqweni Clinic","Malunga Clinic","Mandaba Clinic","Mandlanzini Clinic","Manyane Clinic","Mbongolwane Hospital","Ngwelezana Hospital","Ngwelezane Hospital","Nkandla Hospital","Nseleni CHC","Queen Nandi Regional Hospital"],
        "Ugu District": ["Assisi Clinic","Baphumile Clinic","Bhobhoyi Clinic","Bhomela Clinic","Braemar Clinic","Dlangezwa Clinic","Dududu Clinic","Dunstan Farrell TB Hospital","Elim Clinic","G J Crookes Hospital","Gamalakhe CHC","Gcilima Clinic","GJ Crooke's Hospital","Gqayinyanga Clinic","Harding Clinic","Izingolweni Clinic","Khayelihle Clinic","KwaJali Clinic","KwaMbunde Clinic","Ludimala (Mlondi) Clinic","Mabheleni Clinic","Madlala Clinic","Murchison Hospital","Port Shepstone Hospital","St Andrews Hospital","Turton Community Health Centre"],
        "Zululand District": ["Altona Clinic","Belgrade Clinic","Benedictine Hospital","Bhekumthetho Clinic","Bhekuzulu Clinic","Buxedene Clinic","Ceza Hospital","Dengeni Clinic","eDumbe CHC","Ekubungazeleni Clinic","Emkhwakhweni Clinic","Esidakeni Clinic","Ezimfabeni Clinic","Friesgewacht Clinic","Fuduka Clinic","Gluckstadt Clinic","Hartland Clinic","Hlengimpilo Clinic","Hlobane Clinic","iDlebe Clinic","Itshelejuba Hospital","Kahhemulana Clinic","Khambi Clinic","KwaMame Clinic","KwaNkundla Clinic","KwaShoba Clinic","Lomo Clinic","Longridge Colliery Mine Hospital","Louwsburg Clinic","Luneburg Clinic","Mabedlane Clinic","Magagadolo Clinic","Mahashini Clinic","Makhosini Clinic","Makhwela Clinic","Nkonjeni Hospital","Vryheid Hospital"],
        "eThekwini Metropolitan": ["Adams Mission Clinic","Addington Hospital","Amanzimtoti Clinic","Amaoti Clinic","Athlone Park Hall Clinic","Austerville Clinic","Bayview Clinic","Beatrice Street Clinic","Besters Clinic","Bluff Clinic","Caneside Clinic","Cato Manor CHC","Charles James TB Hospital","Chatsworth Township Centre Clinic","Chesterville Clinic","Clairwood Hospital","Clare Estate Clinic","Clermont Clinic","Craigieburn Clinic","Danganya Clinic","Don McKenzie TB Hospital","Dr Pixley Ka Seme Memorial Hospital","Ekuhlengeni Sanatorium Hospital","Ekuphileni (Umlazi L) Clinic","Ezimwini Clinic","Folweni Clinic","FOSA TB Hospital","Fredville Clinic","Glen Earle Clinic","Goodwins Clinic","Grove End Clinic","Halley Stott Clinic","Hambanathi Clinic","Hillcrest Hospital","Hlengisizwe CHC","Inanda C CHC","Inanda Seminary Clinic","Inkosi Albert Luthuli Central Hospital","Isipingo Clinic","King Dinuzulu (King George V) Hospital","King Edward VIII Hospital","Kingsburgh Clinic","Klaarwater Clinic","Kloof Clinic","KwaDabeka CHC","KwaMakhutha Clinic","KwaMashu B Clinic","KwaMashu Poly CHC","KwaNdengezi Clinic","KwaNgcolosi Clinic","KwaZulu-Natal Child Hospital","La Lucia Clinic","Lamontville Clinic","Lancers Road Clinic","Lindelani Clinic","Lovu Clinic","Luganda Clinic","Magabheni Clinic","Mahatma Gandhi Memorial Hospital","McCord Provincial Eye Hospital","Osindisweni Hospital","Phoenix CHC","Prince Mshiyeni Memorial Hospital","R.K. Khan Hospital","RK Khan Hospital","Tongaat CHC","Wentworth Hospital"],
        "iLembe District": ["Amatikulu Chronic Home Hospital","Chibini Clinic","Esidumbini Clinic","General Justice Gizenga Mpanza (Stanger) Regional Hospital","KwaNyuswa Clinic","Montebello Hospital","Ndwedwe CHC","Stanger Hospital","Sundumbili CHC","Umphumulo Hospital","Untunjambili Hospital"],
        "uMgungundlovu District": ["Appelsbosch Hospital","Bruntville CHC","Doris Goodwin TB Hospital","East/Boom CHC","Edendale Hospital","Esigodini Clinic","Fort Napier Hospital","Gcumisa Clinic","Gomane Clinic","Grange Clinic","Grey's Hospital","Howick Clinic","Imbalenhle CHC","Impilwenhle Clinic","Injabulo Clinic","Khan Road Clinic","Mafakathini Clinic","Maguzu Clinic","Mahlutshini Clinic","Mambedwini Clinic","Northdale Hospital","Richmond Hospital","Town Hill Hospital","Umgeni Hospital"],
        "uMkhanyakude District": ["Bethesda Hospital","Bhekabantu Clinic","Ekuhlehleni Clinic","Empophomeni Clinic","Esiyembeni Clinic","Ezimpondweni Clinic","eZwenelisha Clinic","Gedleza Clinic","Gunjaneni Clinic","Gwaliweni Clinic","Hlabisa Hospital","Hluhluwe Clinic","Inhlwathi Clinic","Jozini Clinic","Kwambuzi Clinic","KwaMsane Clinic","KwaNdaba Clinic","KwaZibi Clinic","Mabibi Clinic","Macabuzela Clinic","Machibini Clinic","Madonela Clinic","Madwaleni Clinic","Mahlungulu Clinic","Makhathini Clinic","Makhowe Clinic","Manaba Clinic","Manguzi Hospital","Mosvold Hospital","Mseleni Hospital"],
        "uMzinyathi District": ["Amakhabela Clinic","Amatimatolo Clinic","Charles Johnson Memorial Hospital","Church of Scotland Hospital","Collessie Clinic","Cwaka Clinic","Douglas Clinic","Dundee Hospital","Ehlanzeni Clinic","Empathe Clinic","Eshane Clinic","Felani Clinic","Glenridge Clinic","Greytown Hospital","Greytown TB Hospital","Gunjana Clinic","Hlathi Dam Clinic","Inkosi Thathezakhe Clinic","Isandlwana Clinic","Kranskop (Mambulu) Clinic","KwaNyezi Clinic","KwaSenge Clinic","Mandleni Clinic","Mangeni Clinic","Manxili Clinic"],
        "uThukela District": ["Acaciavale Clinic","AE Haviland Memorial Clinic","Amazizi Clinic","Bergville Clinic","Busingatha Clinic","Connor Street Clinic","Cornfields Clinic","Driefontein Clinic","Dukuza Clinic","Ekuvukeni Clinic","Emmaus Hospital","Estcourt Hospital","Ezakheni 2 Clinic","Ezakheni E Clinic","Fordeville Clinic","Gcinalishone Clinic","Injisuthi Clinic","Kleinfontein Clinic","KwaMteyi Clinic","Ladysmith Hospital","Limehill Clinic","Limit Hill Clinic","Madiba Clinic","St Chads CHC"]
    },
    "Limpopo": {
        "Capricorn District": ["Botlokwa Hospital","Helen Franz Hospital","Lebowakgomo Hospital","Mankweng Hospital","Polokwane Hospital","Seshego Hospital","Thabamoopo Hospital","W.F Knobel Hospital","Zebediela Hospital"],
        "Mopani District": ["Dr C.N Phatudi Hospital","Evuxakeni Hospital","Kgapane Hospital","Letaba Hospital","Maphutha L Malatji Hospital","Nkhensani Hospital","Sekororo Hospital","Van Velden Hospital"],
        "Sekhukhune District": ["Dilokong Hospital","Groblersdal Hospital","Jane Furse Hospital","Matlala Hospital","Mecklenburg Hospital","Philadelphia Hospital","St Ritas Hospital"],
        "Vhembe District": ["Donald Fraser Hospital","Elim Hospital","Hayani Hospital","Louis Trichardt Hospital","Malamulele Hospital","Mussina Hospital","Siloam Hospital","Tshilidzini Hospital"],
        "Waterberg District": ["Ellisras Hospital","FH Odendaal Hospital","George Masebe Hospital","Mokopane Hospital","Thabazimbi Hospital","Voortrekker Hospital","Warmbath Hospital"]
    },
    "Mpumalanga": {
        "Ehlanzeni District": ["Agincourt CHC","Arthurseat Clinic","Arthurstone Clinic","Barberton Hospital","Barberton Hospital Gate Clinic","Barberton Town Clinic","Belfast Clinic","Bhuga CHC","Boschfontein Clinic","Boulders Clinic","Bourkes Luck Clinic","Brondal Kliniek","Brooklyn Clinic","Buffelshoek Clinic","Buffelspruit Clinic","Calcutta Clinic","Casteel Clinic","Cathyville Clinic","Clau Clau Clinic","Cork Clinic","Cottondale Clinic","Cunningmoore Clinic","Dingleydale Clinic","Dludluma Clinic","Driekoppies Clinic","Dwaleni Clinic","Dwarsloop CHC","Edinburgh Clinic","Elandsfontein Clinic","Eziweni Clinic","Figtree Clinic","Glenthorpe Clinic","Glory Hill Clinic","Goromane Clinic","Gottenburg Clinic","Gutshwa Clinic","Harmony Hill Clinic","Hazyview Clinic","Hluvukani Clinic","Islington Clinic","Jeppes Reef Clinic","Jeppes Rust Clinic","Jerusalem Clinic","Jim Brown Clinic","Justicia Clinic","Kaapmuiden Clinic","Kaapsehoop Clinic","Kabokweni Clinic","Kamhlushwa Clinic","Kanyamazane Clinic (CHC)","Khumbula Clinic","Kildare Clinic","Komatipoort Clinic","Langloop Clinic","Legogote Clinic","Lillydale Clinic (Bhubezi)","Louieville Clinic","Lowscreek Clinic","Ludlow Clinic","Luphisi Clinic","Lydenburg Gate Clinic","Lydenburg Hospital","M'Africa CHC (Emjindini)","Madras Clinic","Makoko Clinic","Malelane Clinic (Municipality)","Mananga Clinic","Mangweni Clinic","Manzini Clinic","Mapulaneng Hospital","Mariti Clinic","Mashishing Clinic","Masibekela Clinic","Matibidi Hospital","Matikwana Hospital","Matsulu Community Health Clinic","Maviljan Clinic","Mbangwane Clinic","Mbonisweni Clinic","Mbuzini Clinic","Mgobodi Clinic","Middelplaas Clinic","Mjejane Clinic","Mkhuhlu Clinic","Moreipuso Clinic","Mpakeni Clinic","Msogwaba Clinic","Mthimba Clinic","Murhotso Clinic","Mzinti Clinic","Naas Community Health Centre","Ndindindi Clinic","Nelspruit Community Health Centre","Nelsville Clinic","Nkwalini (Matsulu C) Clinic","Ntunda Clinic","Oakley Clinic","Orinocco Clinic","Phiva Clinic","Phola Ntsikazi Clinic","Pilgrims Rest Clinic","Renee Clinic","Richtershoek Clinic","Rob Ferreira Hospital","Rolle Clinic","Sabie Hospital","Sabie Municipal Clinic","Sand River Clinic","Schoemansdal Clinic","Schulzendal Clinic","Shabalala Clinic","Shatale Clinic","Shilangu Clinic","Shongwe Hospital","Sibange Clinic","Sibuyile Clinic","Sikhwahlane Clinic","Simile Clinic","Skukuza Clinic","Steenbok Clinic","Strydom Blok Clinic","Tekwane South Public Clinic","Themba Hospital","Thokozani Clinic","Thulamahashe CHC","Tintswalo Hospital","Tonga Block B Clinic","Tonga Block C Clinic","Tonga Hospital","Utah Clinic MP","Valencia Clinic","Welverdiend Clinic","White River Municipal Clinic","Xanthia Clinic","Zoeknog Clinic","Zwelisha Clinic"],
        "Gert Sibande District": ["Amajuba Hospital","Amersfoort Clinic","Amsterdam Clinic","Balfour Clinic","Bethal Hospital","Bethal Town Clinic","Bettysgoed Clinic","Carolina Clinic","Carolina Hospital","Chrissiesmeer / KwaChibikhulu Clinic","Davel Clinic","Derby Clinic (Rustplaas)","Diepdale Clinic","Dirkiesdorp Municipal Health Clinic","Driefontein Clinic","Driefontein Old Stands Clinic","Dundonald Community Health Center","Elsie Ballot Hospital","Elukwatini Clinic","Embalenhle CHC Ext 4","Embhuleni Hospital","Emthonjeni Clinic","Emzinoni Clinic","Entombe CHC","Ermelo Hospital","Ermelo Town Clinic","Evander Clinic","Evander Hospital","Ezamokuhle Clinic","Fernie 1 Clinic","Fernie 2 Clinic","Glenmore Clinic MP","Greylingstad Clinic","Grootvlei Clinic","Hartebeeskop Clinic","Iswepe CHC","Kempville Clinic","Kinross Municipal Clinic","Kromdraai Clinic","KwaNgema Clinic","Kwazanele Clinic","Langverwacht Ext 14 Clinic","Lebohang Landra Clinic","Lilian Mambakazi Community Health Centre","Lochiel Community Health Centre","Lothair/Silindile Clinic","Mayflower CHC","Mbhejeka Clinic","Mispel Street Clinic","Mkhondo Town Clinic","Mncindi Clinic","Mooiplaas Clinic","Morgenzon Clinic","Msimango Clinic","New Scotland Clinic","Nhlazatshe 4","Nhlazatshe 6 Clinic","Nthoroane Clinic","Paulina Morapeli CHC","Perdekop CHC","Phola Park Community Health Centre","Piet Retief Hospital","Prince Mkolishi Community Health Centre","Sakhile Clinic","Sead Clinic","Secunda Clinic","Sheepmore CHC","Silobela Clinic","Sinqobile Clinic (Daggakraal)","Siyathemba CHC MP","Standerton Hospital","Stanwest Clinic","Swallowsnest Clinic","Tjakastad Clinic","Trichardt Clinic","Ubuhle Bempilo CHC (Breyten Clinic)","Vlakplaas Clinic","Volksrust Municipal Clinic","Vukuzakhe Clinic","Wakkerstroom Municipal Clinic","Warburton Clinic MP","Winifred Maboa CHC"],
        "Nkangala District": ["Ackerville Clinic","Allemansdrift B Clinic","Allemansdrift CHC","Beatty Street Clinic","Belfast Municipal Clinic","Belfast/HA Grove Hospital","Bernice Samuel Hospital","Bloedfontein Clinic","Boekenhouthoek Clinic","Botleng Clinic","Botleng Ext 3 Clinic","De Beersput Clinic","Delmas Clinic","Doornkop Clinic","Eastdene Clinic","Empilweni Clinic MP","Empumelelweni CHC","Emthonjeni Clinic","Gembokspruit Clinic","Goederede Clinic","Greenside CHC","Haakdoringlaagte/Ga Maria Clinic","Hendrina Clinic","Hlalanikahle Clinic","Impungwe Hospital","Kalkfontein Clinic","Kameelpoortnek Clinic","Kameelrivier B Clinic","Klarinet CHC","Klipfontein Clinic eMalahleni","Klipplaatdrift Clinic","Kriel Municipal Clinic","Kwaggafontein A Clinic","Kwaggafontein CHC","Kwamahlanga CHC","KwaMhlanga Hospital","Kwazamokuhle Clinic","Leeufontein Clinic","Lefiswane Clinic","Loding Clinic","Louis Street Clinic","Lynville Clinic","Machadodorp Clinic MP","Marapyane Community Health Centre","Mathyzensloop Clinic","Mhluzi Clinic","Middelburg Civic Centre Clinic","Middelburg Ext 6 Clinic","Middelburg Ext 8 Clinic","Middelburg Gate Clinic","Middleburg Hospital","Mmametlhake CHC","Mmametlhake Hospital","Moloto CHC","Moripe Clinic","Nasaret Clinic","Newtown Parkhome Clinic","Nokaneng CHC","Ogies Clinic","Pankop/Diphalane CHC","Phake Clinic","Phola Township Clinic - T.B Unit","Pieterskraal Clinic","Poly Clinic","Pullenshope Clinic","Rhenosterkop Clinic","Rietspruit Clinic","Sakhelwe Clinic","Seabe Clinic","Senzangakhona Clinic","Simunye Clinic","Siphosensimbi CHC","Siyabuswa Community Health Centre","Siyathuthuka Clinic","Thembalethu CHC","Thubelihle Clinic","Troya Clinic","Tweefontein A Clinic","Tweefontein C Clinic","Tweefontein D Clinic","Tweefontein G Clinic","Tweefontein H Clinic","Tweefontein M Clinic","Valschfontein Clinic","Verena Community Health Clinic","Vlaklaagte 1 Clinic","Vlaklaagte 2 CHC","Vriesgewacht Clinic","Waterval Boven Clinic","Waterval Boven Hospital","Waterval Community Health Center","Weltevrede Clinic","Witbank Hospital","Witlaagte Clinic","Wolwekraai Clinic","Wonderfontein Clinic"]
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
        province: "",   // no default — member must actively choose
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
        province: Yup.string()
            .when("other", {
                is: () => isSouthAfrica, // only required when South Africa is the selected country
                then: Yup.string().required("Please select a province")
            }),
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
                                                                    onChange={(e) => setFormData({ ...formData, country: e.target.value, province: "", district: "", workPlace: "" })}>
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
                                                                        <option value="">— Select Province —</option>
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
                                                                        !manualFacility ? (
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
                                                                                {formData.district && (
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
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Field type="text" name="workPlace" placeholder="Type full facility name"
                                                                                    className={`form-control border-0 border-bottom ${touched.workPlace && errors.workPlace ? "is-invalid" : ""}`}
                                                                                    value={formData.workPlace}
                                                                                    onChange={(e) => { setFormData({ ...formData, workPlace: e.target.value }); handleChange(e); }}
                                                                                />
                                                                                <small className="text-muted mt-1 d-block">
                                                                                    This must be the facility you are working in, e.g. Rob Ferreira Hospital, eDumbe CHC, Green Point Clinic.
                                                                                </small>
                                                                                {availableFacilities.length > 0 && (
                                                                                    <small className="text-muted mt-1 d-block">
                                                                                        <span
                                                                                            className="text-primary"
                                                                                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                                                            onClick={() => {
                                                                                                setManualFacility(false);
                                                                                                setFormData({ ...formData, workPlace: '' });
                                                                                            }}
                                                                                        >
                                                                                            Choose from list instead
                                                                                        </span>
                                                                                    </small>
                                                                                )}
                                                                            </>
                                                                        )
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
