import { Destination } from '../types/travel';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    nameTe: 'హైదరాబాద్',
    state: 'Telangana',
    stateTe: 'తెలంగాణ',
    tagline: 'City of Pearls, Nizami Palaces & Iconic Biryani',
    taglineTe: 'ముత్యాల నగరం, చార్మినార్ & గోల్కొండ కోట వైభవం',
    description: 'Hyderabad blends 400 years of Qutb Shahi and Asaf Jahi heritage with a vibrant modern metropolis. Walk through the bustling bazaars around Charminar, witness acoustic marvels at Golconda Fort, and savor authentic Hyderabadi Dum Biryani.',
    descriptionTe: '400 ఏళ్ల చరిత్ర కలిగిన హైదరాబాద్ చార్మినార్, గోల్కొండ కోట, రామోజీ ఫిల్మ్ సిటీ మరియు రుచికరమైన హైదరాబాదీ బిర్యానీకి ప్రసిద్ధి.',
    categories: ['Historical Places', 'Temples', 'Nature'],
    rating: 4.8,
    reviewCount: 3420,
    bestTimeToVisit: 'October to March',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '18°C – 31°C',
      seasonCondition: 'Pleasant evenings, sunny afternoons',
      humidity: '45%'
    },
    costs: {
      entryTicketAvg: 250,
      localTransportPerDay: 600,
      foodPerDay: 900,
      hotelPerNight: 2800
    },
    imageKey: 'rajasthan',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Climb Charminar & shop for pearls at Laad Bazaar',
      'Watch the evening Sound & Light Show at Golconda Fort',
      'Full-day studio tour at Ramoji Film City',
      'Evening boat ride to Buddha Statue at Hussain Sagar Lake',
      'Visit Birla Mandir & Salar Jung Museum'
    ],
    famousAttractions: [
      {
        id: 'hyd-charminar',
        name: 'Charminar Monument',
        nameTe: 'చార్మినార్',
        category: 'Monument',
        openingHours: '09:00 AM – 05:30 PM',
        adultPrice: 25,
        childPrice: 0,
        duration: '1.5 hrs',
        description: 'Iconic 1591 four-minaret monument built by Muhammad Quli Qutb Shah in the heart of Old City.',
        coordinates: { x: 48, y: 68 }
      },
      {
        id: 'hyd-golconda',
        name: 'Golconda Fort & Sound Show',
        nameTe: 'గోల్కొండ కోట',
        category: 'Monument',
        openingHours: '09:00 AM – 05:30 PM (Show: 6:30 PM)',
        adultPrice: 150,
        childPrice: 80,
        duration: '3 hrs',
        description: 'Citadel famed for diamond trade history, acoustic clap portals, and panoramic sunset views.',
        coordinates: { x: 24, y: 55 }
      },
      {
        id: 'hyd-ramoji',
        name: 'Ramoji Film City Studio Tour',
        nameTe: 'రామోజీ ఫిల్మ్ సిటీ',
        category: 'Event',
        openingHours: '09:00 AM – 05:30 PM',
        adultPrice: 1350,
        childPrice: 1150,
        duration: '7 hrs',
        description: 'World’s largest integrated film studio complex with live stunt shows, gardens, and movie sets.',
        coordinates: { x: 82, y: 74 }
      },
      {
        id: 'hyd-chowmahalla',
        name: 'Chowmahalla Palace',
        nameTe: 'చౌమహల్లా ప్యాలెస్',
        category: 'Museum',
        openingHours: '10:00 AM – 05:00 PM (Closed Fri)',
        adultPrice: 100,
        childPrice: 40,
        duration: '2 hrs',
        description: 'Seat of the Asaf Jahi dynasty featuring the grand Khilwat Mubarak chandelier hall and vintage cars.',
        coordinates: { x: 45, y: 75 }
      }
    ],
    nearbyPlaces: [
      { name: 'Statue of Equality (Muchintal)', distanceKm: 38, type: 'Spiritual' },
      { name: 'Ananthagiri Hills (Vikarabad)', distanceKm: 75, type: 'Hill Station' },
      { name: 'Yadagirigutta Temple', distanceKm: 62, type: 'Temple' }
    ],
    mapCoordinates: { lat: 17.385, lng: 78.4867, indiaMapX: 46, indiaMapY: 63 },
    sampleRestaurants: [
      { name: 'Paradise Biryani (Secunderabad)', cuisine: 'Hyderabadi Mughlai', avgCostForTwo: 950, x: 54, y: 36 },
      { name: 'Chutneys (Banjara Hills)', cuisine: 'South Indian Vegetarian', avgCostForTwo: 700, x: 38, y: 44 },
      { name: 'Shadab Hotel (High Court Road)', cuisine: 'Old City Dum Biryani & Haleem', avgCostForTwo: 800, x: 49, y: 64 }
    ]
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    nameTe: 'విశాఖపట్నం (వైజాగ్)',
    state: 'Andhra Pradesh',
    stateTe: 'ఆంధ్రప్రదేశ్',
    tagline: 'Jewel of the East Coast — Beaches, Hills & Araku Valley',
    taglineTe: 'తూర్పు తీర మణిహారం — ఆర్కే బీచ్, కైలాసగిరి & అరకు లోయ',
    description: 'Visakhapatnam (Vizag) is where the lush Eastern Ghats meet the Bay of Bengal. Explore submarine museums along RK Beach, take the ropeway up Kailasagiri Hill, and ride the glass-roof Vistadome train up to Borra Caves and Araku Coffee Valley.',
    descriptionTe: 'బంగాళాఖాతం తీరాన తూర్పు కనుమల అందాలతో మెరిసే విశాఖపట్నం ఆర్కే బీచ్, కైలాసగిరి, సబ్‌మెరైన్ మ్యూజియం మరియు బొర్రా గుహలకు ప్రసిద్ధి.',
    categories: ['Beaches', 'Hill Stations', 'Nature'],
    rating: 4.7,
    reviewCount: 2680,
    bestTimeToVisit: 'October to March',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '21°C – 30°C',
      seasonCondition: 'Breezy coastal weather',
      humidity: '65%'
    },
    costs: {
      entryTicketAvg: 180,
      localTransportPerDay: 550,
      foodPerDay: 750,
      hotelPerNight: 2600
    },
    imageKey: 'goa',
    imageCropPosition: 'object-left',
    thingsToDo: [
      'Sunrise walk at RK Beach & INS Kurusura Submarine Museum tour',
      'Cable car ride to Kailasagiri Hilltop Park for sea views',
      'Vistadome train ride to Borra Caves & Araku Coffee Plantations',
      'Golden hour relaxation at Rushikonda & Yarada Beaches'
    ],
    famousAttractions: [
      {
        id: 'vizag-submarine',
        name: 'INS Kurusura Submarine Museum & TU-142',
        nameTe: 'సబ్‌మెరైన్ మ్యూజియం',
        category: 'Museum',
        openingHours: '02:00 PM – 08:30 PM (Closed Mon)',
        adultPrice: 70,
        childPrice: 40,
        duration: '1.5 hrs',
        description: 'Walk inside a real decommissioned Soviet-era Indian Navy submarine right on RK Beach.',
        coordinates: { x: 62, y: 58 }
      },
      {
        id: 'vizag-kailasagiri',
        name: 'Kailasagiri Ropeway & Viewpoint',
        nameTe: 'కైలాసగిరి రోప్‌వే',
        category: 'Park',
        openingHours: '10:00 AM – 08:00 PM',
        adultPrice: 150,
        childPrice: 90,
        duration: '2.5 hrs',
        description: 'Scenic hilltop park overlooking the curving coastline with Shiva-Parvathi statues and toy train.',
        coordinates: { x: 70, y: 34 }
      },
      {
        id: 'vizag-borra',
        name: 'Borra Caves Limestone Formations',
        nameTe: 'బొర్రా గుహలు',
        category: 'Nature',
        openingHours: '10:00 AM – 05:00 PM',
        adultPrice: 90,
        childPrice: 45,
        duration: '2 hrs',
        description: 'Million-year-old karstic limestone caves nestled in the Ananthagiri hills en route to Araku.',
        coordinates: { x: 25, y: 20 }
      }
    ],
    nearbyPlaces: [
      { name: 'Araku Valley Coffee Estates', distanceKm: 114, type: 'Hill Station' },
      { name: 'Simhachalam Varaha Lakshmi Narasimha Temple', distanceKm: 18, type: 'Temple' },
      { name: 'Lambasingi (Kashmir of Andhra)', distanceKm: 102, type: 'Hill Station' }
    ],
    mapCoordinates: { lat: 17.6868, lng: 83.2185, indiaMapX: 59, indiaMapY: 62 },
    sampleRestaurants: [
      { name: 'Dharani (Daspalla)', cuisine: 'Andhra Thali & Coastal Meals', avgCostForTwo: 650, x: 54, y: 60 },
      { name: 'The Shack (Park Hotel Beachfront)', cuisine: 'Coastal Seafood & Grill', avgCostForTwo: 1400, x: 66, y: 52 }
    ]
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    nameTe: 'తిరుపతి',
    state: 'Andhra Pradesh',
    stateTe: 'ఆంధ్రప్రదేశ్',
    tagline: 'Sacred Abode of Lord Venkateswara atop Seven Hills',
    taglineTe: 'ఏడుకొండలవాడు శ్రీ వేంకటేశ్వర స్వామి పుణ్యక్షేత్రం',
    description: 'Tirupati is one of the world’s most revered pilgrimage destinations, nestled at the foothills of Tirumala’s Seshachalam Hills. Experience divine darshan at Sri Venkateswara Swamy Temple, explore ancient rock formations at Silathoranam, and visit Sri Padmavathi Ammavari Temple.',
    descriptionTe: 'శ్రీ వేంకటేశ్వర స్వామి కొలువై ఉన్న తిరుమల తిరుపతి భారతదేశంలో అత్యంత ప్రసిద్ధ ఆధ్యాత్మిక క్షేత్రం. శిలాతోరణం, ఆకాశగంగ, పద్మావతి అమ్మవారి ఆలయం తప్పక చూడవలసినవి.',
    categories: ['Temples', 'Spiritual Places', 'Nature'],
    rating: 4.9,
    reviewCount: 5120,
    bestTimeToVisit: 'September to March',
    recommendedDays: 2,
    weatherInfo: {
      tempRange: '16°C – 29°C (Tirumala Hills)',
      seasonCondition: 'Cool hill breeze on Tirumala, warm plains below',
      humidity: '52%'
    },
    costs: {
      entryTicketAvg: 300,
      localTransportPerDay: 500,
      foodPerDay: 600,
      hotelPerNight: 2200
    },
    imageKey: 'south_kerala',
    imageCropPosition: 'object-right',
    thingsToDo: [
      'Special Entry Darshan at Tirumala Sri Venkateswara Temple',
      'Collect sacred Tirupati Laddu Prasadam',
      'Visit Akasa Ganga & Papavinasam Tirthams on Tirumala Hills',
      'Darshan at Tiruchanur Sri Padmavathi Ammavari Temple & Sri Kalahasti'
    ],
    famousAttractions: [
      {
        id: 'tpt-balaji',
        name: 'Sri Venkateswara Swamy Temple (Seeghra Darshan)',
        nameTe: 'తిరుమల శ్రీవారి దర్శనం',
        category: 'Temple',
        openingHours: '03:00 AM – 11:30 PM',
        adultPrice: 300,
        childPrice: 0,
        duration: '4 hrs',
        description: 'Ancient hill shrine dedicated to Lord Venkateswara; includes Special Entry Darshan queue simulation.',
        coordinates: { x: 45, y: 30 }
      },
      {
        id: 'tpt-chandragiri',
        name: 'Chandragiri Vijayanagara Fort & Palace',
        nameTe: 'చంద్రగిరి కోట',
        category: 'Monument',
        openingHours: '09:30 AM – 05:00 PM',
        adultPrice: 50,
        childPrice: 20,
        duration: '2 hrs',
        description: '11th-century fort and Indo-Saracenic Raja Mahal of the Vijayanagara Emperors.',
        coordinates: { x: 30, y: 72 }
      },
      {
        id: 'tpt-talakona',
        name: 'Talakona Waterfalls & Canopy Walk',
        nameTe: 'తలకోన జలపాతం',
        category: 'Nature',
        openingHours: '08:00 AM – 05:30 PM',
        adultPrice: 60,
        childPrice: 30,
        duration: '3 hrs',
        description: 'Highest waterfall in Andhra Pradesh surrounded by Sri Venkateswara National Park.',
        coordinates: { x: 20, y: 40 }
      }
    ],
    nearbyPlaces: [
      { name: 'Sri Kalahasti Rahu-Ketu Temple', distanceKm: 36, type: 'Temple' },
      { name: 'Kanipakam Vinayaka Temple', distanceKm: 68, type: 'Temple' },
      { name: 'Horsley Hills', distanceKm: 140, type: 'Hill Station' }
    ],
    mapCoordinates: { lat: 13.6288, lng: 79.4192, indiaMapX: 48, indiaMapY: 75 },
    sampleRestaurants: [
      { name: 'Annaprasadam Complex (Tirumala)', cuisine: 'Sacred Temple Vegetarian Meal', avgCostForTwo: 0, x: 47, y: 32 },
      { name: 'Bhimas Deluxe Restaurant', cuisine: 'Traditional South Indian Thali', avgCostForTwo: 550, x: 52, y: 65 }
    ]
  },
  {
    id: 'srisailam',
    name: 'Srisailam',
    nameTe: 'శ్రీశైలం',
    state: 'Andhra Pradesh',
    stateTe: 'ఆంధ్రప్రదేశ్',
    tagline: 'Jyotirlinga & Shakti Peetha in Nallamala Forest Gorge',
    taglineTe: 'నల్లమల అడవుల్లో మల్లికార్జున జ్యోతిర్లింగం & భ్రమరాంబ శక్తిపీఠం',
    description: 'Perched above the deep Krishna River gorge in the Nallamala Hills, Srisailam is one of the rare shrines housing both a Jyotirlinga (Mallikarjuna Swamy) and a Maha Shakti Peetha (Bhramaramba Devi), alongside wildlife safaris and ropeway rides to Pathala Ganga.',
    descriptionTe: 'కృష్ణా నది తీరాన నల్లమల కొండల్లో వెలసిన శ్రీ భ్రమరాంబ మల్లికార్జున స్వామి దేవాలయం, పాతాళగంగ రోప్‌వే మరియు శ్రీశైలం డ్యామ్ పర్యాటకులను ఆకట్టుకుంటాయి.',
    categories: ['Temples', 'Spiritual Places', 'Wildlife', 'Nature'],
    rating: 4.8,
    reviewCount: 1940,
    bestTimeToVisit: 'September to February',
    recommendedDays: 2,
    weatherInfo: {
      tempRange: '18°C – 30°C',
      seasonCondition: 'Forested hill climate along Krishna gorge',
      humidity: '55%'
    },
    costs: {
      entryTicketAvg: 200,
      localTransportPerDay: 500,
      foodPerDay: 550,
      hotelPerNight: 2000
    },
    imageKey: 'south_kerala',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Sparsha / Seeghra Darshan at Mallikarjuna Swamy Jyotirlinga Temple',
      'Ropeway & Krishna River boat ride at Pathala Ganga',
      'View Srisailam Hydroelectric Dam gates & reservoir viewpoint',
      'Jungle safari at Nagarjunsagar-Srisailam Tiger Reserve (Farahabad) & Akkamahadevi Caves'
    ],
    famousAttractions: [
      {
        id: 'sri-temple',
        name: 'Sri Mallikarjuna Swamy & Bhramaramba Temple',
        nameTe: 'మల్లికార్జున స్వామి ఆలయం',
        category: 'Temple',
        openingHours: '04:30 AM – 10:00 PM',
        adultPrice: 150,
        childPrice: 0,
        duration: '2.5 hrs',
        description: 'Ancient stone-carved Dravidian temple housing one of the 12 Jyotirlingas and 18 Shakti Peethas.',
        coordinates: { x: 52, y: 50 }
      },
      {
        id: 'sri-ropeway',
        name: 'Pathala Ganga Ropeway & Boating',
        nameTe: 'పాతాళగంగ రోప్‌వే & బోటింగ్',
        category: 'Adventure',
        openingHours: '07:00 AM – 05:30 PM',
        adultPrice: 180,
        childPrice: 110,
        duration: '2 hrs',
        description: 'Scenic cable car descending into the emerald Krishna River canyon with boat rides to Akkamahadevi Caves.',
        coordinates: { x: 64, y: 42 }
      },
      {
        id: 'sri-safari',
        name: 'Nallamala Tiger Reserve Eco-Safari',
        nameTe: 'నల్లమల టైగర్ సఫారీ',
        category: 'Park',
        openingHours: '07:00 AM – 04:30 PM',
        adultPrice: 400,
        childPrice: 250,
        duration: '2.5 hrs',
        description: 'Guided forest department jeep safari through India’s largest tiger reserve.',
        coordinates: { x: 32, y: 35 }
      }
    ],
    nearbyPlaces: [
      { name: 'Akkamahadevi River Caves', distanceKm: 16, type: 'Adventure' },
      { name: 'Mallela Theertham Waterfall', distanceKm: 58, type: 'Nature' },
      { name: 'Sakshi Ganapathi & Sikharam Peak', distanceKm: 8, type: 'Spiritual' }
    ],
    mapCoordinates: { lat: 16.0733, lng: 78.8681, indiaMapX: 47, indiaMapY: 67 },
    sampleRestaurants: [
      { name: 'Haritha Hill Resort Dining', cuisine: 'Andhra Vegetarian & South Indian', avgCostForTwo: 500, x: 48, y: 56 },
      { name: 'Nitya Annadana Complex', cuisine: 'Traditional Temple Prasadam Meals', avgCostForTwo: 0, x: 53, y: 49 }
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    nameTe: 'గోవా',
    state: 'Goa',
    stateTe: 'గోవా',
    tagline: 'Sun-Drenched Beaches, Portuguese Heritage & Water Sports',
    taglineTe: 'సముద్ర తీరాలు, పోర్చుగీస్ చర్చిలు & వాటర్ స్పోర్ట్స్',
    description: 'Goa offers golden Arabian Sea beaches, UNESCO-listed 16th-century churches in Old Goa, pastel Latin Quarter lanes in Fontainhas, and thundering Dudhsagar Waterfalls in the Western Ghats.',
    descriptionTe: 'అరేబియా సముద్ర తీరాన బంగారు రంగు బీచ్‌లు, ఓల్డ్ గోవా చర్చిలు, దూద్‌సాగర్ జలపాతం మరియు వాటర్ స్పోర్ట్స్‌కు గోవా ప్రసిద్ధి.',
    categories: ['Beaches', 'Adventure', 'Historical Places', 'Nature'],
    rating: 4.8,
    reviewCount: 4890,
    bestTimeToVisit: 'November to March',
    recommendedDays: 4,
    weatherInfo: {
      tempRange: '22°C – 32°C',
      seasonCondition: 'Sunny coastal breeze, warm sea waters',
      humidity: '68%'
    },
    costs: {
      entryTicketAvg: 350,
      localTransportPerDay: 800,
      foodPerDay: 1200,
      hotelPerNight: 3800
    },
    imageKey: 'goa',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Sunset kayaking & dolphin spotting at Palolem Beach',
      'Heritage walk through Basilica of Bom Jesus & Fontainhas Latin Quarter',
      'Jeep safari to Dudhsagar Waterfalls & spice plantation lunch',
      'Explore Aguada Fort & Mandovi River sunset cruise'
    ],
    famousAttractions: [
      {
        id: 'goa-aguada',
        name: 'Fort Aguada & Lighthouse',
        category: 'Monument',
        openingHours: '09:30 AM – 06:00 PM',
        adultPrice: 50,
        childPrice: 0,
        duration: '1.5 hrs',
        description: '1612 Portuguese fort overlooking Sinquerim Beach and the Mandovi River confluence.',
        coordinates: { x: 35, y: 38 }
      },
      {
        id: 'goa-dudhsagar',
        name: 'Dudhsagar Falls Jeep Safari & Spice Tour',
        category: 'Adventure',
        openingHours: '07:00 AM – 04:00 PM',
        adultPrice: 900,
        childPrice: 600,
        duration: '5 hrs',
        description: 'Four-tiered 310m waterfall deep inside Bhagwan Mahaveer Sanctuary.',
        coordinates: { x: 80, y: 72 }
      },
      {
        id: 'goa-cruise',
        name: 'Mandovi River Cultural Sunset Cruise',
        category: 'Event',
        openingHours: '05:30 PM – 08:30 PM',
        adultPrice: 500,
        childPrice: 300,
        duration: '1.5 hrs',
        description: 'Evening boat cruise with traditional Goan Dekhni and Fugdi folk performances.',
        coordinates: { x: 46, y: 48 }
      }
    ],
    nearbyPlaces: [
      { name: 'Divar Island Ferry Trail', distanceKm: 15, type: 'Nature' },
      { name: 'Gokarna Beaches', distanceKm: 135, type: 'Beach' }
    ],
    mapCoordinates: { lat: 15.2993, lng: 74.124, indiaMapX: 31, indiaMapY: 69 },
    sampleRestaurants: [
      { name: 'Fisherman’s Wharf (Cavelossim)', cuisine: 'Goan Coastal & Seafood', avgCostForTwo: 1600, x: 52, y: 75 },
      { name: 'Viva Panjim (Fontainhas)', cuisine: 'Authentic Goan-Portuguese', avgCostForTwo: 1100, x: 45, y: 49 }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    nameTe: 'ముంబై',
    state: 'Maharashtra',
    stateTe: 'మహారాష్ట్ర',
    tagline: 'Gateway of India, Art Deco Marine Drive & Island Caves',
    taglineTe: 'గేట్‌వే ఆఫ్ ఇండియా, మెరైన్ డ్రైవ్ & ఎలిఫెంటా గుహలు',
    description: 'India’s financial and cinema capital dazzles with Victorian Gothic and Art Deco ensembles, the iconic Gateway of India, ancient rock-cut Elephanta Caves across the harbor, and unforgettable street food along Marine Drive.',
    descriptionTe: 'గేట్‌వే ఆఫ్ ఇండియా, మెరైన్ డ్రైవ్, ఎలిఫెంటా గుహలు మరియు బాలీవుడ్ సంస్కృతితో ముంబై పర్యాటకులను ఆకర్షిస్తుంది.',
    categories: ['Historical Places', 'Beaches', 'Nature'],
    rating: 4.7,
    reviewCount: 4150,
    bestTimeToVisit: 'November to February',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '20°C – 31°C',
      seasonCondition: 'Warm tropical breeze',
      humidity: '66%'
    },
    costs: {
      entryTicketAvg: 300,
      localTransportPerDay: 750,
      foodPerDay: 1100,
      hotelPerNight: 4500
    },
    imageKey: 'hero',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Ferry launch from Gateway of India to UNESCO Elephanta Caves',
      'Sunset walk along Marine Drive (Queen’s Necklace) & Chowpatty',
      'Heritage walk around Chhatrapati Shivaji Maharaj Terminus & Kala Ghoda',
      'Visit Siddhivinayak Temple & Bandra-Worli Sea Link promenade'
    ],
    famousAttractions: [
      {
        id: 'mum-elephanta',
        name: 'Elephanta Caves & Harbor Ferry',
        category: 'Monument',
        openingHours: '09:00 AM – 05:30 PM (Closed Mon)',
        adultPrice: 300,
        childPrice: 180,
        duration: '4 hrs',
        description: '5th-century rock-cut basalt cave temples dedicated to Lord Shiva on Elephanta Island.',
        coordinates: { x: 75, y: 78 }
      },
      {
        id: 'mum-csmvs',
        name: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya Museum',
        category: 'Museum',
        openingHours: '10:15 AM – 06:00 PM',
        adultPrice: 150,
        childPrice: 50,
        duration: '2.5 hrs',
        description: 'Premier Indo-Saracenic museum showcasing Indus Valley artifacts and miniature paintings.',
        coordinates: { x: 48, y: 82 }
      }
    ],
    nearbyPlaces: [
      { name: 'Lonavala & Khandala Hills', distanceKm: 83, type: 'Hill Station' },
      { name: 'Alibaug Coastal Forts', distanceKm: 95, type: 'Beach' }
    ],
    mapCoordinates: { lat: 19.076, lng: 72.8777, indiaMapX: 28, indiaMapY: 59 },
    sampleRestaurants: [
      { name: 'Britannia & Co. (Ballard Estate)', cuisine: 'Parsi Berry Pulav', avgCostForTwo: 1200, x: 52, y: 76 },
      { name: 'Shree Thaker Bhojanalay', cuisine: 'Authentic Gujarati Thali', avgCostForTwo: 1300, x: 44, y: 68 }
    ]
  },
  {
    id: 'delhi',
    name: 'Delhi',
    nameTe: 'ఢిల్లీ',
    state: 'Delhi NCR',
    stateTe: 'ఢిల్లీ',
    tagline: 'Seven Historic Capitals, Grand Monuments & Chandni Chowk',
    taglineTe: 'ఎర్రకోట, కుతుబ్ మినార్, ఇండియా గేట్ & చారిత్రక వైభవం',
    description: 'India’s capital is a living museum spanning a millennium of empires. Explore UNESCO treasures like Qutub Minar, Humayun’s Tomb, and the Red Fort alongside tree-lined Lutyens’ avenues, Lotus Temple, and Old Delhi spice markets.',
    descriptionTe: 'భారతదేశ రాజధాని ఢిల్లీలో ఎర్రకోట, కుతుబ్ మినార్, ఇండియా గేట్, లోటస్ టెంపుల్ మరియు అక్షరధామ్ దేవాలయం ప్రధాన ఆకర్షణలు.',
    categories: ['Historical Places', 'Temples', 'Spiritual Places'],
    rating: 4.7,
    reviewCount: 5300,
    bestTimeToVisit: 'October to March',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '12°C – 26°C',
      seasonCondition: 'Crisp winter sunshine',
      humidity: '42%'
    },
    costs: {
      entryTicketAvg: 250,
      localTransportPerDay: 550,
      foodPerDay: 950,
      hotelPerNight: 3200
    },
    imageKey: 'rajasthan',
    imageCropPosition: 'object-left',
    thingsToDo: [
      'Explore Red Fort & cycle rickshaw tour through Chandni Chowk',
      'Sunrise architecture walk at Humayun’s Tomb & Sunder Nursery',
      'Visit Qutub Minar Complex, Lotus Temple & India Gate',
      'Evening water show at Swaminarayan Akshardham'
    ],
    famousAttractions: [
      {
        id: 'del-redfort',
        name: 'Red Fort (Lal Qila) & Museum Complex',
        category: 'Monument',
        openingHours: '09:30 AM – 04:30 PM (Closed Mon)',
        adultPrice: 80,
        childPrice: 0,
        duration: '2.5 hrs',
        description: '17th-century Mughal red sandstone fortress built by Emperor Shah Jahan.',
        coordinates: { x: 58, y: 32 }
      },
      {
        id: 'del-qutub',
        name: 'Qutub Minar UNESCO Heritage Complex',
        category: 'Monument',
        openingHours: '07:00 AM – 08:00 PM',
        adultPrice: 40,
        childPrice: 0,
        duration: '2 hrs',
        description: '73-meter victory tower built in 1193 surrounded by ancient arches and the Iron Pillar.',
        coordinates: { x: 38, y: 78 }
      },
      {
        id: 'del-humayun',
        name: 'Humayun’s Tomb & Charbagh Gardens',
        category: 'Monument',
        openingHours: '06:00 AM – 06:00 PM',
        adultPrice: 40,
        childPrice: 0,
        duration: '2 hrs',
        description: 'First garden-tomb on the Indian subcontinent that inspired the Taj Mahal.',
        coordinates: { x: 62, y: 56 }
      }
    ],
    nearbyPlaces: [
      { name: 'Agra (Taj Mahal via Yamuna Expwy)', distanceKm: 210, type: 'Historical' },
      { name: 'Neemrana Fort Palace', distanceKm: 122, type: 'Heritage' }
    ],
    mapCoordinates: { lat: 28.6139, lng: 77.209, indiaMapX: 41, indiaMapY: 28 },
    sampleRestaurants: [
      { name: 'Karim’s (Jama Masjid)', cuisine: 'Mughlai Kebabs & Korma', avgCostForTwo: 900, x: 56, y: 35 },
      { name: 'Saravana Bhavan (Connaught Place)', cuisine: 'South Indian & North Indian Veg', avgCostForTwo: 650, x: 48, y: 46 }
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    nameTe: 'జైపూర్',
    state: 'Rajasthan',
    stateTe: 'రాజస్థాన్',
    tagline: 'The Pink City of Royal Hill Forts, Palaces & bazaars',
    taglineTe: 'పింక్ సిటీ — అంబర్ కోట, హవా మహల్ & రాజపుత్ర వైభవం',
    description: 'Jaipur, the UNESCO World Heritage capital of Rajasthan, captivates travelers with the rose-tinted honeycomb facade of Hawa Mahal, the hilltop grandeur of Amber Fort, astronomical instruments at Jantar Mantar, and traditional block-printing markets.',
    descriptionTe: 'రాజస్థాన్ రాజధాని జైపూర్ పింక్ సిటీగా ప్రసిద్ధి చెందింది. అంబర్ కోట, హవా మహల్, సిటీ ప్యాలెస్ మరియు జంతర్ మంతర్ ఇక్కడి ప్రధాన ఆకర్షణలు.',
    categories: ['Historical Places', 'Nature'],
    rating: 4.9,
    reviewCount: 4720,
    bestTimeToVisit: 'October to March',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '14°C – 28°C',
      seasonCondition: 'Sunny royal desert days, cool evenings',
      humidity: '35%'
    },
    costs: {
      entryTicketAvg: 350,
      localTransportPerDay: 650,
      foodPerDay: 850,
      hotelPerNight: 3400
    },
    imageKey: 'rajasthan',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Explore Sheesh Mahal (Mirror Palace) at Amber Fort',
      'Photograph Hawa Mahal from Wind View Cafe at sunrise',
      'Tour City Palace & Jantar Mantar Royal Observatory',
      'Sunset over Pink City from Nahargarh Fort ramparts'
    ],
    famousAttractions: [
      {
        id: 'jai-amber',
        name: 'Amber (Amer) Fort & Palace',
        category: 'Monument',
        openingHours: '08:00 AM – 07:00 PM',
        adultPrice: 100,
        childPrice: 50,
        duration: '3 hrs',
        description: 'Majestic sandstone and marble fort overlooking Maota Lake with intricate mirror-work halls.',
        coordinates: { x: 68, y: 24 }
      },
      {
        id: 'jai-hawa',
        name: 'Hawa Mahal (Palace of Winds)',
        category: 'Monument',
        openingHours: '09:00 AM – 05:00 PM',
        adultPrice: 50,
        childPrice: 20,
        duration: '1 hr',
        description: 'Five-story pink sandstone palace featuring 953 finely latticed jharokha windows.',
        coordinates: { x: 52, y: 52 }
      },
      {
        id: 'jai-citypalace',
        name: 'Jaipur City Palace & Royal Museum',
        category: 'Museum',
        openingHours: '09:30 AM – 05:30 PM',
        adultPrice: 300,
        childPrice: 150,
        duration: '2 hrs',
        description: 'Royal residence featuring Peacock Gate courtyard, armoury, and royal textiles.',
        coordinates: { x: 48, y: 54 }
      }
    ],
    nearbyPlaces: [
      { name: 'Pushkar Lake & Brahma Temple', distanceKm: 145, type: 'Spiritual' },
      { name: 'Ranthambore National Park', distanceKm: 160, type: 'Wildlife' }
    ],
    mapCoordinates: { lat: 26.9124, lng: 75.7873, indiaMapX: 36, indiaMapY: 36 },
    sampleRestaurants: [
      { name: 'Laxmi Mishthan Bhandar (Johari Bazaar)', cuisine: 'Rajasthani Dal Baati Churma & Ghewar', avgCostForTwo: 750, x: 54, y: 56 },
      { name: '1135 AD (Amber Fort)', cuisine: 'Royal Rajasthani Dining', avgCostForTwo: 2400, x: 69, y: 25 }
    ]
  },
  {
    id: 'agra',
    name: 'Agra',
    nameTe: 'ఆగ్రా',
    state: 'Uttar Pradesh',
    stateTe: 'ఉత్తర ప్రదేశ్',
    tagline: 'Home of the Eternal Taj Mahal & Mughal Citadels',
    taglineTe: 'ప్రేమ చిహ్నం తాజ్ మహల్ & ఆగ్రా కోట',
    description: 'Standing on the banks of the Yamuna River, Agra is home to three UNESCO World Heritage sites: the ivory-white marble Taj Mahal, the grand red sandstone Agra Fort, and the imperial walled city of Fatehpur Sikri.',
    descriptionTe: 'యమునా నది తీరాన ఉన్న ఆగ్రాలో ప్రపంచ వింతల్లో ఒకటైన తాజ్ మహల్, ఆగ్రా కోట మరియు ఫతేపూర్ సిక్రీ ఉన్నాయి.',
    categories: ['Historical Places'],
    rating: 4.9,
    reviewCount: 6100,
    bestTimeToVisit: 'October to March',
    recommendedDays: 2,
    weatherInfo: {
      tempRange: '13°C – 27°C',
      seasonCondition: 'Clear mornings ideal for Taj sunrise',
      humidity: '40%'
    },
    costs: {
      entryTicketAvg: 300,
      localTransportPerDay: 500,
      foodPerDay: 800,
      hotelPerNight: 2900
    },
    imageKey: 'hero',
    imageCropPosition: 'object-left',
    thingsToDo: [
      'Sunrise tour of the Taj Mahal & marble inlay demonstration',
      'Explore Jahangir Palace & Musamman Burj at Agra Fort',
      'Sunset view of the Taj across the Yamuna from Mehtab Bagh',
      'Excursion to Fatehpur Sikri Buland Darwaza'
    ],
    famousAttractions: [
      {
        id: 'agr-taj',
        name: 'Taj Mahal (With Main Mausoleum Entry)',
        nameTe: 'తాజ్ మహల్',
        category: 'Monument',
        openingHours: '06:00 AM – 06:30 PM (Closed Fri)',
        adultPrice: 250,
        childPrice: 0,
        duration: '3 hrs',
        description: 'World-renowned 1632 white marble mausoleum inlaid with semi-precious pietra dura stones.',
        coordinates: { x: 60, y: 48 }
      },
      {
        id: 'agr-fort',
        name: 'Agra Red Fort UNESCO Monument',
        category: 'Monument',
        openingHours: '06:00 AM – 06:00 PM',
        adultPrice: 50,
        childPrice: 0,
        duration: '2 hrs',
        description: 'Walled imperial residence of the Mughal emperors with views toward the Taj Mahal.',
        coordinates: { x: 42, y: 46 }
      }
    ],
    nearbyPlaces: [
      { name: 'Fatehpur Sikri', distanceKm: 37, type: 'Historical' },
      { name: 'Mathura & Vrindavan Temples', distanceKm: 58, type: 'Temples' }
    ],
    mapCoordinates: { lat: 27.1767, lng: 78.0081, indiaMapX: 44, indiaMapY: 35 },
    sampleRestaurants: [
      { name: 'Pinch of Spice', cuisine: 'North Indian & Mughlai', avgCostForTwo: 1100, x: 50, y: 58 },
      { name: 'Panchi Petha Store', cuisine: 'Famous Agra Petha & Chaats', avgCostForTwo: 350, x: 45, y: 52 }
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    nameTe: 'వారణాసి (కాశీ)',
    state: 'Uttar Pradesh',
    stateTe: 'ఉత్తర ప్రదేశ్',
    tagline: 'Spiritual Capital on the Sacred Ghats of the Ganges',
    taglineTe: 'గంగా నది ఘాట్లు, కాశీ విశ్వనాథ ఆలయం & గంగా హారతి',
    description: 'One of the world’s oldest continually inhabited cities, Varanasi (Kashi) unfolds along 84 sacred river ghats on the Ganges. Witness the mesmerizing evening Ganga Aarti, visit the Kashi Vishwanath Corridor, and take a short trip to Sarnath where Buddha gave his first sermon.',
    descriptionTe: 'గంగా నది తీరాన ఉన్న కాశీ విశ్వనాథ ఆలయం, దశాశ్వమేధ ఘాట్ గంగా హారతి మరియు సారనాథ్ బౌద్ధ క్షేత్రం ఆధ్యాత్మిక అనుభూతిని అందిస్తాయి.',
    categories: ['Spiritual Places', 'Temples', 'Historical Places'],
    rating: 4.9,
    reviewCount: 3980,
    bestTimeToVisit: 'October to March',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '14°C – 27°C',
      seasonCondition: 'Misty sacred river mornings, pleasant days',
      humidity: '48%'
    },
    costs: {
      entryTicketAvg: 150,
      localTransportPerDay: 450,
      foodPerDay: 650,
      hotelPerNight: 2500
    },
    imageKey: 'hero',
    imageCropPosition: 'object-right',
    thingsToDo: [
      'Dawn hand-rowed boat ride from Assi Ghat to Manikarnika Ghat',
      'Darshan at Kashi Vishwanath Temple Corridor',
      'Witness evening Ganga Aarti at Dashashwamedh Ghat',
      'Half-day excursion to Sarnath Dhamek Stupa & Archaeological Museum'
    ],
    famousAttractions: [
      {
        id: 'vns-boat',
        name: 'Sunrise Ganga Ghat Boat Ride & Aarti View',
        category: 'Event',
        openingHours: '05:30 AM – 07:30 PM',
        adultPrice: 250,
        childPrice: 150,
        duration: '2 hrs',
        description: 'Guided wooden boat ride along the historic riverfront ghats of Kashi.',
        coordinates: { x: 64, y: 54 }
      },
      {
        id: 'vns-sarnath',
        name: 'Sarnath Dhamek Stupa & Museum',
        category: 'Monument',
        openingHours: '08:00 AM – 05:00 PM',
        adultPrice: 50,
        childPrice: 0,
        duration: '2.5 hrs',
        description: 'Sacred Buddhist site where Gautama Buddha taught the Dharma; houses the Ashoka Lion Capital.',
        coordinates: { x: 75, y: 22 }
      }
    ],
    nearbyPlaces: [
      { name: 'Ramnagar Fort across Ganges', distanceKm: 14, type: 'Historical' },
      { name: 'Prayagraj Triveni Sangam', distanceKm: 120, type: 'Spiritual' }
    ],
    mapCoordinates: { lat: 25.3176, lng: 82.9739, indiaMapX: 56, indiaMapY: 39 },
    sampleRestaurants: [
      { name: 'Kashi Chat Bhandar (Godowlia)', cuisine: 'Tamatar Chaat & Malaiyyo', avgCostForTwo: 350, x: 58, y: 55 },
      { name: 'Baati Chokha Restaurant', cuisine: 'Traditional Banarasi Vegetarian', avgCostForTwo: 600, x: 46, y: 48 }
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala (Munnar & Alleppey)',
    nameTe: 'కేరళ (మున్నార్ & అలెప్పీ)',
    state: 'Kerala',
    stateTe: 'కేరళ',
    tagline: 'God’s Own Country — Backwater Houseboats & Tea Hills',
    taglineTe: 'బ్యాక్ వాటర్స్ హౌస్‌బోట్, మున్నార్ తేయాకు తోటలు & ప్రకృతి అందాలు',
    description: 'From emerald tea plantations blanketing Munnar’s misty peaks to tranquil palm-fringed canals in Alleppey (Alappuzha) and spice-scented wildlife sanctuaries in Thekkady, Kerala offers India’s most restorative nature journey.',
    descriptionTe: 'అలెప్పీ బ్యాక్ వాటర్స్ హౌస్‌బోట్ ప్రయాణం, మున్నార్ తేయాకు తోటలు, కథకళి నృత్యం మరియు ఆయుర్వేద రిసార్టులకు కేరళ ప్రసిద్ధి.',
    categories: ['Nature', 'Hill Stations', 'Beaches', 'Wildlife'],
    rating: 4.9,
    reviewCount: 5460,
    bestTimeToVisit: 'September to March',
    recommendedDays: 5,
    weatherInfo: {
      tempRange: '17°C – 29°C',
      seasonCondition: 'Lush green hills & gentle tropical breeze',
      humidity: '70%'
    },
    costs: {
      entryTicketAvg: 300,
      localTransportPerDay: 850,
      foodPerDay: 900,
      hotelPerNight: 3800
    },
    imageKey: 'south_kerala',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Cruise Alleppey backwaters on a traditional Kettuvallam houseboat',
      'Walk through Munnar tea estates & Eravikulam National Park (Nilgiri Tahr)',
      'Watch a live Kathakali & Kalaripayattu performance in Fort Kochi',
      'Boat safari on Periyar Lake in Thekkady'
    ],
    famousAttractions: [
      {
        id: 'ker-houseboat',
        name: 'Alleppey Backwater Day Cruise & Sadhya Lunch',
        category: 'Nature',
        openingHours: '11:00 AM – 05:00 PM',
        adultPrice: 1200,
        childPrice: 700,
        duration: '5 hrs',
        description: 'Scenic Kettuvallam boat cruise through Vembanad Lake lagoons with banana-leaf Sadhya meal.',
        coordinates: { x: 40, y: 68 }
      },
      {
        id: 'ker-eravikulam',
        name: 'Eravikulam National Park & Munnar Tea Museum',
        category: 'Park',
        openingHours: '07:30 AM – 04:00 PM',
        adultPrice: 200,
        childPrice: 100,
        duration: '3 hrs',
        description: 'Rolling shola grasslands home to the endangered Nilgiri Tahr and historic tea factories.',
        coordinates: { x: 66, y: 38 }
      }
    ],
    nearbyPlaces: [
      { name: 'Varkala Cliff Beach', distanceKm: 115, type: 'Beach' },
      { name: 'Athirappilly Waterfalls', distanceKm: 75, type: 'Nature' }
    ],
    mapCoordinates: { lat: 9.9312, lng: 76.2673, indiaMapX: 39, indiaMapY: 86 },
    sampleRestaurants: [
      { name: 'Saravana Bhavan / Grand Hotel (Kochi)', cuisine: 'Kerala Sadhya & Appam Stew', avgCostForTwo: 850, x: 35, y: 45 },
      { name: 'Rapsy Restaurant (Munnar)', cuisine: 'Malabar Parotta & Tea Hills Fare', avgCostForTwo: 650, x: 65, y: 40 }
    ]
  },
  {
    id: 'kashmir',
    name: 'Kashmir (Srinagar & Gulmarg)',
    nameTe: 'కాశ్మీర్ (శ్రీనగర్ & గుల్మార్గ్)',
    state: 'Jammu & Kashmir',
    stateTe: 'జమ్మూ & కాశ్మీర్',
    tagline: 'Paradise on Earth — Dal Lake Shikaras & Alpine Meadows',
    taglineTe: 'భూలోక స్వర్గం — దాల్ సరస్సు షికారా & మంచు కొండలు',
    description: 'Ringed by snow-crowned Himalayan peaks, Kashmir enchants travelers with hand-carved cedar houseboats on Dal Lake, terraced Mughal Gardens in Srinagar, high-altitude gondola rides in Gulmarg, and pine-scented valleys in Pahalgam.',
    descriptionTe: 'మంచుతో కప్పబడిన హిమాలయ శిఖరాలు, దాల్ సరస్సులో షికారా ప్రయాణం, గుల్మార్గ్ రోప్‌వే మరియు మొఘల్ గార్డెన్స్ కాశ్మీర్ ప్రత్యేకతలు.',
    categories: ['Hill Stations', 'Nature', 'Adventure'],
    rating: 4.9,
    reviewCount: 4610,
    bestTimeToVisit: 'March to October (Snow: Dec–Feb)',
    recommendedDays: 5,
    weatherInfo: {
      tempRange: '6°C – 22°C',
      seasonCondition: 'Crisp mountain air & alpine sunshine',
      humidity: '45%'
    },
    costs: {
      entryTicketAvg: 450,
      localTransportPerDay: 950,
      foodPerDay: 950,
      hotelPerNight: 4200
    },
    imageKey: 'kashmir',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Sunset Shikara ride & floating market visit on Dal Lake',
      'Ride the Gulmarg Gondola Phase 1 & 2 to Apharwat Peak',
      'Stroll Nishat Bagh & Shalimar Bagh Mughal Gardens',
      'Day excursion to Lidder River Valley in Pahalgam'
    ],
    famousAttractions: [
      {
        id: 'kas-shikara',
        name: 'Dal Lake Shikara Ride & Mughal Gardens Pass',
        category: 'Nature',
        openingHours: '06:00 AM – 07:30 PM',
        adultPrice: 450,
        childPrice: 250,
        duration: '3 hrs',
        description: 'Private cushioned Shikara cruise across Dal Lake paired with entry to Nishat & Shalimar Gardens.',
        coordinates: { x: 52, y: 48 }
      },
      {
        id: 'kas-gondola',
        name: 'Gulmarg Gondola Cable Car (Phase 1)',
        category: 'Adventure',
        openingHours: '09:00 AM – 04:30 PM',
        adultPrice: 810,
        childPrice: 810,
        duration: '3.5 hrs',
        description: 'One of the highest operating cable cars in the world rising to Kongdoori Mountain.',
        coordinates: { x: 28, y: 34 }
      }
    ],
    nearbyPlaces: [
      { name: 'Sonamarg (Meadow of Gold)', distanceKm: 80, type: 'Hill Station' },
      { name: 'Pahalgam Betaab Valley', distanceKm: 90, type: 'Nature' }
    ],
    mapCoordinates: { lat: 34.0837, lng: 74.7973, indiaMapX: 36, indiaMapY: 11 },
    sampleRestaurants: [
      { name: 'Ahdoos (Residency Road, Srinagar)', cuisine: 'Kashmiri Wazwan & Kahwa', avgCostForTwo: 1300, x: 49, y: 52 },
      { name: 'Chai Jaai Tea Room', cuisine: 'Saffron Kahwa & Noon Chai', avgCostForTwo: 700, x: 51, y: 50 }
    ]
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    nameTe: 'బెంగళూరు',
    state: 'Karnataka',
    stateTe: 'కర్ణాటక',
    tagline: 'The Garden City of Royal Palaces, Botanical Parks & Cafes',
    taglineTe: 'ఉద్యానవనాల నగరం — లాల్‌బాగ్, బెంగళూరు ప్యాలెస్ & కబ్బన్ పార్క్',
    description: 'Known for its year-round pleasant climate and centuries-old botanical gardens, Bengaluru pairs Tudor-style Bangalore Palace and Tipu Sultan’s Summer Palace with iconic South Indian filter coffee houses and cultural spaces.',
    descriptionTe: 'చల్లని వాతావరణం, లాల్‌బాగ్ బొటానికల్ గార్డెన్, బెంగళూరు ప్యాలెస్ మరియు ఇస్కాన్ ఆలయంతో బెంగళూరు పర్యాటకులను అలరిస్తుంది.',
    categories: ['Nature', 'Historical Places', 'Temples'],
    rating: 4.6,
    reviewCount: 3100,
    bestTimeToVisit: 'Year-round (Best: Oct to Mar)',
    recommendedDays: 2,
    weatherInfo: {
      tempRange: '17°C – 28°C',
      seasonCondition: 'Mild plateau breeze year-round',
      humidity: '50%'
    },
    costs: {
      entryTicketAvg: 200,
      localTransportPerDay: 650,
      foodPerDay: 850,
      hotelPerNight: 3100
    },
    imageKey: 'south_kerala',
    imageCropPosition: 'object-left',
    thingsToDo: [
      'Morning walk at Lalbagh Botanical Garden & 1889 Glass House',
      'Audio tour of Tudor-style Bangalore Palace',
      'Visit ISKCON Hare Krishna Hill & Bull Temple (Basavanagudi)',
      'Savor crispy Masala Dosa & filter coffee at CTR or MTR'
    ],
    famousAttractions: [
      {
        id: 'blr-palace',
        name: 'Bangalore Palace Heritage Tour',
        category: 'Monument',
        openingHours: '10:00 AM – 05:30 PM',
        adultPrice: 240,
        childPrice: 120,
        duration: '2 hrs',
        description: '1878 royal palace inspired by Windsor Castle with fortified towers and wood carvings.',
        coordinates: { x: 48, y: 36 }
      },
      {
        id: 'blr-lalbagh',
        name: 'Lalbagh Botanical Garden & Glass House',
        category: 'Park',
        openingHours: '06:00 AM – 07:00 PM',
        adultPrice: 30,
        childPrice: 10,
        duration: '2 hrs',
        description: '240-acre garden commissioned by Hyder Ali housing over 1,800 species of tropical plants.',
        coordinates: { x: 52, y: 66 }
      }
    ],
    nearbyPlaces: [
      { name: 'Nandi Hills Sunrise Viewpoint', distanceKm: 61, type: 'Hill Station' },
      { name: 'Bannerghatta Biological Park', distanceKm: 22, type: 'Wildlife' }
    ],
    mapCoordinates: { lat: 12.9716, lng: 77.5946, indiaMapX: 43, indiaMapY: 77 },
    sampleRestaurants: [
      { name: 'MTR (Mavalli Tiffin Room, Lalbagh)', cuisine: 'Heritage Kannada Tiffin & Dosa', avgCostForTwo: 500, x: 53, y: 64 },
      { name: 'Vidyarthi Bhavan (Basavanagudi)', cuisine: 'Crispy Butter Masala Dosa', avgCostForTwo: 400, x: 44, y: 68 }
    ]
  },
  {
    id: 'chennai',
    name: 'Chennai',
    nameTe: 'చెన్నై',
    state: 'Tamil Nadu',
    stateTe: 'తమిళనాడు',
    tagline: 'Cultural Capital of Dravidian Temples, Marina Beach & Carnatic Arts',
    taglineTe: 'మెరీనా బీచ్, కపాలీశ్వర ఆలయం & మహాబలిపురం శిల్పకళ',
    description: 'Stretching along the Coromandel Coast, Chennai blends ancient Pallava and Chola temple traditions in Mylapore with the sweeping sands of Marina Beach, colonial Fort St. George, and nearby UNESCO rock temples at Mahabalipuram.',
    descriptionTe: 'బంగాళాఖాతం తీరాన మెరీనా బీచ్, మైలాపూర్ కపాలీశ్వర ఆలయం మరియు సమీపంలోని మహాబలిపురం శిల్పాలు చెన్నై ప్రధాన ఆకర్షణలు.',
    categories: ['Beaches', 'Temples', 'Historical Places'],
    rating: 4.7,
    reviewCount: 2890,
    bestTimeToVisit: 'November to February',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '22°C – 31°C',
      seasonCondition: 'Warm coastal sea breeze',
      humidity: '68%'
    },
    costs: {
      entryTicketAvg: 150,
      localTransportPerDay: 550,
      foodPerDay: 750,
      hotelPerNight: 2900
    },
    imageKey: 'goa',
    imageCropPosition: 'object-right',
    thingsToDo: [
      'Explore Kapaleeshwarar Temple & historic Mylapore tank lanes',
      'Sunrise promenade along Marina Beach & Elliot’s Beach (Besant Nagar)',
      'Visit Government Museum Bronze Gallery & Fort St. George',
      'Half-day drive along ECR to Mahabalipuram Shore Temple'
    ],
    famousAttractions: [
      {
        id: 'che-museum',
        name: 'Egmore Government Museum & Chola Bronze Gallery',
        category: 'Museum',
        openingHours: '09:30 AM – 05:00 PM (Closed Fri)',
        adultPrice: 50,
        childPrice: 20,
        duration: '2 hrs',
        description: 'Houses the world’s finest collection of ancient South Indian Chola bronze sculptures.',
        coordinates: { x: 46, y: 42 }
      },
      {
        id: 'che-mahabs',
        name: 'Mahabalipuram Shore Temple & Five Rathas',
        category: 'Monument',
        openingHours: '06:00 AM – 06:00 PM',
        adultPrice: 40,
        childPrice: 0,
        duration: '3 hrs',
        description: '7th-century UNESCO Pallava monolithic rock-cut temples overlooking the Bay of Bengal.',
        coordinates: { x: 64, y: 84 }
      }
    ],
    nearbyPlaces: [
      { name: 'Kanchipuram Silk & Ekambareswarar Temples', distanceKm: 72, type: 'Temples' },
      { name: 'Pondicherry White Town', distanceKm: 150, type: 'Beach' }
    ],
    mapCoordinates: { lat: 13.0827, lng: 80.2707, indiaMapX: 51, indiaMapY: 77 },
    sampleRestaurants: [
      { name: 'Murugan Idli Shop (T. Nagar)', cuisine: 'Ghee Podi Idli & Jigarthanda', avgCostForTwo: 450, x: 44, y: 58 },
      { name: 'Dakshin (Crowne Plaza)', cuisine: 'Regional South Indian Coastal', avgCostForTwo: 2200, x: 52, y: 66 }
    ]
  },
  {
    id: 'mysuru',
    name: 'Mysuru',
    nameTe: 'మైసూరు',
    state: 'Karnataka',
    stateTe: 'కర్ణాటక',
    tagline: 'Royal City of Illuminated Mysore Palace & Chamundi Hills',
    taglineTe: 'మైసూర్ ప్యాలెస్, చాముండి కొండలు & బృందావన్ గార్డెన్స్',
    description: 'The cultural capital of Karnataka is celebrated for the opulent Amba Vilas Mysore Palace illuminated by nearly 100,000 bulbs on evenings, Chamundeshwari Temple atop Chamundi Hills, silk weaving, and sandalwood craft.',
    descriptionTe: 'విద్యుత్ దీపాలతో వెలిగిపోయే మైసూర్ ప్యాలెస్, చాముండేశ్వరి ఆలయం మరియు బృందావన్ గార్డెన్స్ మైసూరుకు ప్రత్యేక ఆకర్షణ.',
    categories: ['Historical Places', 'Temples', 'Nature'],
    rating: 4.8,
    reviewCount: 3340,
    bestTimeToVisit: 'October to March',
    recommendedDays: 2,
    weatherInfo: {
      tempRange: '17°C – 29°C',
      seasonCondition: 'Pleasant & breezy heritage weather',
      humidity: '52%'
    },
    costs: {
      entryTicketAvg: 180,
      localTransportPerDay: 500,
      foodPerDay: 700,
      hotelPerNight: 2400
    },
    imageKey: 'hero',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Tour Mysore Palace interior & witness Sunday/holiday evening illumination',
      'Climb or drive to Chamundi Hills & monolithic Nandi statue',
      'Evening musical fountains at Brindavan Gardens (KRS Dam)',
      'Shop for GI-tagged Mysore Silk & Mysore Pak sweets at Devaraja Market'
    ],
    famousAttractions: [
      {
        id: 'mys-palace',
        name: 'Mysore Palace (Amba Vilas) Royal Tour',
        nameTe: 'మైసూర్ ప్యాలెస్',
        category: 'Monument',
        openingHours: '10:00 AM – 05:30 PM (Illumination: 7:00 PM)',
        adultPrice: 100,
        childPrice: 50,
        duration: '2.5 hrs',
        description: 'Indo-Saracenic royal seat of the Wadiyar dynasty featuring stained-glass Durbar halls.',
        coordinates: { x: 50, y: 50 }
      },
      {
        id: 'mys-brindavan',
        name: 'Brindavan Gardens & Musical Fountain',
        category: 'Park',
        openingHours: '08:00 AM – 08:30 PM',
        adultPrice: 50,
        childPrice: 10,
        duration: '2 hrs',
        description: 'Symmetrical terrace gardens below Krishna Raja Sagara dam with illuminated fountain show.',
        coordinates: { x: 25, y: 26 }
      }
    ],
    nearbyPlaces: [
      { name: 'Srirangapatna Island Fort & Ranganathaswamy Temple', distanceKm: 16, type: 'Historical' },
      { name: 'Somnathpur Chennakesava Hoysala Temple', distanceKm: 35, type: 'Temple' },
      { name: 'Coorg (Madikeri)', distanceKm: 118, type: 'Hill Station' }
    ],
    mapCoordinates: { lat: 12.2958, lng: 76.6394, indiaMapX: 40, indiaMapY: 79 },
    sampleRestaurants: [
      { name: 'Original Vinayaka Mylari', cuisine: 'Famous Soft Mylari Dosa', avgCostForTwo: 300, x: 48, y: 54 },
      { name: 'Guru Sweet Mart (Sayyaji Rao Rd)', cuisine: 'Authentic Ghee Mysore Pak', avgCostForTwo: 350, x: 52, y: 48 }
    ]
  },
  {
    id: 'ooty',
    name: 'Ooty',
    nameTe: 'ఊటీ (ఉదగమండలం)',
    state: 'Tamil Nadu',
    stateTe: 'తమిళనాడు',
    tagline: 'Queen of the Nilgiri Blue Mountains & Heritage Toy Train',
    taglineTe: 'నీలగిరి కొండల రాణి — బొటానికల్ గార్డెన్స్ & టాయ్ ట్రైన్',
    description: 'Perched at 2,240 meters in the Nilgiri Hills, Ooty charms travelers with its UNESCO Nilgiri Mountain Railway rack-and-pinion steam train, manicured botanical gardens, eucalyptus forests, and panoramic Doddabetta Peak.',
    descriptionTe: 'నీలగిరి కొండల్లో ఉన్న ఊటీ చల్లని వాతావరణం, టాయ్ ట్రైన్ ప్రయాణం, బొటానికల్ గార్డెన్స్ మరియు టీ తోటలకు ప్రసిద్ధి.',
    categories: ['Hill Stations', 'Nature'],
    rating: 4.8,
    reviewCount: 3790,
    bestTimeToVisit: 'October to June',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '10°C – 21°C',
      seasonCondition: 'Cool misty mountain air',
      humidity: '60%'
    },
    costs: {
      entryTicketAvg: 160,
      localTransportPerDay: 650,
      foodPerDay: 750,
      hotelPerNight: 2800
    },
    imageKey: 'kashmir',
    imageCropPosition: 'object-right',
    thingsToDo: [
      'Ride the UNESCO Nilgiri Mountain Toy Train from Ooty to Coonoor',
      'Stroll Government Botanical Gardens & Rose Garden',
      'View the Nilgiri range from Doddabetta Peak Telescope House',
      'Boating on Ooty Lake & homemade chocolate tasting'
    ],
    famousAttractions: [
      {
        id: 'oot-train',
        name: 'Nilgiri Mountain Toy Train Heritage Ride',
        category: 'Event',
        openingHours: '07:10 AM – 05:30 PM',
        adultPrice: 295,
        childPrice: 180,
        duration: '1.5 hrs',
        description: 'Scenic narrow-gauge railway journey across viaduct bridges, tunnels, and tea valleys.',
        coordinates: { x: 48, y: 58 }
      },
      {
        id: 'oot-botanical',
        name: 'Ooty Botanical Gardens & Fossil Tree',
        category: 'Park',
        openingHours: '07:00 AM – 06:30 PM',
        adultPrice: 50,
        childPrice: 30,
        duration: '2 hrs',
        description: '55-acre tiered garden established in 1848 featuring rare ferns and a 20-million-year-old fossil trunk.',
        coordinates: { x: 56, y: 42 }
      }
    ],
    nearbyPlaces: [
      { name: 'Coonoor Sim’s Park & Dolphin’s Nose', distanceKm: 19, type: 'Hill Station' },
      { name: 'Pykara Lake & Waterfalls', distanceKm: 21, type: 'Nature' },
      { name: 'Mudumalai Tiger Reserve', distanceKm: 42, type: 'Wildlife' }
    ],
    mapCoordinates: { lat: 11.4102, lng: 76.695, indiaMapX: 40, indiaMapY: 82 },
    sampleRestaurants: [
      { name: 'Earl’s Secret (King’s Cliff)', cuisine: 'Colonial Glasshouse Dining', avgCostForTwo: 1400, x: 58, y: 38 },
      { name: 'Adyar Ananda Bhavan (Charing Cross)', cuisine: 'Hot South Indian Veg & Varkey', avgCostForTwo: 500, x: 50, y: 52 }
    ]
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    nameTe: 'ఉదయ్‌పూర్',
    state: 'Rajasthan',
    stateTe: 'రాజస్థాన్',
    tagline: 'City of Lakes, Floating Marble Palaces & Mewar Heritage',
    taglineTe: 'సరస్సుల నగరం — లేక్ పిచోలా & సిటీ ప్యాలెస్',
    description: 'Set around shimmering artificial lakes in the Aravalli Hills, Udaipur enchants visitors with its towering City Palace complex, island palaces floating on Lake Pichola, and traditional Dharohar folk dance shows at Bagore Ki Haveli.',
    descriptionTe: 'ఆరావళి కొండల మధ్య సరస్సులతో మెరిసే ఉదయ్‌పూర్ సిటీ ప్యాలెస్, లేక్ పిచోలా బోట్ రైడ్ మరియు రాజపుత్ర సంస్కృతికి ప్రసిద్ధి.',
    categories: ['Historical Places', 'Nature'],
    rating: 4.9,
    reviewCount: 3850,
    bestTimeToVisit: 'October to March',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '14°C – 28°C',
      seasonCondition: 'Golden lakeside afternoons, cool evenings',
      humidity: '38%'
    },
    costs: {
      entryTicketAvg: 350,
      localTransportPerDay: 600,
      foodPerDay: 950,
      hotelPerNight: 3600
    },
    imageKey: 'hero',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Sunset boat cruise on Lake Pichola past Jag Mandir',
      'Explore Udaipur City Palace & Crystal Gallery',
      'Watch evening Rajasthani folk dance at Bagore Ki Haveli',
      'Panoramic sunset from Sajjangarh Monsoon Palace'
    ],
    famousAttractions: [
      {
        id: 'uda-citypalace',
        name: 'Udaipur City Palace Museum & Courtyards',
        category: 'Monument',
        openingHours: '09:30 AM – 05:30 PM',
        adultPrice: 330,
        childPrice: 150,
        duration: '2.5 hrs',
        description: 'Largest palace complex in Rajasthan rising along the eastern bank of Lake Pichola.',
        coordinates: { x: 54, y: 56 }
      },
      {
        id: 'uda-pichola',
        name: 'Lake Pichola Sunset Boat Cruise',
        category: 'Nature',
        openingHours: '10:00 AM – 06:00 PM',
        adultPrice: 500,
        childPrice: 250,
        duration: '1.5 hrs',
        description: 'Scenic boat ride gliding past Lake Palace and Jag Mandir island pavilion.',
        coordinates: { x: 46, y: 60 }
      }
    ],
    nearbyPlaces: [
      { name: 'Kumbhalgarh Fort (Great Wall of India)', distanceKm: 84, type: 'Historical' },
      { name: 'Nathdwara Shrinathji Temple', distanceKm: 45, type: 'Temple' }
    ],
    mapCoordinates: { lat: 24.5854, lng: 73.7125, indiaMapX: 31, indiaMapY: 43 },
    sampleRestaurants: [
      { name: 'Ambrai (Amet Haveli Lakeside)', cuisine: 'Mewari & North Indian with Lake View', avgCostForTwo: 1600, x: 45, y: 54 },
      { name: 'Natraj Dining Hall', cuisine: 'Unlimited Traditional Rajasthani Thali', avgCostForTwo: 650, x: 60, y: 48 }
    ]
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    nameTe: 'రిషికేశ్',
    state: 'Uttarakhand',
    stateTe: 'ఉత్తరాఖండ్',
    tagline: 'Yoga Capital of the World & Himalayan White-Water Rafting',
    taglineTe: 'యోగా రాజధాని — గంగా నది రాఫ్టింగ్ & ఆధ్యాత్మిక ప్రశాంతత',
    description: 'Where the turquoise Ganges emerges from the Himalayan foothills, Rishikesh unites spiritual ashram retreats and Triveni Ghat evening Aarti with thrilling Grade-III white-water river rafting and suspension bridges.',
    descriptionTe: 'హిమాలయ పాదాల వద్ద గంగా నది తీరాన ఉన్న రిషికేశ్ యోగా కేంద్రాలు, రివర్ రాఫ్టింగ్ మరియు త్రివేణి ఘాట్ హారతికి ప్రసిద్ధి.',
    categories: ['Adventure', 'Spiritual Places', 'Nature', 'Hill Stations'],
    rating: 4.8,
    reviewCount: 3120,
    bestTimeToVisit: 'September to May',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '14°C – 27°C',
      seasonCondition: 'Crisp Himalayan river breeze',
      humidity: '46%'
    },
    costs: {
      entryTicketAvg: 400,
      localTransportPerDay: 500,
      foodPerDay: 700,
      hotelPerNight: 2400
    },
    imageKey: 'kashmir',
    imageCropPosition: 'object-left',
    thingsToDo: [
      '16 km Ganges white-water rafting from Shivpuri to Laxman Jhula',
      'Attend sunset Ganga Aarti at Parmarth Niketan or Triveni Ghat',
      'Explore Chaurasi Kutia (Beatles Ashram) forest murals',
      'Sunrise trek to Neer Garh Waterfall & Kunjapuri Devi Temple'
    ],
    famousAttractions: [
      {
        id: 'ris-rafting',
        name: 'Shivpuri to Rishikesh Ganges Rafting (16 km)',
        category: 'Adventure',
        openingHours: '08:00 AM – 03:30 PM',
        adultPrice: 1000,
        childPrice: 800,
        duration: '3 hrs',
        description: 'Guided white-water rafting expedition with safety kayaks, life jackets, and cliff jump spot.',
        coordinates: { x: 68, y: 28 }
      },
      {
        id: 'ris-beatles',
        name: 'Chaurasi Kutia (Beatles Ashram) Rajaji Tiger Reserve',
        category: 'Monument',
        openingHours: '09:00 AM – 04:30 PM',
        adultPrice: 150,
        childPrice: 75,
        duration: '2 hrs',
        description: 'Forested meditation domes overlooking the Ganges with vibrant cathedral murals.',
        coordinates: { x: 54, y: 62 }
      }
    ],
    nearbyPlaces: [
      { name: 'Haridwar Har Ki Pauri', distanceKm: 24, type: 'Spiritual' },
      { name: 'Mussoorie Hill Station', distanceKm: 77, type: 'Hill Station' }
    ],
    mapCoordinates: { lat: 30.0869, lng: 78.2676, indiaMapX: 43, indiaMapY: 22 },
    sampleRestaurants: [
      { name: 'Chotiwala (Ram Jhula)', cuisine: 'North Indian Vegetarian Thali', avgCostForTwo: 550, x: 52, y: 54 },
      { name: 'The 60’s Cafe (Tapovan)', cuisine: 'Himalayan Cafe & Wood-Fired Bakery', avgCostForTwo: 750, x: 48, y: 38 }
    ]
  },
  {
    id: 'hampi',
    name: 'Hampi',
    nameTe: 'హంపి',
    state: 'Karnataka',
    stateTe: 'కర్ణాటక',
    tagline: 'UNESCO Boulder-Strewn Ruins of the Vijayanagara Empire',
    taglineTe: 'విజయనగర సామ్రాజ్య వైభవం — విరూపాక్ష ఆలయం & కಲ್ಲಿన రథం',
    description: 'Set in a surreal landscape of giant terracotta granite boulders along the Tungabhadra River, Hampi was the 14th-century imperial capital of Vijayanagara under Sri Krishnadevaraya. Marvel at the Stone Chariot, musical pillars of Vittala Temple, and Virupaksha Temple.',
    descriptionTe: 'తుంగభద్ర నది తీరాన శ్రీకృష్ణదేవరాయల విజయనగర సామ్రాజ్య రాజధాని హంపి. విఠల ఆలయ రాతి రథం, విరూపాక్ష ఆలయం ఇక్కడి అద్భుతాలు.',
    categories: ['Historical Places', 'Temples', 'Nature'],
    rating: 4.9,
    reviewCount: 2790,
    bestTimeToVisit: 'October to March',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '18°C – 31°C',
      seasonCondition: 'Dry sunny days, dramatic golden sunsets',
      humidity: '40%'
    },
    costs: {
      entryTicketAvg: 100,
      localTransportPerDay: 550,
      foodPerDay: 650,
      hotelPerNight: 2300
    },
    imageKey: 'rajasthan',
    imageCropPosition: 'object-right',
    thingsToDo: [
      'Marvel at the iconic Stone Chariot at Vijaya Vittala Temple',
      'Sunrise boulder climb up Matanga Hill overlooking ancient ruins',
      'Coracle round-boat ride across the Tungabhadra River',
      'Explore Virupaksha Temple, Lotus Mahal & Elephant Stables'
    ],
    famousAttractions: [
      {
        id: 'ham-vittala',
        name: 'Vijaya Vittala Temple & Stone Chariot',
        nameTe: 'విఠల ఆలయం & రాతి రథం',
        category: 'Monument',
        openingHours: '08:30 AM – 05:30 PM',
        adultPrice: 40,
        childPrice: 0,
        duration: '2.5 hrs',
        description: 'UNESCO jewel featuring the monolithic shrine shaped as a temple chariot (depicted on the ₹50 note).',
        coordinates: { x: 66, y: 36 }
      },
      {
        id: 'ham-lotus',
        name: 'Zenana Enclosure, Lotus Mahal & Elephant Stables',
        category: 'Monument',
        openingHours: '08:30 AM – 05:30 PM',
        adultPrice: 40,
        childPrice: 0,
        duration: '2 hrs',
        description: 'Indo-Islamic pavilion arches and 11-domed royal elephant chambers.',
        coordinates: { x: 48, y: 58 }
      }
    ],
    nearbyPlaces: [
      { name: 'Badami, Aihole & Pattadakal Cave Temples', distanceKm: 140, type: 'Historical' },
      { name: 'Daroji Sloth Bear Sanctuary', distanceKm: 15, type: 'Wildlife' }
    ],
    mapCoordinates: { lat: 15.335, lng: 76.46, indiaMapX: 39, indiaMapY: 69 },
    sampleRestaurants: [
      { name: 'Mango Tree Restaurant (Hampi Bazaar)', cuisine: 'South Indian Thali & Banana Leaf Meals', avgCostForTwo: 550, x: 42, y: 45 },
      { name: 'Clarks Inn Hampi Dining', cuisine: 'Karnataka & Multi-Cuisine', avgCostForTwo: 950, x: 54, y: 66 }
    ]
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    nameTe: 'డార్జిలింగ్',
    state: 'West Bengal',
    stateTe: 'పశ్చిమ బెంగాల్',
    tagline: 'Kanchenjunga Sunrise Views, Tea Gardens & Himalayan Railway',
    taglineTe: 'కాంచనజంగా సూర్యోదయం, తేయాకు తోటలు & హిమాలయ రైలు',
    description: 'Draped across emerald ridges facing the snow wall of Mt. Kanchenjunga (world’s third-highest peak), Darjeeling is synonymous with aromatic First Flush tea estates, Buddhist monasteries, and the UNESCO Toy Train looping through Batasia.',
    descriptionTe: 'కాంచనజంగా పర్వత శిఖరాల సూర్యోదయం, తేయాకు తోటలు మరియు బటాసియా లూప్ టాయ్ ట్రైన్‌తో డార్జిలింగ్ పర్యాటకులను మంత్రముగ్ధులను చేస్తుంది.',
    categories: ['Hill Stations', 'Nature'],
    rating: 4.8,
    reviewCount: 2540,
    bestTimeToVisit: 'March to May & October to December',
    recommendedDays: 3,
    weatherInfo: {
      tempRange: '8°C – 19°C',
      seasonCondition: 'Cool high-altitude hill climate',
      humidity: '62%'
    },
    costs: {
      entryTicketAvg: 200,
      localTransportPerDay: 700,
      foodPerDay: 700,
      hotelPerNight: 2700
    },
    imageKey: 'kashmir',
    imageCropPosition: 'object-center',
    thingsToDo: [
      '4:00 AM trip to Tiger Hill for golden sunrise over Mt. Kanchenjunga',
      'Joyride on the Darjeeling Himalayan Railway via Batasia Loop',
      'Tea tasting tour at Happy Valley Tea Estate',
      'Visit Padmaja Naidu Himalayan Zoological Park (Red Panda) & HMI'
    ],
    famousAttractions: [
      {
        id: 'dar-toytrain',
        name: 'Darjeeling to Ghum Toy Train Joyride',
        category: 'Event',
        openingHours: '08:00 AM – 04:00 PM',
        adultPrice: 1000,
        childPrice: 1000,
        duration: '2 hrs',
        description: 'UNESCO heritage train ride spiraling around Batasia Loop to India’s highest railway station at Ghum.',
        coordinates: { x: 46, y: 64 }
      },
      {
        id: 'dar-zoo',
        name: 'Himalayan Mountaineering Institute & Red Panda Zoo',
        category: 'Park',
        openingHours: '08:30 AM – 04:30 PM (Closed Thu)',
        adultPrice: 110,
        childPrice: 50,
        duration: '2.5 hrs',
        description: 'High-altitude conservation park for Himalayan Red Pandas and Snow Leopards plus Tenzing Norgay museum.',
        coordinates: { x: 42, y: 38 }
      }
    ],
    nearbyPlaces: [
      { name: 'Kalimpong Hill Town', distanceKm: 50, type: 'Hill Station' },
      { name: 'Gangtok (Sikkim)', distanceKm: 98, type: 'Hill Station' }
    ],
    mapCoordinates: { lat: 27.041, lng: 88.2663, indiaMapX: 72, indiaMapY: 34 },
    sampleRestaurants: [
      { name: 'Glenary’s Bakery & Cafe (Nehru Road)', cuisine: 'Colonial Bakery, Darjeeling Tea & Roast', avgCostForTwo: 900, x: 50, y: 48 },
      { name: 'Kunga Restaurant', cuisine: 'Tibetan Steamed Momos & Thukpa', avgCostForTwo: 500, x: 52, y: 50 }
    ]
  },
  {
    id: 'andaman',
    name: 'Andaman (Havelock & Port Blair)',
    nameTe: 'అండమాన్ దీవులు',
    state: 'Andaman & Nicobar',
    stateTe: 'అండమాన్ & నికోబార్',
    tagline: 'Turquoise Coral Reefs, Radhanagar Beach & Cellular Jail',
    taglineTe: 'రాధానగర్ బీచ్, పగడపు దిబ్బలు & సెల్యులార్ జైలు',
    description: 'An archipelago of emerald islands in the Bay of Bengal, Andaman offers Asia’s finest white-sand shoreline at Radhanagar Beach (Swaraj Dweep), crystal-clear scuba diving over coral gardens, and poignant freedom struggle history at Cellular Jail.',
    descriptionTe: 'బంగాళాఖాతంలోని అండమాన్ దీవులు రాధానగర్ బీచ్, స్కూబా డైవింగ్ మరియు చారిత్రక సెల్యులార్ జైలుకు ప్రసిద్ధి.',
    categories: ['Beaches', 'Adventure', 'Nature', 'Historical Places'],
    rating: 4.9,
    reviewCount: 2910,
    bestTimeToVisit: 'October to April',
    recommendedDays: 5,
    weatherInfo: {
      tempRange: '23°C – 30°C',
      seasonCondition: 'Clear tropical island skies & calm waters',
      humidity: '72%'
    },
    costs: {
      entryTicketAvg: 550,
      localTransportPerDay: 900,
      foodPerDay: 1100,
      hotelPerNight: 4400
    },
    imageKey: 'goa',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Evening Light & Sound Show at Cellular Jail in Port Blair',
      'Catamaran ferry to Havelock Island & sunset at Blue-Flag Radhanagar Beach',
      'Introductory scuba diving or glass-bottom coral boat at Elephant Beach',
      'Visit Natural Rock Bridge at Neil Island (Shaheed Dweep)'
    ],
    famousAttractions: [
      {
        id: 'and-cellular',
        name: 'Cellular Jail Museum & Sound Show',
        category: 'Monument',
        openingHours: '09:00 AM – 05:00 PM (Show: 5:50 PM)',
        adultPrice: 300,
        childPrice: 150,
        duration: '2.5 hrs',
        description: 'Historic colonial prison memorializing Indian freedom fighters overlooking the sea.',
        coordinates: { x: 40, y: 72 }
      },
      {
        id: 'and-scuba',
        name: 'Havelock Coral Reef Snorkeling & Glass Boat',
        category: 'Adventure',
        openingHours: '07:00 AM – 03:00 PM',
        adultPrice: 1500,
        childPrice: 1000,
        duration: '3 hrs',
        description: 'Guided reef exploration over vibrant staghorn corals and clownfish habitats at Elephant Beach.',
        coordinates: { x: 68, y: 38 }
      }
    ],
    nearbyPlaces: [
      { name: 'Neil Island (Shaheed Dweep)', distanceKm: 37, type: 'Beach' },
      { name: 'Ross Island (Netaji Subhash Chandra Bose Island)', distanceKm: 3, type: 'Historical' }
    ],
    mapCoordinates: { lat: 11.6234, lng: 92.7265, indiaMapX: 85, indiaMapY: 80 },
    sampleRestaurants: [
      { name: 'Something Different (Havelock Beachside)', cuisine: 'Island Seafood & Coastal Grill', avgCostForTwo: 1400, x: 65, y: 42 },
      { name: 'Annapurna Cafeteria (Port Blair)', cuisine: 'South & North Indian Vegetarian', avgCostForTwo: 600, x: 42, y: 70 }
    ]
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    nameTe: 'అమృత్‌సర్',
    state: 'Punjab',
    stateTe: 'పంజాబ్',
    tagline: 'Sacred Golden Temple, Langar Hospitality & Wagah Border',
    taglineTe: 'స్వర్ణ దేవాలయం (గోల్డెన్ టెంపుల్), జలియన్ వాలా బాగ్ & వాఘా బోర్డర్',
    description: 'Amritsar radiates spiritual warmth and patriotic history. Experience the serene golden reflection of Harmandir Sahib (Golden Temple) across the Amrit Sarovar, partake in the world’s largest community kitchen (Langar), pay homage at Jallianwala Bagh, and witness the spirited Retreat Ceremony at Attari-Wagah Border.',
    descriptionTe: 'పంజాబ్‌లోని అమృత్‌సర్ స్వర్ణ దేవాలయం, జలియన్ వాలా బాగ్ మరియు వాఘా సరిహద్దు పరేడ్‌కు ప్రసిద్ధి.',
    categories: ['Spiritual Places', 'Historical Places', 'Temples'],
    rating: 4.9,
    reviewCount: 4210,
    bestTimeToVisit: 'October to March',
    recommendedDays: 2,
    weatherInfo: {
      tempRange: '10°C – 25°C',
      seasonCondition: 'Sunny winter days, crisp evenings',
      humidity: '44%'
    },
    costs: {
      entryTicketAvg: 100,
      localTransportPerDay: 500,
      foodPerDay: 650,
      hotelPerNight: 2400
    },
    imageKey: 'hero',
    imageCropPosition: 'object-center',
    thingsToDo: [
      'Dawn & nighttime darshan at Sri Harmandir Sahib (Golden Temple)',
      'Visit Jallianwala Bagh Memorial & Partition Museum at Town Hall',
      'Attend the evening Beating Retreat Ceremony at Attari-Wagah Border',
      'Savor Amritsari Kulcha & tall glasses of sweet Lassi in Hall Bazaar'
    ],
    famousAttractions: [
      {
        id: 'amr-partition',
        name: 'The Partition Museum (Town Hall)',
        category: 'Museum',
        openingHours: '10:00 AM – 06:00 PM (Closed Mon)',
        adultPrice: 50,
        childPrice: 20,
        duration: '2 hrs',
        description: 'Moving people’s museum chronicling oral histories, art, and archives of 1947.',
        coordinates: { x: 52, y: 48 }
      },
      {
        id: 'amr-wagah',
        name: 'Attari-Wagah Border Ceremony Excursion',
        category: 'Event',
        openingHours: '03:30 PM – 06:00 PM',
        adultPrice: 200,
        childPrice: 100,
        duration: '3 hrs',
        description: 'Reserved shuttle & visitor gallery guidance for the daily flag-lowering ceremony.',
        coordinates: { x: 18, y: 52 }
      }
    ],
    nearbyPlaces: [
      { name: 'Gobindgarh Fort', distanceKm: 3, type: 'Historical' },
      { name: 'Dharamshala & McLeodGanj', distanceKm: 200, type: 'Hill Station' }
    ],
    mapCoordinates: { lat: 31.634, lng: 74.8723, indiaMapX: 35, indiaMapY: 19 },
    sampleRestaurants: [
      { name: 'Kesar Da Dhaba (Passian)', cuisine: 'Slow-Cooked Dal Makhani &lachha Paratha', avgCostForTwo: 550, x: 56, y: 55 },
      { name: 'Kulcha Land (Ranjit Avenue)', cuisine: 'Crispy Amritsari Stuffed Kulcha & Chole', avgCostForTwo: 450, x: 46, y: 36 }
    ]
  }
];
