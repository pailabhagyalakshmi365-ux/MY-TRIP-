import {
  Hotel,
  TransportOption,
  LocalGuide,
  Destination,
  GeneratedItinerary,
  DayPlanItem,
  BudgetTier,
  TravelType,
  TransportMode,
} from '../types/travel';
import { calculateDaysBetween } from '../utils/format';

export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'htl-hyd-1',
    destinationId: 'hyderabad',
    city: 'Hyderabad',
    name: 'Taj Falaknuma Heritage Palace View',
    location: 'Engine Bowli, Old City, Hyderabad',
    rating: 4.9,
    reviewCount: 920,
    hotelType: 'Heritage Palace',
    roomType: 'Royal Nizam Suite',
    pricePerNight: 8500,
    amenities: ['Free WiFi', 'Swimming Pool', 'Heritage Walk', 'Restaurant', 'Spa'],
    breakfastIncluded: true,
    distanceFromCenterKm: 3.2,
    nearestAttraction: 'Charminar Monument (3.2 km)',
    imageKey: 'rajasthan',
    coordinates: { x: 48, y: 78 }
  },
  {
    id: 'htl-hyd-2',
    destinationId: 'hyderabad',
    city: 'Hyderabad',
    name: 'Deccan Serai Comfort Grand',
    location: 'Banjara Hills Road No. 12, Hyderabad',
    rating: 4.6,
    reviewCount: 1450,
    hotelType: 'Boutique Stay',
    roomType: 'Executive Twin Room',
    pricePerNight: 2800,
    amenities: ['Free WiFi', 'Restaurant', 'Airport Transfer', 'Parking'],
    breakfastIncluded: true,
    distanceFromCenterKm: 2.1,
    nearestAttraction: 'Golconda Fort (4.5 km)',
    imageKey: 'hero',
    coordinates: { x: 35, y: 46 }
  },
  {
    id: 'htl-vizag-1',
    destinationId: 'visakhapatnam',
    city: 'Visakhapatnam',
    name: 'Novotel Varun Beach Bayfront',
    location: 'Beach Road, RK Beach, Visakhapatnam',
    rating: 4.8,
    reviewCount: 1320,
    hotelType: 'Luxury Hotel',
    roomType: 'Ocean Facing Deluxe Room',
    pricePerNight: 4800,
    amenities: ['Free WiFi', 'Sea View', 'Swimming Pool', 'Restaurant', 'Spa'],
    breakfastIncluded: true,
    distanceFromCenterKm: 0.4,
    nearestAttraction: 'INS Kurusura Submarine Museum (0.4 km)',
    imageKey: 'goa',
    coordinates: { x: 60, y: 58 }
  },
  {
    id: 'htl-vizag-2',
    destinationId: 'visakhapatnam',
    city: 'Visakhapatnam',
    name: 'Haritha Rushikonda Beach Resort',
    location: 'Rushikonda Coast, Visakhapatnam',
    rating: 4.5,
    reviewCount: 890,
    hotelType: 'Budget Resort',
    roomType: 'Coastal Cottage AC',
    pricePerNight: 2200,
    amenities: ['Free WiFi', 'Sea View', 'Parking', 'Restaurant'],
    breakfastIncluded: false,
    distanceFromCenterKm: 4.0,
    nearestAttraction: 'Kailasagiri Ropeway (3.1 km)',
    imageKey: 'goa',
    coordinates: { x: 74, y: 28 }
  },
  {
    id: 'htl-tpt-1',
    destinationId: 'tirupati',
    city: 'Tirupati',
    name: 'Marasa Sarovar Premiere Seshachalam',
    location: 'Karakambadi Road, Tirupati',
    rating: 4.7,
    reviewCount: 1640,
    hotelType: 'Luxury Hotel',
    roomType: 'Garuda Deluxe Room',
    pricePerNight: 3600,
    amenities: ['Free WiFi', 'Temple Shuttle', 'Pure Veg Restaurant', 'Swimming Pool'],
    breakfastIncluded: true,
    distanceFromCenterKm: 1.8,
    nearestAttraction: 'Alipiri Footpath Base (2.4 km)',
    imageKey: 'south_kerala',
    coordinates: { x: 54, y: 60 }
  },
  {
    id: 'htl-tpt-2',
    destinationId: 'tirupati',
    city: 'Tirupati',
    name: 'Srinivasa Residency Pilgrim Stay',
    location: 'Near Alipiri Toll Gate, Tirupati',
    rating: 4.5,
    reviewCount: 1120,
    hotelType: 'Homestay',
    roomType: 'Family 4-Bed AC Suite',
    pricePerNight: 1800,
    amenities: ['Free WiFi', 'Pure Veg Restaurant', 'Parking', 'Temple Shuttle'],
    breakfastIncluded: true,
    distanceFromCenterKm: 0.9,
    nearestAttraction: 'Sri Venkateswara Temple Base (0.9 km)',
    imageKey: 'south_kerala',
    coordinates: { x: 46, y: 48 }
  },
  {
    id: 'htl-sri-1',
    destinationId: 'srisailam',
    city: 'Srisailam',
    name: 'APTDC Haritha Mallikarjuna Sadan',
    location: 'Temple Main Road, Srisailam',
    rating: 4.5,
    reviewCount: 780,
    hotelType: 'Budget Resort',
    roomType: 'Nallamala AC Deluxe',
    pricePerNight: 2100,
    amenities: ['Pure Veg Restaurant', 'Parking', 'Temple Shuttle', 'Free WiFi'],
    breakfastIncluded: true,
    distanceFromCenterKm: 0.6,
    nearestAttraction: 'Sri Mallikarjuna Swamy Temple (0.6 km)',
    imageKey: 'south_kerala',
    coordinates: { x: 50, y: 54 }
  },
  {
    id: 'htl-goa-1',
    destinationId: 'goa',
    city: 'Goa',
    name: 'Casa De Fontainhas Portuguese Villa',
    location: 'Panjim & Candolim Coast, Goa',
    rating: 4.8,
    reviewCount: 1510,
    hotelType: 'Boutique Stay',
    roomType: 'Balcao Sea-Breeze Suite',
    pricePerNight: 4200,
    amenities: ['Free WiFi', 'Swimming Pool', 'Sea View', 'Restaurant'],
    breakfastIncluded: true,
    distanceFromCenterKm: 1.5,
    nearestAttraction: 'Fort Aguada (2.8 km)',
    imageKey: 'goa',
    coordinates: { x: 42, y: 44 }
  },
  {
    id: 'htl-jai-1',
    destinationId: 'jaipur',
    city: 'Jaipur',
    name: 'Samode Haveli Heritage Courtyard',
    location: 'Gangapole, Pink City, Jaipur',
    rating: 4.9,
    reviewCount: 1890,
    hotelType: 'Heritage Palace',
    roomType: 'Sheesh Mahal Heritage Room',
    pricePerNight: 5600,
    amenities: ['Free WiFi', 'Swimming Pool', 'Heritage Walk', 'Spa', 'Restaurant'],
    breakfastIncluded: true,
    distanceFromCenterKm: 1.4,
    nearestAttraction: 'Hawa Mahal (1.4 km)',
    imageKey: 'rajasthan',
    coordinates: { x: 55, y: 48 }
  },
  {
    id: 'htl-ker-1',
    destinationId: 'kerala',
    city: 'Kerala (Munnar & Alleppey)',
    name: 'SpiceTree Tea Estate & Backwater Retreat',
    location: 'Chithirapuram Hills, Munnar & Alleppey Dock',
    rating: 4.9,
    reviewCount: 1410,
    hotelType: 'Boutique Stay',
    roomType: 'Cardamom Valley Pool Villa',
    pricePerNight: 4500,
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant'],
    breakfastIncluded: true,
    distanceFromCenterKm: 2.0,
    nearestAttraction: 'Munnar Tea Museum (2.5 km)',
    imageKey: 'south_kerala',
    coordinates: { x: 60, y: 42 }
  },
  {
    id: 'htl-kas-1',
    destinationId: 'kashmir',
    city: 'Kashmir (Srinagar & Gulmarg)',
    name: 'Mascot Royal Cedar Houseboat & Resort',
    location: 'Nigeen & Dal Lake Ghat 9, Srinagar',
    rating: 4.8,
    reviewCount: 1260,
    hotelType: 'Heritage Palace',
    roomType: 'Walnut Carved Lake Suite',
    pricePerNight: 4600,
    amenities: ['Free WiFi', 'Restaurant', 'Heritage Walk'],
    breakfastIncluded: true,
    distanceFromCenterKm: 0.2,
    nearestAttraction: 'Dal Lake Shikara Point (0.2 km)',
    imageKey: 'kashmir',
    coordinates: { x: 53, y: 46 }
  },
  {
    id: 'htl-agr-1',
    destinationId: 'agra',
    city: 'Agra',
    name: 'Tajview Yamuna Courtyard',
    location: 'Fatehabad Road, Taj East Gate, Agra',
    rating: 4.7,
    reviewCount: 1380,
    hotelType: 'Luxury Hotel',
    roomType: 'Taj Facing Superior Room',
    pricePerNight: 3400,
    amenities: ['Free WiFi', 'Swimming Pool', 'Restaurant', 'Spa'],
    breakfastIncluded: true,
    distanceFromCenterKm: 1.1,
    nearestAttraction: 'Taj Mahal East Gate (1.1 km)',
    imageKey: 'hero',
    coordinates: { x: 58, y: 52 }
  },
  {
    id: 'htl-vns-1',
    destinationId: 'varanasi',
    city: 'Varanasi',
    name: 'BrijRama Ghat Heritage Haveli',
    location: 'Darbhanga Ghat, Dashashwamedh, Varanasi',
    rating: 4.9,
    reviewCount: 970,
    hotelType: 'Heritage Palace',
    roomType: 'Ganges Riverfront Chamber',
    pricePerNight: 5200,
    amenities: ['Free WiFi', 'Pure Veg Restaurant', 'Heritage Walk'],
    breakfastIncluded: true,
    distanceFromCenterKm: 0.3,
    nearestAttraction: 'Dashashwamedh Ghat Aarti (0.3 km)',
    imageKey: 'hero',
    coordinates: { x: 62, y: 52 }
  },
  {
    id: 'htl-mys-1',
    destinationId: 'mysuru',
    city: 'Mysuru',
    name: 'Lalitha Mahal Royal Heritage Stay',
    location: 'Siddhartha Nagar, Chamundi Foothills, Mysuru',
    rating: 4.7,
    reviewCount: 1090,
    hotelType: 'Heritage Palace',
    roomType: 'Wadiyar Viceroy Room',
    pricePerNight: 3200,
    amenities: ['Free WiFi', 'Swimming Pool', 'Restaurant', 'Parking'],
    breakfastIncluded: true,
    distanceFromCenterKm: 3.5,
    nearestAttraction: 'Mysore Palace (3.5 km)',
    imageKey: 'hero',
    coordinates: { x: 62, y: 56 }
  },
  {
    id: 'htl-oot-1',
    destinationId: 'ooty',
    city: 'Ooty',
    name: 'Savoy Nilgiri Colonial Cottages',
    location: 'Sylks Road, Near Botanical Gardens, Ooty',
    rating: 4.8,
    reviewCount: 1210,
    hotelType: 'Boutique Stay',
    roomType: 'Fireplace Garden Cottage',
    pricePerNight: 3500,
    amenities: ['Free WiFi', 'Restaurant', 'Parking', 'Spa'],
    breakfastIncluded: true,
    distanceFromCenterKm: 1.2,
    nearestAttraction: 'Ooty Botanical Gardens (1.2 km)',
    imageKey: 'kashmir',
    coordinates: { x: 54, y: 44 }
  },
  {
    id: 'htl-del-1',
    destinationId: 'delhi',
    city: 'Delhi',
    name: 'The Imperial Connaught Heritage',
    location: 'Janpath, Connaught Place, New Delhi',
    rating: 4.8,
    reviewCount: 1750,
    hotelType: 'Luxury Hotel',
    roomType: 'Lutyens Deco Room',
    pricePerNight: 4200,
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant'],
    breakfastIncluded: true,
    distanceFromCenterKm: 1.0,
    nearestAttraction: 'India Gate (1.8 km)',
    imageKey: 'rajasthan',
    coordinates: { x: 50, y: 48 }
  },
  {
    id: 'htl-mum-1',
    destinationId: 'mumbai',
    city: 'Mumbai',
    name: 'Sea Green Marine Drive Art Deco Hotel',
    location: 'Marine Drive Promenade, Churchgate, Mumbai',
    rating: 4.6,
    reviewCount: 1320,
    hotelType: 'Boutique Stay',
    roomType: 'Arabian Sea Facing Room',
    pricePerNight: 4800,
    amenities: ['Free WiFi', 'Sea View', 'Restaurant'],
    breakfastIncluded: true,
    distanceFromCenterKm: 1.5,
    nearestAttraction: 'Gateway of India (1.9 km)',
    imageKey: 'hero',
    coordinates: { x: 46, y: 74 }
  },
  {
    id: 'htl-blr-1',
    destinationId: 'bengaluru',
    city: 'Bengaluru',
    name: 'The Green Path Eco Homestay & Suites',
    location: 'Near Cubbon Park & MG Road, Bengaluru',
    rating: 4.6,
    reviewCount: 940,
    hotelType: 'Homestay',
    roomType: 'Garden Verandah Room',
    pricePerNight: 2700,
    amenities: ['Free WiFi', 'Pure Veg Restaurant', 'Parking'],
    breakfastIncluded: true,
    distanceFromCenterKm: 1.4,
    nearestAttraction: 'Lalbagh Botanical Garden (2.8 km)',
    imageKey: 'south_kerala',
    coordinates: { x: 50, y: 52 }
  },
  {
    id: 'htl-che-1',
    destinationId: 'chennai',
    city: 'Chennai',
    name: 'Taj Fisherman’s Cove Coastal Resort',
    location: 'Covelong Beach, ECR, Chennai',
    rating: 4.8,
    reviewCount: 1180,
    hotelType: 'Luxury Hotel',
    roomType: 'Bay of Bengal Cottage',
    pricePerNight: 4100,
    amenities: ['Free WiFi', 'Sea View', 'Swimming Pool', 'Spa', 'Restaurant'],
    breakfastIncluded: true,
    distanceFromCenterKm: 3.5,
    nearestAttraction: 'Kapaleeshwarar Temple & ECR Coast',
    imageKey: 'goa',
    coordinates: { x: 58, y: 70 }
  }
];

export const INITIAL_TRANSPORT: TransportOption[] = [
  {
    id: 'tr-fl-1',
    mode: 'Flight',
    operatorName: 'IndiGo Airlines',
    serviceNumber: '6E-5214 Non-Stop',
    fromCity: 'Hyderabad',
    toCity: 'Delhi',
    departureTime: '07:15 AM',
    arrivalTime: '09:30 AM',
    duration: '2h 15m',
    approxFare: 4450,
    classType: 'Economy Saver'
  },
  {
    id: 'tr-fl-2',
    mode: 'Flight',
    operatorName: 'Air India Express',
    serviceNumber: 'IX-1942 Direct',
    fromCity: 'Hyderabad',
    toCity: 'Goa',
    departureTime: '10:40 AM',
    arrivalTime: '12:05 PM',
    duration: '1h 25m',
    approxFare: 3250,
    classType: 'Economy Flex'
  },
  {
    id: 'tr-fl-3',
    mode: 'Flight',
    operatorName: 'IndiGo Airlines',
    serviceNumber: '6E-6182 Direct',
    fromCity: 'Bengaluru',
    toCity: 'Jaipur',
    departureTime: '08:20 AM',
    arrivalTime: '11:00 AM',
    duration: '2h 40m',
    approxFare: 4890,
    classType: 'Economy Saver'
  },
  {
    id: 'tr-fl-4',
    mode: 'Flight',
    operatorName: 'Air India',
    serviceNumber: 'AI-441 Direct',
    fromCity: 'Delhi',
    toCity: 'Kashmir (Srinagar & Gulmarg)',
    departureTime: '09:10 AM',
    arrivalTime: '10:40 AM',
    duration: '1h 30m',
    approxFare: 4600,
    classType: 'Economy Value'
  },
  {
    id: 'tr-tr-1',
    mode: 'Train',
    operatorName: 'Vande Bharat Express',
    serviceNumber: '20833 / Secunderabad – Visakhapatnam',
    fromCity: 'Hyderabad',
    toCity: 'Visakhapatnam',
    departureTime: '03:00 PM',
    arrivalTime: '11:30 PM',
    duration: '8h 30m',
    approxFare: 1720,
    classType: 'AC Chair Car (CC)'
  },
  {
    id: 'tr-tr-2',
    mode: 'Train',
    operatorName: 'Vande Bharat Express',
    serviceNumber: '20701 / Secunderabad – Tirupati',
    fromCity: 'Hyderabad',
    toCity: 'Tirupati',
    departureTime: '06:10 AM',
    arrivalTime: '02:30 PM',
    duration: '8h 20m',
    approxFare: 1680,
    classType: 'AC Chair Car (CC)'
  },
  {
    id: 'tr-tr-3',
    mode: 'Train',
    operatorName: 'Gatimaan Express',
    serviceNumber: '12050 / Hazrat Nizamuddin – Virangana Lakshmibai',
    fromCity: 'Delhi',
    toCity: 'Agra',
    departureTime: '08:10 AM',
    arrivalTime: '09:50 AM',
    duration: '1h 40m',
    approxFare: 755,
    classType: 'AC Chair Car (CC)'
  },
  {
    id: 'tr-tr-4',
    mode: 'Train',
    operatorName: 'Shatabdi Express',
    serviceNumber: '12007 / MGR Chennai – Mysuru',
    fromCity: 'Chennai',
    toCity: 'Mysuru',
    departureTime: '06:00 AM',
    arrivalTime: '01:00 PM',
    duration: '7h 00m',
    approxFare: 1150,
    classType: 'AC Chair Car (CC)'
  },
  {
    id: 'tr-bs-1',
    mode: 'Bus',
    operatorName: 'TSRTC / APSRTC Garuda Plus',
    serviceNumber: 'Multi-Axle Volvo AC Seater',
    fromCity: 'Hyderabad',
    toCity: 'Srisailam',
    departureTime: '06:30 AM',
    arrivalTime: '11:45 AM',
    duration: '5h 15m',
    approxFare: 620,
    classType: 'AC Semi-Sleeper'
  },
  {
    id: 'tr-bs-2',
    mode: 'Bus',
    operatorName: 'KSRTC Airavat Club Class',
    serviceNumber: 'Scania Multi-Axle AC',
    fromCity: 'Bengaluru',
    toCity: 'Ooty',
    departureTime: '07:00 AM',
    arrivalTime: '02:15 PM',
    duration: '7h 15m',
    approxFare: 890,
    classType: 'AC Seater'
  },
  {
    id: 'tr-cr-1',
    mode: 'Car',
    operatorName: 'Savaari Intercity Chauffeur Cab',
    serviceNumber: 'Toyota Innova Crysta (6+1 Seater)',
    fromCity: 'Hyderabad',
    toCity: 'Srisailam',
    departureTime: 'Flexible Pickup',
    arrivalTime: 'Door-to-Door',
    duration: '4h 45m',
    approxFare: 4200,
    classType: 'Private SUV (Fuel & Driver Included)'
  },
  {
    id: 'tr-tx-1',
    mode: 'Taxi',
    operatorName: 'Bharat Darshan Local Sightseeing Cab',
    serviceNumber: '8 Hours / 80 Km Full-Day City Package',
    fromCity: 'Any City Hotel',
    toCity: 'Local Monuments & Markets',
    departureTime: '09:00 AM',
    arrivalTime: '05:00 PM',
    duration: '8h 00m',
    approxFare: 2200,
    classType: 'AC Sedan (Dzire / Etios)'
  }
];

export const INITIAL_GUIDES: LocalGuide[] = [
  {
    id: 'gd-ravi-hyd',
    name: 'Ravi Kumar',
    city: 'Hyderabad',
    destinationId: 'hyderabad',
    languages: ['Telugu', 'Hindi', 'English'],
    experienceYears: 5,
    rating: 4.7,
    reviewsCount: 214,
    hourlyPrice: 800,
    dailyPrice: 4500,
    specialization: ['Qutb Shahi History', 'Golconda Fort Acoustics', 'Old City Culinary Trails'],
    availability: 'Available Today',
    bio: 'Certified Telangana Tourism heritage storyteller specializing in Charminar, Golconda Fort, and Old City pearl bazaars.',
    verifiedBadge: 'Govt. Licensed Regional Guide (Demo)'
  },
  {
    id: 'gd-lakshmi-tpt',
    name: 'Srinivasulu Naidu',
    city: 'Tirupati',
    destinationId: 'tirupati',
    languages: ['Telugu', 'Tamil', 'English', 'Kannada'],
    experienceYears: 9,
    rating: 4.9,
    reviewsCount: 380,
    hourlyPrice: 650,
    dailyPrice: 3600,
    specialization: ['Tirumala Darshan Assistance', 'Agama Shastra History', 'Sri Kalahasti & Kanipakam'],
    availability: 'Available Today',
    bio: 'Experienced Tirumala-Tirupati temple historian guiding families smoothly through Seeghra Darshan, Silathoranam, and surrounding shrines.',
    verifiedBadge: 'Temple Heritage Specialist (Demo)'
  },
  {
    id: 'gd-padma-vizag',
    name: 'Padmavathi Rao',
    city: 'Visakhapatnam',
    destinationId: 'visakhapatnam',
    languages: ['Telugu', 'English', 'Hindi'],
    experienceYears: 6,
    rating: 4.8,
    reviewsCount: 165,
    hourlyPrice: 700,
    dailyPrice: 3800,
    specialization: ['Araku Tribal Culture', 'Borra Caves Geology', 'Naval Maritime History'],
    availability: 'Available Today',
    bio: 'Eastern Ghats eco-tourism and coastal heritage guide covering RK Beach, Simhachalam Temple, and Araku coffee trails.',
    verifiedBadge: 'AP Tourism Certified (Demo)'
  },
  {
    id: 'gd-mallik-sri',
    name: 'Mallikarjuna Reddy',
    city: 'Srisailam',
    destinationId: 'srisailam',
    languages: ['Telugu', 'Kannada', 'Hindi', 'English'],
    experienceYears: 7,
    rating: 4.8,
    reviewsCount: 142,
    hourlyPrice: 600,
    dailyPrice: 3200,
    specialization: ['Jyotirlinga Temple Lore', 'Akkamahadevi Caves Boat Trail', 'Nallamala Forest Ecology'],
    availability: 'Available Today',
    bio: 'Local Nallamala & Srisailam temple expert assisting pilgrims with darshan timings, ropeway schedules, and tiger reserve safaris.',
    verifiedBadge: 'Regional Pilgrim Guide (Demo)'
  },
  {
    id: 'gd-vikram-jai',
    name: 'Vikramaditya Singh Rathore',
    city: 'Jaipur',
    destinationId: 'jaipur',
    languages: ['Hindi', 'English', 'French'],
    experienceYears: 11,
    rating: 4.9,
    reviewsCount: 412,
    hourlyPrice: 950,
    dailyPrice: 5200,
    specialization: ['Rajput Fort Architecture', 'Jantar Mantar Astronomy', 'Jaipur Gem & Block Printing'],
    availability: 'Available Today',
    bio: 'Ministry of Tourism Gold-Category guide in Rajasthan with deep expertise in Amber Fort, City Palace, and Mewar-Dhundhar history.',
    verifiedBadge: 'ASI Approved Guide (Demo)'
  },
  {
    id: 'gd-faizan-agr',
    name: 'Faizan Siddiqui',
    city: 'Agra',
    destinationId: 'agra',
    languages: ['Hindi', 'English', 'Urdu'],
    experienceYears: 8,
    rating: 4.8,
    reviewsCount: 319,
    hourlyPrice: 850,
    dailyPrice: 4600,
    specialization: ['Taj Mahal Pietra Dura Craft', 'Mughal Chronicles', 'Sunrise Photography Angles'],
    availability: 'Available Today',
    bio: 'Fourth-generation Agra chronicler guiding guests through Taj Mahal sunrise visits, Agra Fort, and marble inlay workshops.',
    verifiedBadge: 'ASI Licensed Monument Guide (Demo)'
  },
  {
    id: 'gd-anand-vns',
    name: 'Pandit Anand Mishra',
    city: 'Varanasi',
    destinationId: 'varanasi',
    languages: ['Hindi', 'English', 'Sanskrit', 'Telugu'],
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 490,
    hourlyPrice: 750,
    dailyPrice: 4000,
    specialization: ['Kashi Ghats & Ganga Aarti', 'Sarnath Buddhist Heritage', 'Banarasi Silk Weavers'],
    availability: 'Available Today',
    bio: 'Banaras Hindu University alumnus offering soulful boat-side narratives of Kashi’s 84 ghats, Vishwanath Gali, and Sarnath.',
    verifiedBadge: 'Heritage Scholar Guide (Demo)'
  },
  {
    id: 'gd-mathew-ker',
    name: 'Mathew Varghese',
    city: 'Kerala (Munnar & Alleppey)',
    destinationId: 'kerala',
    languages: ['Malayalam', 'English', 'Tamil', 'Hindi'],
    experienceYears: 8,
    rating: 4.9,
    reviewsCount: 275,
    hourlyPrice: 850,
    dailyPrice: 4500,
    specialization: ['Backwater Ecology', 'Munnar Tea & Spice Botany', 'Fort Kochi Colonial History'],
    availability: 'Available Tomorrow',
    bio: 'Naturalist and cultural interpreter for Kerala tea estates, Periyar wildlife trails, and Alleppey village canoe tours.',
    verifiedBadge: 'Kerala Tourism Certified (Demo)'
  }
];

export function generateDayByDayItinerary(params: {
  startingCity: string;
  destination: Destination;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  travelType: TravelType;
  budget: BudgetTier;
  transportMode: TransportMode;
  hotelPreference: string;
  foodPreference: string;
  interests: string[];
}): GeneratedItinerary {
  const daysCount = calculateDaysBetween(params.startDate, params.endDate);
  const totalTravelers = Math.max(1, params.adults + params.children * 0.6);

  const budgetMultiplier: Record<BudgetTier, number> = {
    Budget: 0.7,
    Standard: 1.0,
    Premium: 1.6,
    Luxury: 2.6,
  };
  const mult = budgetMultiplier[params.budget] || 1.0;

  const attractions = params.destination.famousAttractions;
  const things = params.destination.thingsToDo;
  const restaurants = params.destination.sampleRestaurants;

  const days: DayPlanItem[] = [];
  let runningTotal = 0;

  const startObj = params.startDate ? new Date(params.startDate) : new Date();

  for (let i = 0; i < daysCount; i++) {
    const dayDate = new Date(startObj);
    dayDate.setDate(startObj.getDate() + i);
    const dateStr = dayDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const attr1 = attractions[i % attractions.length];
    const attr2 = attractions[(i + 1) % attractions.length];
    const thing = things[i % things.length];
    const rest = restaurants[i % restaurants.length];

    const isFirstDay = i === 0;
    const isLastDay = i === daysCount - 1 && daysCount > 1;

    const morningCost = Math.round(
      ((attr1?.adultPrice || 150) * params.adults + (attr1?.childPrice || 75) * params.children + 250 * mult)
    );
    const lunchCost = Math.round((params.destination.costs.foodPerDay * 0.45) * totalTravelers * mult);
    const afternoonCost = Math.round(
      ((attr2?.adultPrice || 120) * params.adults + 300 * mult)
    );
    const eveningCost = Math.round(350 * totalTravelers * mult);
    const hotelAndDinnerCost = Math.round(
      (params.destination.costs.hotelPerNight * mult * Math.ceil(params.adults / 2)) +
      (params.destination.costs.foodPerDay * 0.55 * totalTravelers * mult)
    );

    const dailyTotalCost = morningCost + lunchCost + afternoonCost + eveningCost + hotelAndDinnerCost;
    runningTotal += dailyTotalCost;

    days.push({
      dayNumber: i + 1,
      dateStr,
      title: isFirstDay
        ? `Arrival in ${params.destination.name} & Heritage Orientation`
        : isLastDay
          ? `Cultural Highlights, Souvenir Bazaars & Departure`
          : `Signature ${params.destination.name} Landmarks & Local Experiences`,
      morning: {
        time: isFirstDay ? '09:30 AM' : '08:30 AM',
        activity: isFirstDay
          ? `Arrive from ${params.startingCity} via ${params.transportMode}, check into your ${params.hotelPreference} stay & visit ${attr1?.name || params.destination.name}`
          : `Guided morning exploration of ${attr1?.name || thing}`,
        location: attr1?.name || params.destination.name,
        cost: morningCost,
      },
      lunch: {
        time: '01:15 PM',
        recommendation: `${rest?.name || 'Authentic Local Dining Room'} (${params.foodPreference} menu)`,
        cuisine: rest?.cuisine || params.foodPreference,
        cost: lunchCost,
      },
      afternoon: {
        time: '03:00 PM',
        activity: thing || `Explore ${attr2?.name || 'nearby heritage precinct'}`,
        location: attr2?.name || `${params.destination.name} Cultural Zone`,
        cost: afternoonCost,
      },
      evening: {
        time: '06:00 PM',
        activity: isLastDay
          ? `Handicraft shopping in ${params.destination.name} bazaar & sunset promenade`
          : `Golden hour experience: ${things[(i + 1) % things.length] || 'Evening Aarti / Light Show'}`,
        location: params.destination.nearbyPlaces[i % params.destination.nearbyPlaces.length]?.name || params.destination.name,
        cost: eveningCost,
      },
      dinnerAndStay: {
        dinner: `Regional ${params.foodPreference} dinner feast`,
        hotelName: `${params.hotelPreference} in ${params.destination.name} (${params.budget} Tier)`,
        cost: hotelAndDinnerCost,
      },
      dailyTotalCost,
    });
  }

  return {
    id: `ITIN-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    startingCity: params.startingCity,
    destinationId: params.destination.id,
    destinationName: params.destination.name,
    startDate: params.startDate,
    endDate: params.endDate,
    daysCount,
    adults: params.adults,
    children: params.children,
    travelType: params.travelType,
    budget: params.budget,
    transportMode: params.transportMode,
    hotelPreference: params.hotelPreference,
    foodPreference: params.foodPreference,
    interests: params.interests,
    days,
    totalEstimatedCost: runningTotal,
  };
}
