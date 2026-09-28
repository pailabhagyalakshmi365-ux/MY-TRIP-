import {
  Destination,
  Hotel,
  TransportOption,
  LocalGuide,
  CompletedBooking,
  GeneratedItinerary,
  UserProfile,
} from '../types/travel';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import { INITIAL_HOTELS, INITIAL_TRANSPORT, INITIAL_GUIDES } from '../data/servicesData';

/**
 * Separated API & Storage Service Layer
 * Uses structured local state + localStorage in demo mode.
 * Replace base endpoints in `API_ENDPOINTS` when connecting live hotel/rail/flight GDS APIs.
 */
export const API_ENDPOINTS = {
  destinations: '/api/v1/destinations',
  hotels: '/api/v1/hotels/search',
  tickets: '/api/v1/attractions/tickets',
  transport: '/api/v1/transport/options',
  guides: '/api/v1/guides',
  bookings: '/api/v1/bookings/demo',
};

const STORAGE_KEYS = {
  destinations: 'itp_destinations_v1',
  hotels: 'itp_hotels_v1',
  transport: 'itp_transport_v1',
  guides: 'itp_guides_v1',
  bookings: 'itp_bookings_v1',
  itineraries: 'itp_itineraries_v1',
  user: 'itp_current_user_v1',
  usersList: 'itp_users_list_v1',
};

export const DEFAULT_USER: UserProfile = {
  id: 'usr-demo-1',
  name: 'Ananya Sharma',
  email: 'ananya.traveler@example.in',
  phone: '+91 98480 24680',
  city: 'Hyderabad',
  preferredLanguage: 'en',
  role: 'traveler',
  savedDestinationIds: ['hyderabad', 'tirupati', 'kerala', 'jaipur'],
  savedHotelIds: ['htl-hyd-1', 'htl-ker-1'],
};

export const INITIAL_DEMO_BOOKINGS: CompletedBooking[] = [
  {
    bookingId: 'ITP-2026-48291',
    createdAt: '14 Sep 2026',
    status: 'Completed',
    userId: 'usr-demo-1',
    userName: 'Ananya Sharma',
    destinationName: 'Tirupati',
    destinationId: 'tirupati',
    startDate: '2026-09-10',
    endDate: '2026-09-12',
    daysCount: 3,
    adults: 2,
    children: 1,
    travelType: 'Family',
    budget: 'Standard',
    selectedHotel: {
      hotel: INITIAL_HOTELS[4],
      nights: 2,
      rooms: 1,
      totalHotelCost: 7200,
    },
    selectedTransport: {
      transport: INITIAL_TRANSPORT[5],
      passengers: 3,
      totalTransportCost: 5040,
    },
    selectedTickets: [
      {
        attractionId: 'tpt-balaji',
        attractionName: 'Sri Venkateswara Swamy Temple (Seeghra Darshan)',
        city: 'Tirupati',
        ticketType: 'Special Entry Darshan (Demo)',
        date: '2026-09-11',
        adults: 2,
        children: 1,
        adultPrice: 300,
        childPrice: 0,
        totalPrice: 600,
      },
    ],
    costBreakdown: {
      transport: 5040,
      hotel: 7200,
      food: 4500,
      tickets: 600,
      guide: 3600,
      localTransport: 1500,
      otherExpenses: 1200,
      totalCost: 23640,
      costPerPerson: 7880,
      dailyAverage: 7880,
    },
  },
];

function safeLoad<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSave<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors in sandboxed frames
  }
}

export const TravelDataStore = {
  getDestinations: (): Destination[] => safeLoad(STORAGE_KEYS.destinations, INITIAL_DESTINATIONS),
  saveDestinations: (items: Destination[]) => safeSave(STORAGE_KEYS.destinations, items),

  getHotels: (): Hotel[] => safeLoad(STORAGE_KEYS.hotels, INITIAL_HOTELS),
  saveHotels: (items: Hotel[]) => safeSave(STORAGE_KEYS.hotels, items),

  getTransport: (): TransportOption[] => safeLoad(STORAGE_KEYS.transport, INITIAL_TRANSPORT),
  saveTransport: (items: TransportOption[]) => safeSave(STORAGE_KEYS.transport, items),

  getGuides: (): LocalGuide[] => safeLoad(STORAGE_KEYS.guides, INITIAL_GUIDES),
  saveGuides: (items: LocalGuide[]) => safeSave(STORAGE_KEYS.guides, items),

  getBookings: (): CompletedBooking[] => safeLoad(STORAGE_KEYS.bookings, INITIAL_DEMO_BOOKINGS),
  saveBookings: (items: CompletedBooking[]) => safeSave(STORAGE_KEYS.bookings, items),

  getItineraries: (): GeneratedItinerary[] => safeLoad(STORAGE_KEYS.itineraries, []),
  saveItineraries: (items: GeneratedItinerary[]) => safeSave(STORAGE_KEYS.itineraries, items),

  getCurrentUser: (): UserProfile => safeLoad(STORAGE_KEYS.user, DEFAULT_USER),
  saveCurrentUser: (user: UserProfile) => safeSave(STORAGE_KEYS.user, user),

  getAllUsers: (): UserProfile[] =>
    safeLoad(STORAGE_KEYS.usersList, [
      DEFAULT_USER,
      {
        id: 'usr-admin-1',
        name: 'Rajeshwar Rao (Admin)',
        email: 'admin@indiatripplanner.in',
        phone: '+91 90001 11222',
        city: 'Visakhapatnam',
        preferredLanguage: 'te',
        role: 'admin',
        savedDestinationIds: ['visakhapatnam', 'srisailam'],
        savedHotelIds: [],
      },
    ]),
  saveAllUsers: (users: UserProfile[]) => safeSave(STORAGE_KEYS.usersList, users),
};
