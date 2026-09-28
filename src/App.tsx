import React, { useState, useMemo } from 'react';
import {
  Search,
  Star,
  Heart,
  MapPin,
  Calendar,
  Users,
  Compass,
  Globe,
  Shield,
  ArrowRight,
  X,
} from 'lucide-react';
import {
  Destination,
  DestinationCategory,
  Hotel,
  TransportOption,
  LocalGuide,
  TicketBookingSelection,
  GuideBookingSelection,
  GeneratedItinerary,
  CompletedBooking,
  UserProfile,
  BudgetTier,
  TravelType,
  Language,
  AttractionItem,
} from './types/travel';
import { TravelDataStore } from './services/travelApi';
import { UI_TEXT, CATEGORY_LABELS_TE } from './data/translations';
import { IMAGE_ASSETS } from './utils/images';
import { formatINR, calculateDaysBetween } from './utils/format';
import { ResilientImage } from './components/ResilientImage';
import { DestinationModal } from './components/DestinationModal';
import { TripPlannerSection } from './components/TripPlannerSection';
import { ServicesMarketplaceSection } from './components/ServicesMarketplaceSection';
import { InteractiveMapAndCalculator } from './components/InteractiveMapAndCalculator';
import { BookingSummaryAndTrips } from './components/BookingSummaryAndTrips';
import { AdminDashboardModal } from './components/AdminDashboardModal';

const CATEGORIES: ('All' | DestinationCategory)[] = [
  'All',
  'Historical Places',
  'Temples',
  'Beaches',
  'Hill Stations',
  'Wildlife',
  'Adventure',
  'Nature',
  'Spiritual Places',
];

export default function App() {
  // Language state (English or Telugu)
  const [language, setLanguage] = useState<Language>('en');
  const t = UI_TEXT[language];

  // Persistent Data Store State
  const [destinations, setDestinations] = useState<Destination[]>(() =>
    TravelDataStore.getDestinations()
  );
  const [hotels, setHotels] = useState<Hotel[]>(() => TravelDataStore.getHotels());
  const [transportOptions, setTransportOptions] = useState<TransportOption[]>(() =>
    TravelDataStore.getTransport()
  );
  const [guides, setGuides] = useState<LocalGuide[]>(() => TravelDataStore.getGuides());
  const [bookings, setBookings] = useState<CompletedBooking[]>(() =>
    TravelDataStore.getBookings()
  );
  const [savedItineraries, setSavedItineraries] = useState<GeneratedItinerary[]>(() =>
    TravelDataStore.getItineraries()
  );
  const [currentUser, setCurrentUser] = useState<UserProfile>(() =>
    TravelDataStore.getCurrentUser()
  );
  const [allUsers] = useState<UserProfile[]>(() => TravelDataStore.getAllUsers());

  // Hero & Global Search State
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [heroTravelDate, setHeroTravelDate] = useState('2026-10-15');
  const [heroTravelersCount, setHeroTravelersCount] = useState(2);
  const [heroBudget, setHeroBudget] = useState<BudgetTier>('Standard');
  const [selectedCategory, setSelectedCategory] = useState<'All' | DestinationCategory>('All');

  // Active Trip Builder & Cost Calculator State
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('hyderabad');
  const [tripStartDate, setTripStartDate] = useState<string>('2026-10-15');
  const [tripEndDate, setTripEndDate] = useState<string>('2026-10-18');
  const [daysCount, setDaysCount] = useState<number>(3);
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [travelType, setTravelType] = useState<TravelType>('Family');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('Standard');

  // Selected services for trip
  const [activeServiceCityFilter, setActiveServiceCityFilter] = useState<string>('all');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | undefined>(() =>
    TravelDataStore.getHotels()[0]
  );
  const [selectedTransport, setSelectedTransport] = useState<TransportOption | undefined>(() =>
    TravelDataStore.getTransport()[4]
  );
  const [selectedTickets, setSelectedTickets] = useState<TicketBookingSelection[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<GuideBookingSelection | undefined>(undefined);
  const [customOtherExpenses, setCustomOtherExpenses] = useState<number>(1500);

  // Modals
  const [modalDestination, setModalDestination] = useState<Destination | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const selectedDestination = useMemo(
    () => destinations.find((d) => d.id === selectedDestinationId) || destinations[0],
    [destinations, selectedDestinationId]
  );

  // Filtered Destinations for Home Grid
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      if (selectedCategory !== 'All' && !dest.categories.includes(selectedCategory)) {
        return false;
      }
      if (globalSearchQuery.trim()) {
        const q = globalSearchQuery.toLowerCase();
        const matchName =
          dest.name.toLowerCase().includes(q) ||
          dest.nameTe.includes(q) ||
          dest.state.toLowerCase().includes(q) ||
          dest.tagline.toLowerCase().includes(q) ||
          dest.categories.some((c) => c.toLowerCase().includes(q)) ||
          dest.thingsToDo.some((td) => td.toLowerCase().includes(q)) ||
          dest.famousAttractions.some((fa) => fa.name.toLowerCase().includes(q));
        return matchName;
      }
      return true;
    });
  }, [destinations, selectedCategory, globalSearchQuery]);

  // Global Search Results across Hotels, Guides, Attractions & Activities
  const globalCrossMatches = useMemo(() => {
    const q = globalSearchQuery.trim().toLowerCase();
    if (!q) return null;

    const matchedHotels = hotels.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.hotelType.toLowerCase().includes(q)
    );
    const matchedGuides = guides.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.city.toLowerCase().includes(q) ||
        g.languages.some((l) => l.toLowerCase().includes(q)) ||
        g.specialization.some((s) => s.toLowerCase().includes(q))
    );
    const matchedAttractions = destinations.flatMap((d) =>
      d.famousAttractions
        .filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.category.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q)
        )
        .map((a) => ({ ...a, city: d.name, dest: d }))
    );

    return {
      hotels: matchedHotels,
      guides: matchedGuides,
      attractions: matchedAttractions,
    };
  }, [globalSearchQuery, hotels, guides, destinations]);

  // Live Trip Cost Calculator Math
  const costBreakdown = useMemo(() => {
    const budgetMult: Record<BudgetTier, number> = {
      Budget: 0.75,
      Standard: 1.0,
      Premium: 1.5,
      Luxury: 2.3,
    };
    const mult = budgetMult[budgetTier] || 1.0;
    const totalPassengers = Math.max(1, adults + childrenCount);
    const effectiveTravelers = Math.max(1, adults + childrenCount * 0.6);
    const roomsNeeded = Math.max(1, Math.ceil(adults / 2));

    // 1. Transportation
    const transportCost = selectedTransport
      ? selectedTransport.mode === 'Car' || selectedTransport.mode === 'Taxi'
        ? selectedTransport.approxFare
        : selectedTransport.approxFare * totalPassengers
      : Math.round(1800 * totalPassengers * mult);

    // 2. Hotel
    const nightlyRate = selectedHotel
      ? selectedHotel.pricePerNight
      : Math.round(selectedDestination.costs.hotelPerNight * mult);
    const hotelCost = nightlyRate * daysCount * roomsNeeded;

    // 3. Food
    const foodCost = Math.round(
      selectedDestination.costs.foodPerDay * daysCount * effectiveTravelers * mult
    );

    // 4. Attraction Tickets
    const ticketsCost =
      selectedTickets.length > 0
        ? selectedTickets.reduce((sum, tk) => sum + tk.totalPrice, 0)
        : Math.round(selectedDestination.costs.entryTicketAvg * totalPassengers * Math.min(daysCount, 3));

    // 5. Guide
    const guideCost = selectedGuide ? selectedGuide.totalPrice : 0;

    // 6. Local Transportation
    const localTransportCost = Math.round(
      selectedDestination.costs.localTransportPerDay * daysCount * mult
    );

    // 7. Other expenses
    const otherExpenses = customOtherExpenses;

    const totalCost =
      transportCost +
      hotelCost +
      foodCost +
      ticketsCost +
      guideCost +
      localTransportCost +
      otherExpenses;

    const costPerPerson = Math.round(totalCost / totalPassengers);
    const dailyAverage = Math.round(totalCost / Math.max(1, daysCount));

    return {
      transport: transportCost,
      hotel: hotelCost,
      food: foodCost,
      tickets: ticketsCost,
      guide: guideCost,
      localTransport: localTransportCost,
      otherExpenses,
      totalCost,
      costPerPerson,
      dailyAverage,
    };
  }, [
    selectedDestination,
    selectedHotel,
    selectedTransport,
    selectedTickets,
    selectedGuide,
    daysCount,
    adults,
    childrenCount,
    budgetTier,
    customOtherExpenses,
  ]);

  // Handlers
  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTripStartDate(heroTravelDate);
    setAdults(Math.max(1, heroTravelersCount));
    setBudgetTier(heroBudget);

    if (filteredDestinations.length > 0 && globalSearchQuery.trim()) {
      setSelectedDestinationId(filteredDestinations[0].id);
    }
    const el = document.getElementById('popular-destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleSaveDestination = (destId: string) => {
    const exists = currentUser.savedDestinationIds.includes(destId);
    const updatedIds = exists
      ? currentUser.savedDestinationIds.filter((id) => id !== destId)
      : [...currentUser.savedDestinationIds, destId];
    const updatedUser = { ...currentUser, savedDestinationIds: updatedIds };
    setCurrentUser(updatedUser);
    TravelDataStore.saveCurrentUser(updatedUser);
  };

  const handleToggleSaveHotel = (hotelId: string) => {
    const exists = currentUser.savedHotelIds.includes(hotelId);
    const updatedIds = exists
      ? currentUser.savedHotelIds.filter((id) => id !== hotelId)
      : [...currentUser.savedHotelIds, hotelId];
    const updatedUser = { ...currentUser, savedHotelIds: updatedIds };
    setCurrentUser(updatedUser);
    TravelDataStore.saveCurrentUser(updatedUser);
  };

  const handleQuickAddTicketFromModal = (dest: Destination, attr: AttractionItem) => {
    setSelectedDestinationId(dest.id);
    const total = attr.adultPrice * adults + attr.childPrice * childrenCount;
    const newTicket: TicketBookingSelection = {
      attractionId: attr.id,
      attractionName: attr.name,
      city: dest.name,
      ticketType: `${attr.category} Entry Pass`,
      date: tripStartDate,
      adults,
      children: childrenCount,
      adultPrice: attr.adultPrice,
      childPrice: attr.childPrice,
      totalPrice: total,
    };
    setSelectedTickets((prev) => [
      ...prev.filter((x) => x.attractionId !== attr.id),
      newTicket,
    ]);
  };

  const handleAddTicketSelection = (ticket: TicketBookingSelection) => {
    setSelectedTickets((prev) => [
      ...prev.filter((x) => x.attractionId !== ticket.attractionId),
      ticket,
    ]);
  };

  const handleConfirmDemoBooking = (): CompletedBooking => {
    const bookingId = `ITP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: CompletedBooking = {
      bookingId,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Confirmed (Demo)',
      userId: currentUser.id,
      userName: currentUser.name,
      destinationName: selectedDestination.name,
      destinationId: selectedDestination.id,
      startDate: tripStartDate,
      endDate: tripEndDate,
      daysCount,
      adults,
      children: childrenCount,
      travelType,
      budget: budgetTier,
      selectedHotel: selectedHotel
        ? {
            hotel: selectedHotel,
            nights: daysCount,
            rooms: Math.max(1, Math.ceil(adults / 2)),
            totalHotelCost: costBreakdown.hotel,
          }
        : undefined,
      selectedTransport: selectedTransport
        ? {
            transport: selectedTransport,
            passengers: adults + childrenCount,
            totalTransportCost: costBreakdown.transport,
          }
        : undefined,
      selectedTickets,
      selectedGuide,
      costBreakdown,
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    TravelDataStore.saveBookings(updated);
    return newBooking;
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      {/* =========================================================
          TOP BAR CONTRACT (Strict 1-row, 3-zone header)
         ========================================================= */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E7E2DA] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917] whitespace-nowrap"
        >
          {t.brandName}
        </a>

        {/* Zone 2: 5 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#57534E]">
          <a
            href="#popular-destinations"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            {t.navExplore}
          </a>
          <a
            href="#trip-planner"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            {t.navPlanner}
          </a>
          <a
            href="#hotels-section"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            {t.navHotelsTransport}
          </a>
          <a
            href="#tickets-section"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            {t.navTicketsGuides}
          </a>
          <a
            href="#my-trips-section"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            {t.navMyTrips}
          </a>
        </nav>

        {/* Zone 3: 2 Primary Actions (Language Toggle + Admin Console) */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="px-3 py-1.5 text-xs font-semibold border border-[#E7E2DA] bg-white hover:bg-[#F3EFEA] text-[#1C1917] rounded-lg transition-colors whitespace-nowrap"
          >
            {language === 'en' ? 'తెలుగు · TE' : 'English · EN'}
          </button>

          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold bg-[#1C1917] hover:bg-[#B45309] text-white rounded-lg transition-colors whitespace-nowrap"
          >
            {t.navAdmin}
          </button>
        </div>
      </header>

      {/* =========================================================
          HERO SECTION + SEARCH BAR
         ========================================================= */}
      <section id="top" className="relative overflow-hidden">
        <div className="relative min-h-[540px] lg:min-h-[600px] w-full flex items-center justify-center">
          {/* Background Image */}
          <img
            src={IMAGE_ASSETS.hero}
            alt="Iconic Indian Palace and Lake at Golden Hour"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center text-white space-y-6 w-full">
            <p className="text-xs sm:text-sm tracking-wide text-white/85">
              22 Indian Destinations · Day-by-Day Itinerary Engine · Live Cost Calculator in ₹ · Bilingual EN / తెలుగు
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
              {t.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleHeroSearchSubmit}
              className="mt-8 bg-white/95 backdrop-blur-md text-[#1C1917] p-3 sm:p-4 rounded-xl border border-[#E7E2DA] shadow-2xl max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 text-left"
            >
              {/* 1. Destination / Global Search */}
              <div className="lg:col-span-4">
                <label className="block text-[11px] font-semibold text-[#57534E] mb-1">
                  {t.searchDestination}
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={globalSearchQuery}
                    onChange={(e) => setGlobalSearchQuery(e.target.value)}
                    placeholder={t.globalSearchPlaceholder}
                    list="india-destinations-datalist"
                    className="w-full pl-9 pr-7 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                  />
                  {globalSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setGlobalSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#57534E] hover:text-[#1C1917]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <datalist id="india-destinations-datalist">
                    {destinations.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.state} — {d.tagline}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>

              {/* 2. Travel Date */}
              <div className="lg:col-span-3">
                <label className="block text-[11px] font-semibold text-[#57534E] mb-1">
                  {t.searchDate}
                </label>
                <input
                  type="date"
                  value={heroTravelDate}
                  onChange={(e) => setHeroTravelDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                />
              </div>

              {/* 3. Travelers */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-semibold text-[#57534E] mb-1">
                  {t.searchTravelers}
                </label>
                <select
                  value={heroTravelersCount}
                  onChange={(e) => setHeroTravelersCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                >
                  <option value={1}>1 Traveler (Solo)</option>
                  <option value={2}>2 Travelers (Couple)</option>
                  <option value={4}>4 Travelers (Family)</option>
                  <option value={6}>6 Travelers (Group)</option>
                </select>
              </div>

              {/* 4. Budget */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-semibold text-[#57534E] mb-1">
                  {t.searchBudget}
                </label>
                <select
                  value={heroBudget}
                  onChange={(e) => setHeroBudget(e.target.value as BudgetTier)}
                  className="w-full px-2.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                >
                  <option value="Budget">Budget (₹)</option>
                  <option value="Standard">Standard (₹₹)</option>
                  <option value="Premium">Premium (₹₹₹)</option>
                  <option value="Luxury">Luxury (₹₹₹₹)</option>
                </select>
              </div>

              {/* 5. Search Button */}
              <div className="lg:col-span-1 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 bg-[#B45309] hover:bg-[#92400E] text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  {t.searchButton}
                </button>
              </div>
            </form>

            {/* Instant Global Search Cross-Entity Results Drawer */}
            {globalCrossMatches && (
              <div className="max-w-5xl mx-auto bg-white text-[#1C1917] rounded-xl border border-[#E7E2DA] p-4 text-left shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-2 text-xs">
                  <span className="font-semibold">
                    Global Search Matches for "{globalSearchQuery}"
                  </span>
                  <span className="text-[#57534E] font-mono">
                    {filteredDestinations.length} Cities · {globalCrossMatches.attractions.length} Attractions · {globalCrossMatches.hotels.length} Hotels · {globalCrossMatches.guides.length} Guides
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-[#B45309] block mb-1">
                      Attractions & Activities ({globalCrossMatches.attractions.length})
                    </span>
                    {globalCrossMatches.attractions.slice(0, 3).map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setModalDestination(a.dest)}
                        className="block w-full text-left py-1 hover:underline text-[#1C1917] truncate"
                      >
                        {a.name} ({a.city}) — {formatINR(a.adultPrice)}
                      </button>
                    ))}
                  </div>

                  <div>
                    <span className="font-semibold text-[#0F766E] block mb-1">
                      Matching Hotels ({globalCrossMatches.hotels.length})
                    </span>
                    {globalCrossMatches.hotels.slice(0, 3).map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => {
                          setSelectedHotel(h);
                          scrollToSection('hotels-section');
                        }}
                        className="block w-full text-left py-1 hover:underline text-[#1C1917] truncate"
                      >
                        {h.name} ({h.city}) — {formatINR(h.pricePerNight)}/night
                      </button>
                    ))}
                  </div>

                  <div>
                    <span className="font-semibold text-[#1C1917] block mb-1">
                      Matching Local Guides ({globalCrossMatches.guides.length})
                    </span>
                    {globalCrossMatches.guides.slice(0, 3).map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => scrollToSection('guides-section')}
                        className="block w-full text-left py-1 hover:underline text-[#1C1917] truncate"
                      >
                        {g.name} ({g.city}) — {formatINR(g.hourlyPrice)}/hr
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 1: CATEGORIES & POPULAR DESTINATIONS (22 Cities)
         ========================================================= */}
      <main className="flex-1">
        <section id="popular-destinations" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#B45309] mb-1">
                01 · All-India Destination Discovery ({destinations.length} Tourist Places)
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
                {t.popularDestinations}
              </h2>
              <p className="text-sm text-[#57534E] mt-1">
                {t.popularDestinationsSub}
              </p>
            </div>

            {/* Active Trip Summary Pill */}
            <div className="bg-white border border-[#E7E2DA] rounded-lg px-4 py-2.5 flex items-center gap-4 text-xs">
              <div>
                <span className="text-[#57534E] block">Active Trip Estimate ({selectedDestination.name})</span>
                <span className="font-mono font-bold text-sm text-[#B45309]">
                  {formatINR(costBreakdown.totalCost)} ({daysCount} Days, {adults + childrenCount} Pax)
                </span>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('booking-summary')}
                className="px-3 py-1.5 bg-[#1C1917] text-white font-semibold rounded-md hover:bg-[#B45309] transition-colors whitespace-nowrap"
              >
                Review Trip →
              </button>
            </div>
          </div>

          {/* Categories Segmented Filter Bar */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#57534E] block">
              {t.categoriesTitle}
            </span>
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#E7E2DA] rounded-xl">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1C1917] text-white shadow-xs'
                        : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {language === 'te' ? CATEGORY_LABELS_TE[cat] || cat : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length === 0 ? (
            <div className="bg-white border border-[#E7E2DA] rounded-xl p-10 text-center space-y-3">
              <p className="text-base font-medium text-[#1C1917]">
                No Indian destinations found matching "{globalSearchQuery}" in {selectedCategory}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setGlobalSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#B45309] text-white rounded-lg"
              >
                Show All {destinations.length} Destinations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest) => {
                const isSaved = currentUser.savedDestinationIds.includes(dest.id);
                const isSelectedForTrip = dest.id === selectedDestinationId;
                const dailyStartingEstimate =
                  dest.costs.hotelPerNight +
                  dest.costs.foodPerDay +
                  dest.costs.localTransportPerDay;

                return (
                  <article
                    key={dest.id}
                    className={`bg-white border rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 ${
                      isSelectedForTrip
                        ? 'border-[#B45309] ring-1 ring-[#B45309]'
                        : 'border-[#E7E2DA]'
                    }`}
                  >
                    <div>
                      {/* Image Container */}
                      <div
                        onClick={() => setModalDestination(dest)}
                        className="relative h-52 w-full bg-[#1C1917] cursor-pointer overflow-hidden group"
                      >
                        <ResilientImage
                          imageKey={dest.imageKey}
                          alt={dest.name}
                          cropPosition={dest.imageCropPosition}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSaveDestination(dest.id);
                          }}
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                          aria-label={`Save ${dest.name}`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isSaved ? 'fill-[#F59E0B] text-[#F59E0B]' : ''
                            }`}
                          />
                        </button>

                        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white">
                          <div>
                            <span className="text-[11px] text-white/85 block">
                              {language === 'te' ? dest.stateTe : dest.state} · {dest.recommendedDays} Days
                            </span>
                            <h3 className="font-display text-2xl font-bold leading-tight">
                              {dest.name}{' '}
                              <span className="text-sm font-normal text-white/85">
                                ({dest.nameTe})
                              </span>
                            </h3>
                          </div>

                          <div className="flex items-center gap-1 text-xs font-mono bg-black/60 px-2 py-1 rounded">
                            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                            <span>{dest.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Body (Zero-Pill Unboxed Metadata) */}
                      <div className="p-5 space-y-2.5">
                        <div className="text-xs text-[#57534E]">
                          <span>{dest.categories.join(' · ')}</span>
                          <span className="mx-1.5">·</span>
                          <span>Best: {dest.bestTimeToVisit}</span>
                        </div>

                        <p className="font-medium text-sm text-[#1C1917]">
                          {language === 'te' ? dest.taglineTe : dest.tagline}
                        </p>

                        <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed">
                          {language === 'te' ? dest.descriptionTe : dest.description}
                        </p>

                        <div className="pt-1 text-xs text-[#44403C]">
                          <span className="font-semibold text-[#1C1917]">Top Sights:</span>{' '}
                          {dest.famousAttractions.map((a) => a.name.split(' ')[0] + ' ' + (a.name.split(' ')[1] || '')).join(' · ')}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 py-3.5 bg-[#FAF8F5] border-t border-[#E7E2DA] flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-[#57534E] block">
                          Est. Stay + Food / Day
                        </span>
                        <span className="font-mono text-base font-bold text-[#1C1917]">
                          {formatINR(dailyStartingEstimate)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setModalDestination(dest)}
                          className="px-3 py-2 text-xs font-medium bg-white hover:bg-[#F3EFEA] text-[#1C1917] border border-[#E7E2DA] rounded-lg transition-colors whitespace-nowrap"
                        >
                          {t.viewDetails}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDestinationId(dest.id);
                            setDaysCount(dest.recommendedDays);
                            setActiveServiceCityFilter(dest.id);
                            const cityHotel = hotels.find((h) => h.destinationId === dest.id);
                            if (cityHotel) setSelectedHotel(cityHotel);
                            scrollToSection('trip-planner');
                          }}
                          className="px-3.5 py-2 text-xs font-semibold bg-[#B45309] hover:bg-[#92400E] text-white rounded-lg transition-colors whitespace-nowrap"
                        >
                          {t.planTrip}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* =========================================================
            SECTION 2: TRIP PLANNER & DAY-BY-DAY ITINERARY GENERATOR
           ========================================================= */}
        <TripPlannerSection
          destinations={destinations}
          language={language}
          selectedDestinationId={selectedDestinationId}
          onSelectDestinationId={(id) => {
            setSelectedDestinationId(id);
            setActiveServiceCityFilter(id);
          }}
          onSaveItinerary={(itin) => {
            const updated = [itin, ...savedItineraries];
            setSavedItineraries(updated);
            TravelDataStore.saveItineraries(updated);
          }}
          onApplyToTripBuilder={(params) => {
            setSelectedDestinationId(params.destinationId);
            setTripStartDate(params.startDate);
            setTripEndDate(params.endDate);
            setDaysCount(calculateDaysBetween(params.startDate, params.endDate));
            setAdults(params.adults);
            setChildrenCount(params.children);
            setTravelType(params.travelType);
            setBudgetTier(params.budget);
            scrollToSection('cost-calculator');
          }}
        />

        {/* =========================================================
            SECTIONS 3–6: HOTELS, TRANSPORT, TICKETS & LOCAL GUIDES
           ========================================================= */}
        <ServicesMarketplaceSection
          destinations={destinations}
          hotels={hotels}
          transportOptions={transportOptions}
          guides={guides}
          language={language}
          activeDestinationFilter={activeServiceCityFilter}
          onChangeDestinationFilter={setActiveServiceCityFilter}
          savedHotelIds={currentUser.savedHotelIds}
          onToggleSaveHotel={handleToggleSaveHotel}
          selectedHotel={selectedHotel}
          onSelectHotelForTrip={(hotel) => {
            setSelectedHotel(hotel);
            setSelectedDestinationId(hotel.destinationId);
          }}
          selectedTransport={selectedTransport}
          onSelectTransportForTrip={(tr) => setSelectedTransport(tr)}
          selectedTickets={selectedTickets}
          onAddTicketSelection={handleAddTicketSelection}
          selectedGuide={selectedGuide}
          onSelectGuideForTrip={(gs) => {
            setSelectedGuide(gs);
            setSelectedDestinationId(gs.guide.destinationId);
          }}
        />

        {/* =========================================================
            SECTIONS 7–8: INTERACTIVE MAP & TRIP COST CALCULATOR
           ========================================================= */}
        <InteractiveMapAndCalculator
          destinations={destinations}
          hotels={hotels}
          language={language}
          selectedDestination={selectedDestination}
          onSelectDestination={(dest) => {
            setSelectedDestinationId(dest.id);
            setActiveServiceCityFilter(dest.id);
          }}
          onOpenDestinationModal={(dest) => setModalDestination(dest)}
          daysCount={daysCount}
          onChangeDaysCount={setDaysCount}
          adults={adults}
          onChangeAdults={setAdults}
          childrenCount={childrenCount}
          onChangeChildren={setChildrenCount}
          budgetTier={budgetTier}
          onChangeBudgetTier={setBudgetTier}
          selectedHotel={selectedHotel}
          selectedTransport={selectedTransport}
          selectedTickets={selectedTickets}
          selectedGuide={selectedGuide}
          customOtherExpenses={customOtherExpenses}
          onChangeCustomOtherExpenses={setCustomOtherExpenses}
          costBreakdown={costBreakdown}
          onScrollToBookingSummary={() => scrollToSection('booking-summary')}
        />

        {/* =========================================================
            SECTIONS 9–10: BOOKING SUMMARY, CHECKOUT & MY TRIPS
           ========================================================= */}
        <BookingSummaryAndTrips
          language={language}
          currentUser={currentUser}
          onUpdateUser={(u) => {
            setCurrentUser(u);
            TravelDataStore.saveCurrentUser(u);
          }}
          selectedDestination={selectedDestination}
          startDate={tripStartDate}
          endDate={tripEndDate}
          daysCount={daysCount}
          adults={adults}
          childrenCount={childrenCount}
          travelType={travelType}
          budgetTier={budgetTier}
          selectedHotel={selectedHotel}
          onClearHotel={() => setSelectedHotel(undefined)}
          selectedTransport={selectedTransport}
          onClearTransport={() => setSelectedTransport(undefined)}
          selectedTickets={selectedTickets}
          onRemoveTicket={(attrId) =>
            setSelectedTickets((prev) => prev.filter((x) => x.attractionId !== attrId))
          }
          selectedGuide={selectedGuide}
          onClearGuide={() => setSelectedGuide(undefined)}
          costBreakdown={costBreakdown}
          bookings={bookings}
          onConfirmDemoBooking={handleConfirmDemoBooking}
          savedDestinations={destinations.filter((d) =>
            currentUser.savedDestinationIds.includes(d.id)
          )}
          onToggleSaveDestination={handleToggleSaveDestination}
          onOpenDestination={(dest) => setModalDestination(dest)}
          savedHotels={hotels.filter((h) => currentUser.savedHotelIds.includes(h.id))}
          onToggleSaveHotel={handleToggleSaveHotel}
          onSelectHotel={(htl) => {
            setSelectedHotel(htl);
            setSelectedDestinationId(htl.destinationId);
          }}
          savedItineraries={savedItineraries}
          onDeleteItinerary={(id) => {
            const updated = savedItineraries.filter((x) => x.id !== id);
            setSavedItineraries(updated);
            TravelDataStore.saveItineraries(updated);
          }}
        />
      </main>

      {/* =========================================================
          QUIET FOOTER
         ========================================================= */}
      <footer className="bg-[#1C1917] text-[#FAF8F5] py-10 border-t border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-display text-xl font-bold text-white">
              India Trip Planner · భారత్ యాత్రా ప్లానర్
            </span>
            <p className="text-xs text-white/70 max-w-xl">
              {t.demoNotice}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-white/80">
            <a href="#popular-destinations" className="hover:text-white">Destinations (22)</a>
            <a href="#trip-planner" className="hover:text-white">Trip Planner</a>
            <a href="#hotels-section" className="hover:text-white">Hotels</a>
            <a href="#tickets-section" className="hover:text-white">Tickets</a>
            <a href="#guides-section" className="hover:text-white">Local Guides</a>
            <a href="#cost-calculator" className="hover:text-white">Cost Calculator</a>
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="text-[#F59E0B] hover:underline"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </footer>

      {/* =========================================================
          MODALS (Destination Details & Admin Console)
         ========================================================= */}
      <DestinationModal
        destination={modalDestination}
        language={language}
        isSaved={
          modalDestination
            ? currentUser.savedDestinationIds.includes(modalDestination.id)
            : false
        }
        onClose={() => setModalDestination(null)}
        onToggleSave={handleToggleSaveDestination}
        onPlanTripHere={(dest) => {
          setSelectedDestinationId(dest.id);
          setDaysCount(dest.recommendedDays);
          setActiveServiceCityFilter(dest.id);
          scrollToSection('trip-planner');
        }}
        onQuickAddTicket={handleQuickAddTicketFromModal}
        onBrowseHotelsHere={(destId) => {
          setActiveServiceCityFilter(destId);
          scrollToSection('hotels-section');
        }}
        onHireGuideHere={(destId) => {
          setActiveServiceCityFilter(destId);
          scrollToSection('guides-section');
        }}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        destinations={destinations}
        onUpdateDestinations={(items) => {
          setDestinations(items);
          TravelDataStore.saveDestinations(items);
        }}
        hotels={hotels}
        onUpdateHotels={(items) => {
          setHotels(items);
          TravelDataStore.saveHotels(items);
        }}
        transport={transportOptions}
        onUpdateTransport={(items) => {
          setTransportOptions(items);
          TravelDataStore.saveTransport(items);
        }}
        guides={guides}
        onUpdateGuides={(items) => {
          setGuides(items);
          TravelDataStore.saveGuides(items);
        }}
        bookings={bookings}
        onUpdateBookings={(items) => {
          setBookings(items);
          TravelDataStore.saveBookings(items);
        }}
        users={allUsers}
      />
    </div>
  );
}
