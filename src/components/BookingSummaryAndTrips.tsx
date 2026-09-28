import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  Users,
  Hotel as HotelIcon,
  Plane,
  Ticket,
  UserCheck,
  Trash2,
  Bookmark,
  Heart,
  User,
  LogIn,
  X,
} from 'lucide-react';
import {
  Destination,
  Hotel,
  TransportOption,
  TicketBookingSelection,
  GuideBookingSelection,
  CompletedBooking,
  GeneratedItinerary,
  UserProfile,
  BudgetTier,
  TravelType,
  Language,
} from '../types/travel';
import { formatINR } from '../utils/format';
import { UI_TEXT } from '../data/translations';

interface BookingSummaryAndTripsProps {
  language: Language;
  currentUser: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  selectedDestination: Destination;
  startDate: string;
  endDate: string;
  daysCount: number;
  adults: number;
  childrenCount: number;
  travelType: TravelType;
  budgetTier: BudgetTier;
  selectedHotel?: Hotel;
  onClearHotel: () => void;
  selectedTransport?: TransportOption;
  onClearTransport: () => void;
  selectedTickets: TicketBookingSelection[];
  onRemoveTicket: (attractionId: string) => void;
  selectedGuide?: GuideBookingSelection;
  onClearGuide: () => void;
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
  bookings: CompletedBooking[];
  onConfirmDemoBooking: () => CompletedBooking;
  savedDestinations: Destination[];
  onToggleSaveDestination: (id: string) => void;
  onOpenDestination: (dest: Destination) => void;
  savedHotels: Hotel[];
  onToggleSaveHotel: (id: string) => void;
  onSelectHotel: (hotel: Hotel) => void;
  savedItineraries: GeneratedItinerary[];
  onDeleteItinerary: (id: string) => void;
}

export const BookingSummaryAndTrips: React.FC<BookingSummaryAndTripsProps> = ({
  language,
  currentUser,
  onUpdateUser,
  selectedDestination,
  startDate,
  endDate,
  daysCount,
  adults,
  childrenCount,
  travelType,
  budgetTier,
  selectedHotel,
  onClearHotel,
  selectedTransport,
  onClearTransport,
  selectedTickets,
  onRemoveTicket,
  selectedGuide,
  onClearGuide,
  costBreakdown,
  bookings,
  onConfirmDemoBooking,
  savedDestinations,
  onToggleSaveDestination,
  onOpenDestination,
  savedHotels,
  onToggleSaveHotel,
  onSelectHotel,
  savedItineraries,
  onDeleteItinerary,
}) => {
  const t = UI_TEXT[language];

  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState<CompletedBooking | null>(null);
  const [activeUserTab, setActiveUserTab] = useState<
    'bookings' | 'destinations' | 'hotels' | 'itineraries' | 'profile'
  >('bookings');

  // Auth / Profile Modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [nameInput, setNameInput] = useState(currentUser.name);
  const [emailInput, setEmailInput] = useState(currentUser.email);
  const [phoneInput, setPhoneInput] = useState(currentUser.phone);
  const [cityInput, setCityInput] = useState(currentUser.city);

  const handleConfirmClick = () => {
    const confirmed = onConfirmDemoBooking();
    setLatestConfirmedBooking(confirmed);
    setActiveUserTab('bookings');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !nameInput.trim()) return;
    onUpdateUser({
      ...currentUser,
      name: nameInput.trim(),
      email: emailInput.trim(),
      phone: phoneInput.trim() || '+91 98480 00000',
      city: cityInput.trim() || 'Hyderabad',
    });
    setShowAuthModal(false);
  };

  return (
    <div className="space-y-16">
      {/* =========================================================
          SECTION 9: BOOKING SUMMARY & CONFIRMATION
         ========================================================= */}
      <section id="booking-summary" className="pt-14 border-t border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <p className="text-xs font-medium text-[#B45309] mb-1">
              09 · Pre-Confirmation Trip Review & Demo Checkout
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
              {t.bookingSummaryTitle}
            </h2>
            <p className="text-sm text-[#57534E] mt-1">
              Review your selected destination, travel dates, hotel, transport, tickets, local guide, and total estimated cost before confirming your demo booking.
            </p>
          </div>

          {/* Demo Booking Confirmation Banner (when triggered) */}
          {latestConfirmedBooking && (
            <div className="bg-[#0F766E]/10 border-2 border-[#0F766E] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#0F766E] font-bold text-lg">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <span>{t.demoBookingSuccess}</span>
                </div>
                <p className="text-sm text-[#1C1917]">
                  Booking Reference ID:{' '}
                  <strong className="font-mono bg-white px-2 py-0.5 rounded border border-[#0F766E]/40">
                    {latestConfirmedBooking.bookingId}
                  </strong>{' '}
                  for <strong>{latestConfirmedBooking.destinationName}</strong> ({latestConfirmedBooking.startDate} to {latestConfirmedBooking.endDate})
                </p>
                <p className="text-xs text-[#44403C]">
                  Your demo reservation has been recorded in "My Trips & Bookings" below. No real payment was charged.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-xs text-[#57534E] block">Confirmed Demo Total</span>
                  <span className="font-mono text-xl font-bold text-[#0F766E]">
                    {formatINR(latestConfirmedBooking.costBreakdown.totalCost)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLatestConfirmedBooking(null)}
                  className="p-2 rounded-lg border border-[#E7E2DA] bg-white text-xs text-[#57534E] hover:text-[#1C1917]"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white border border-[#E7E2DA] rounded-xl p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-[#E7E2DA]">
                <div>
                  <span className="text-xs text-[#57534E] block">Destination</span>
                  <span className="font-display text-xl font-bold text-[#1C1917]">
                    {selectedDestination.name} ({selectedDestination.state})
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#57534E] block">Travel Dates & Duration</span>
                  <span className="font-mono text-sm font-semibold text-[#1C1917]">
                    {startDate} → {endDate} ({daysCount} Days)
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#57534E] block">Travelers & Style</span>
                  <span className="text-sm font-semibold text-[#1C1917]">
                    {adults} Adults{childrenCount > 0 ? `, ${childrenCount} Children` : ''} · {travelType} ({budgetTier})
                  </span>
                </div>
              </div>

              {/* Selected Items List */}
              <div className="space-y-3 text-xs">
                {/* Hotel */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA]">
                  <div>
                    <span className="text-[#57534E] block">Selected Hotel Stay</span>
                    {selectedHotel ? (
                      <span className="font-semibold text-sm text-[#1C1917]">
                        {selectedHotel.name} ({selectedHotel.roomType}) · {formatINR(selectedHotel.pricePerNight)}/night
                      </span>
                    ) : (
                      <span className="text-[#44403C]">
                        Standard {selectedDestination.name} Hotel Estimate ({formatINR(selectedDestination.costs.hotelPerNight)}/night)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold text-sm text-[#1C1917]">
                      {formatINR(costBreakdown.hotel)}
                    </span>
                    {selectedHotel && (
                      <button
                        type="button"
                        onClick={onClearHotel}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Transport */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA]">
                  <div>
                    <span className="text-[#57534E] block">Selected Intercity Transport</span>
                    {selectedTransport ? (
                      <span className="font-semibold text-sm text-[#1C1917]">
                        {selectedTransport.mode}: {selectedTransport.operatorName} ({selectedTransport.fromCity} → {selectedTransport.toCity})
                      </span>
                    ) : (
                      <span className="text-[#44403C]">
                        Estimated Round-Trip Transit for {adults + childrenCount} Traveler(s)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold text-sm text-[#1C1917]">
                      {formatINR(costBreakdown.transport)}
                    </span>
                    {selectedTransport && (
                      <button
                        type="button"
                        onClick={onClearTransport}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Tickets */}
                <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#57534E]">Selected Attraction Tickets</span>
                    <span className="font-mono font-semibold text-sm text-[#1C1917]">
                      {formatINR(costBreakdown.tickets)}
                    </span>
                  </div>
                  {selectedTickets.length > 0 ? (
                    <div className="space-y-1.5 pt-1 border-t border-[#E7E2DA]">
                      {selectedTickets.map((tk) => (
                        <div key={tk.attractionId} className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#1C1917]">
                            {tk.attractionName} ({tk.adults}A, {tk.children}C on {tk.date})
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono">{formatINR(tk.totalPrice)}</span>
                            <button
                              type="button"
                              onClick={() => onRemoveTicket(tk.attractionId)}
                              className="text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#44403C]">
                      Using default monument & attraction entry estimate for {selectedDestination.name}.
                    </p>
                  )}
                </div>

                {/* Guide */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA]">
                  <div>
                    <span className="text-[#57534E] block">Local Tourist Guide</span>
                    {selectedGuide ? (
                      <span className="font-semibold text-sm text-[#1C1917]">
                        {selectedGuide.guide.name} ({selectedGuide.guide.city}) · {selectedGuide.units}{' '}
                        {selectedGuide.bookingType === 'hourly' ? 'Hours' : 'Day(s)'} ({selectedGuide.guide.languages.join(', ')})
                      </span>
                    ) : (
                      <span className="text-[#44403C]">No local guide hired yet (Optional)</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold text-sm text-[#1C1917]">
                      {formatINR(costBreakdown.guide)}
                    </span>
                    {selectedGuide && (
                      <button
                        type="button"
                        onClick={onClearGuide}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Final Confirm Box (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-[#E7E2DA] rounded-xl p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="text-xs font-medium text-[#57534E] block">
                  Traveler Account: <strong className="text-[#1C1917]">{currentUser.name}</strong>
                </span>
                <h3 className="font-display text-2xl font-bold text-[#1C1917]">
                  Total Trip Estimate
                </h3>

                <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Hotel + Transport</span>
                    <span className="font-mono font-medium">
                      {formatINR(costBreakdown.hotel + costBreakdown.transport)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Food + Local Transit</span>
                    <span className="font-mono font-medium">
                      {formatINR(costBreakdown.food + costBreakdown.localTransport)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Tickets + Guide + Other</span>
                    <span className="font-mono font-medium">
                      {formatINR(costBreakdown.tickets + costBreakdown.guide + costBreakdown.otherExpenses)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#E7E2DA] flex justify-between items-baseline">
                    <span className="font-semibold text-sm text-[#1C1917]">Estimated Total</span>
                    <span className="font-mono text-2xl font-bold text-[#B45309]">
                      {formatINR(costBreakdown.totalCost)}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#57534E] leading-relaxed">
                  Demo Mode Notice: Clicking "{t.confirmBookingBtn}" simulates a booking confirmation, generates a unique Booking ID, and adds this trip to your "My Trips" history.
                </p>
              </div>

              <button
                type="button"
                onClick={handleConfirmClick}
                className="w-full py-3.5 px-5 bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-sm rounded-lg transition-colors shadow-sm whitespace-nowrap"
              >
                {t.confirmBookingBtn} ({formatINR(costBreakdown.totalCost)})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 10: USER FEATURES — MY TRIPS, SAVED PLACES & PROFILE
         ========================================================= */}
      <section id="my-trips-section" className="py-14 border-t border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#B45309] mb-1">
                10 · Traveler Account, Saved Items & Trip History
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
                My Trips, Bookings & Saved Collection
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right text-xs">
                <span className="font-semibold text-[#1C1917] block">{currentUser.name}</span>
                <span className="text-[#57534E]">{currentUser.email}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNameInput(currentUser.name);
                  setEmailInput(currentUser.email);
                  setPhoneInput(currentUser.phone);
                  setCityInput(currentUser.city);
                  setShowAuthModal(true);
                }}
                className="px-3.5 py-2 text-xs font-semibold bg-white border border-[#E7E2DA] rounded-lg hover:bg-[#F3EFEA] transition-colors whitespace-nowrap"
              >
                Login / Switch User
              </button>
            </div>
          </div>

          {/* User Dashboard Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-[#E7E2DA] rounded-lg w-fit">
            <button
              type="button"
              onClick={() => setActiveUserTab('bookings')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeUserTab === 'bookings' ? 'bg-[#1C1917] text-white' : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              My Bookings & Trip History ({bookings.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveUserTab('destinations')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeUserTab === 'destinations' ? 'bg-[#1C1917] text-white' : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              Saved Destinations ({savedDestinations.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveUserTab('hotels')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeUserTab === 'hotels' ? 'bg-[#1C1917] text-white' : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              Saved Hotels ({savedHotels.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveUserTab('itineraries')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeUserTab === 'itineraries' ? 'bg-[#1C1917] text-white' : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              Saved Itineraries ({savedItineraries.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveUserTab('profile')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeUserTab === 'profile' ? 'bg-[#1C1917] text-white' : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              User Profile
            </button>
          </div>

          {/* Tab 1: My Bookings & Trip History */}
          {activeUserTab === 'bookings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {bookings.map((bk) => (
                <div
                  key={bk.bookingId}
                  className="bg-white border border-[#E7E2DA] rounded-xl p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-[#B45309]">
                        ID: {bk.bookingId} · Booked {bk.createdAt}
                      </span>
                      <span className="font-medium text-[#0F766E]">{bk.status}</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[#1C1917]">
                      {bk.destinationName} Trip ({bk.daysCount} Days)
                    </h3>

                    <p className="text-xs text-[#44403C] font-mono">
                      Dates: {bk.startDate} to {bk.endDate} · {bk.adults} Adults
                      {bk.children > 0 ? `, ${bk.children} Children` : ''} ({bk.travelType} · {bk.budget})
                    </p>

                    <div className="text-xs text-[#57534E] space-y-1 pt-2 border-t border-[#E7E2DA]">
                      <p>
                        <strong className="text-[#1C1917]">Hotel:</strong>{' '}
                        {bk.selectedHotel ? bk.selectedHotel.hotel.name : 'Standard City Stay'}
                      </p>
                      <p>
                        <strong className="text-[#1C1917]">Transport:</strong>{' '}
                        {bk.selectedTransport
                          ? `${bk.selectedTransport.transport.mode} (${bk.selectedTransport.transport.operatorName})`
                          : 'Intercity Transit'}
                      </p>
                      <p>
                        <strong className="text-[#1C1917]">Tickets & Guide:</strong>{' '}
                        {bk.selectedTickets.length} attraction ticket(s)
                        {bk.selectedGuide ? ` · Guide: ${bk.selectedGuide.guide.name}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E7E2DA] flex items-center justify-between">
                    <span className="text-xs text-[#57534E]">
                      Per Person: <strong className="font-mono">{formatINR(bk.costBreakdown.costPerPerson)}</strong>
                    </span>
                    <span className="font-mono text-lg font-bold text-[#1C1917]">
                      Total: {formatINR(bk.costBreakdown.totalCost)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Saved Destinations */}
          {activeUserTab === 'destinations' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {savedDestinations.length === 0 ? (
                <p className="text-sm text-[#57534E] col-span-full bg-white p-6 rounded-xl border border-[#E7E2DA]">
                  No saved destinations yet. Click the heart icon on any destination card to save it here.
                </p>
              ) : (
                savedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="bg-white border border-[#E7E2DA] rounded-xl p-4 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs text-[#57534E]">{dest.state}</span>
                      <h4 className="font-display text-xl font-bold text-[#1C1917]">
                        {dest.name} ({dest.nameTe})
                      </h4>
                      <p className="text-xs text-[#57534E] mt-1">{dest.tagline}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#E7E2DA] text-xs">
                      <button
                        type="button"
                        onClick={() => onOpenDestination(dest)}
                        className="font-semibold text-[#B45309] hover:underline"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleSaveDestination(dest.id)}
                        className="text-[#57534E] hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Saved Hotels */}
          {activeUserTab === 'hotels' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedHotels.length === 0 ? (
                <p className="text-sm text-[#57534E] col-span-full bg-white p-6 rounded-xl border border-[#E7E2DA]">
                  No saved hotels yet. Click the heart icon on any hotel card to bookmark it.
                </p>
              ) : (
                savedHotels.map((htl) => (
                  <div
                    key={htl.id}
                    className="bg-white border border-[#E7E2DA] rounded-xl p-4 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs text-[#57534E]">
                        {htl.city} · {htl.hotelType}
                      </span>
                      <h4 className="font-display text-lg font-bold text-[#1C1917]">{htl.name}</h4>
                      <p className="font-mono text-sm font-semibold text-[#B45309] mt-1">
                        {formatINR(htl.pricePerNight)} / night
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#E7E2DA] text-xs">
                      <button
                        type="button"
                        onClick={() => onSelectHotel(htl)}
                        className="font-semibold text-[#0F766E] hover:underline"
                      >
                        Select for Trip
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleSaveHotel(htl.id)}
                        className="text-[#57534E] hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 4: Saved Itineraries */}
          {activeUserTab === 'itineraries' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedItineraries.length === 0 ? (
                <p className="text-sm text-[#57534E] col-span-full bg-white p-6 rounded-xl border border-[#E7E2DA]">
                  No saved itineraries yet. Generate an itinerary in the Trip Planner above and click "Save Itinerary".
                </p>
              ) : (
                savedItineraries.map((itin) => (
                  <div
                    key={itin.id}
                    className="bg-white border border-[#E7E2DA] rounded-xl p-5 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#57534E]">
                        <span className="font-mono">{itin.id} · Created {itin.createdAt}</span>
                        <span>{itin.daysCount} Days · {itin.budget}</span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-[#1C1917] mt-1">
                        {itin.startingCity} → {itin.destinationName}
                      </h4>
                      <p className="text-xs text-[#44403C]">
                        Dates: {itin.startDate} to {itin.endDate} · Interests: {itin.interests.join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#E7E2DA] text-xs">
                      <span className="font-mono font-bold text-sm text-[#B45309]">
                        Est. {formatINR(itin.totalEstimatedCost)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onDeleteItinerary(itin.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 5: User Profile */}
          {activeUserTab === 'profile' && (
            <div className="bg-white border border-[#E7E2DA] rounded-xl p-6 max-w-xl space-y-4">
              <h3 className="font-display text-2xl font-bold text-[#1C1917]">
                Traveler Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#57534E] block">Full Name</span>
                  <span className="font-semibold text-sm text-[#1C1917]">{currentUser.name}</span>
                </div>
                <div>
                  <span className="text-[#57534E] block">Email Address</span>
                  <span className="font-semibold text-sm text-[#1C1917]">{currentUser.email}</span>
                </div>
                <div>
                  <span className="text-[#57534E] block">Phone Number</span>
                  <span className="font-mono text-sm text-[#1C1917]">{currentUser.phone}</span>
                </div>
                <div>
                  <span className="text-[#57534E] block">Home City</span>
                  <span className="font-semibold text-sm text-[#1C1917]">{currentUser.city}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 text-xs font-semibold bg-[#1C1917] text-white rounded-lg"
              >
                Edit Profile / Sign Up New Traveler
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Sign Up / Login Modal */}
      {showAuthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-[#E7E2DA] rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`text-sm font-semibold ${
                    authMode === 'login' ? 'text-[#B45309] underline' : 'text-[#57534E]'
                  }`}
                >
                  Login / Update
                </button>
                <span className="text-[#E7E2DA]">·</span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setNameInput('');
                    setEmailInput('');
                  }}
                  className={`text-sm font-semibold ${
                    authMode === 'signup' ? 'text-[#B45309] underline' : 'text-[#57534E]'
                  }`}
                >
                  Sign Up
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="p-1 text-[#57534E] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-[#44403C] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Karthik Reddy"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium text-[#44403C] mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="karthik@example.in"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#44403C] mb-1">Mobile (India)</label>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+91 98480 12345"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#44403C] mb-1">Home City</label>
                  <input
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="Hyderabad"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="px-4 py-2 border border-[#E7E2DA] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B45309] text-white font-semibold rounded-lg"
                >
                  {authMode === 'signup' ? 'Create Traveler Account' : 'Save & Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
