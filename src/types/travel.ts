export type Language = 'en' | 'te';

export type DestinationCategory =
  | 'Historical Places'
  | 'Temples'
  | 'Beaches'
  | 'Hill Stations'
  | 'Wildlife'
  | 'Adventure'
  | 'Nature'
  | 'Spiritual Places';

export type BudgetTier = 'Budget' | 'Standard' | 'Premium' | 'Luxury';
export type TravelType = 'Solo' | 'Couple' | 'Family' | 'Friends';
export type TransportMode = 'Flight' | 'Train' | 'Bus' | 'Car' | 'Taxi';

export interface AttractionItem {
  id: string;
  name: string;
  nameTe?: string;
  category: 'Monument' | 'Temple' | 'Museum' | 'Park' | 'Adventure' | 'Nature' | 'Event';
  openingHours: string;
  adultPrice: number;
  childPrice: number;
  duration: string;
  description: string;
  coordinates: { x: number; y: number }; // Relative city map coords (0-100)
}

export interface NearbyPlace {
  name: string;
  distanceKm: number;
  type: string;
}

export interface Destination {
  id: string;
  name: string;
  nameTe: string;
  state: string;
  stateTe: string;
  tagline: string;
  taglineTe: string;
  description: string;
  descriptionTe: string;
  categories: DestinationCategory[];
  rating: number;
  reviewCount: number;
  bestTimeToVisit: string;
  recommendedDays: number;
  weatherInfo: {
    tempRange: string;
    seasonCondition: string;
    humidity: string;
  };
  costs: {
    entryTicketAvg: number;
    localTransportPerDay: number;
    foodPerDay: number;
    hotelPerNight: number;
  };
  imageKey: 'hero' | 'south_kerala' | 'rajasthan' | 'kashmir' | 'goa';
  imageCropPosition?: string;
  thingsToDo: string[];
  famousAttractions: AttractionItem[];
  nearbyPlaces: NearbyPlace[];
  mapCoordinates: {
    lat: number;
    lng: number;
    indiaMapX: number; // 0-100 on India SVG map
    indiaMapY: number; // 0-100 on India SVG map
  };
  sampleRestaurants: {
    name: string;
    cuisine: string;
    avgCostForTwo: number;
    x: number;
    y: number;
  }[];
}

export interface Hotel {
  id: string;
  destinationId: string;
  city: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  hotelType: 'Heritage Palace' | 'Luxury Hotel' | 'Boutique Stay' | 'Budget Resort' | 'Homestay';
  roomType: string;
  pricePerNight: number;
  amenities: string[];
  breakfastIncluded: boolean;
  distanceFromCenterKm: number;
  nearestAttraction: string;
  imageKey: 'hero' | 'south_kerala' | 'rajasthan' | 'kashmir' | 'goa';
  coordinates: { x: number; y: number };
}

export interface TransportOption {
  id: string;
  mode: TransportMode;
  operatorName: string;
  serviceNumber: string;
  fromCity: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  approxFare: number;
  classType: string;
}

export interface LocalGuide {
  id: string;
  name: string;
  city: string;
  destinationId: string;
  languages: string[];
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  hourlyPrice: number;
  dailyPrice: number;
  specialization: string[];
  availability: 'Available Today' | 'Available Tomorrow' | 'Weekends Only';
  bio: string;
  verifiedBadge: string;
}

export interface TicketBookingSelection {
  attractionId: string;
  attractionName: string;
  city: string;
  ticketType: string;
  date: string;
  adults: number;
  children: number;
  adultPrice: number;
  childPrice: number;
  totalPrice: number;
}

export interface GuideBookingSelection {
  guide: LocalGuide;
  bookingType: 'hourly' | 'daily';
  units: number; // hours or days
  date: string;
  totalPrice: number;
}

export interface DayPlanItem {
  dayNumber: number;
  dateStr: string;
  title: string;
  morning: {
    time: string;
    activity: string;
    location: string;
    cost: number;
  };
  lunch: {
    time: string;
    recommendation: string;
    cuisine: string;
    cost: number;
  };
  afternoon: {
    time: string;
    activity: string;
    location: string;
    cost: number;
  };
  evening: {
    time: string;
    activity: string;
    location: string;
    cost: number;
  };
  dinnerAndStay: {
    dinner: string;
    hotelName: string;
    cost: number;
  };
  dailyTotalCost: number;
}

export interface GeneratedItinerary {
  id: string;
  createdAt: string;
  startingCity: string;
  destinationId: string;
  destinationName: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  adults: number;
  children: number;
  travelType: TravelType;
  budget: BudgetTier;
  transportMode: TransportMode;
  hotelPreference: string;
  foodPreference: string;
  interests: string[];
  days: DayPlanItem[];
  totalEstimatedCost: number;
}

export interface CompletedBooking {
  bookingId: string;
  createdAt: string;
  status: 'Confirmed (Demo)' | 'Completed' | 'Upcoming';
  userId: string;
  userName: string;
  destinationName: string;
  destinationId: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  adults: number;
  children: number;
  travelType: TravelType;
  budget: BudgetTier;
  selectedHotel?: {
    hotel: Hotel;
    nights: number;
    rooms: number;
    totalHotelCost: number;
  };
  selectedTransport?: {
    transport: TransportOption;
    passengers: number;
    totalTransportCost: number;
  };
  selectedTickets: TicketBookingSelection[];
  selectedGuide?: GuideBookingSelection;
  costBreakdown: {
    transport: number;
    hotel: number;
    food: number;
    tickets: number;
    guide: number;
    localTransport: number;
    otherExpenses: number;
    totalCost: number;
    costPerPerson: number;
    dailyAverage: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  preferredLanguage: Language;
  role: 'traveler' | 'admin';
  savedDestinationIds: string[];
  savedHotelIds: string[];
}
