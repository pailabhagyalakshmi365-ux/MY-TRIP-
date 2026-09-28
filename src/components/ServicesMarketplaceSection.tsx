import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Heart,
  Check,
  Plane,
  Train,
  Bus,
  Car,
  Ticket,
  UserCheck,
  Clock,
  Info,
  X,
  Coffee,
  Wifi,
} from 'lucide-react';
import {
  Destination,
  Hotel,
  TransportOption,
  LocalGuide,
  TicketBookingSelection,
  GuideBookingSelection,
  Language,
  TransportMode,
} from '../types/travel';
import { ResilientImage } from './ResilientImage';
import { formatINR } from '../utils/format';
import { UI_TEXT } from '../data/translations';

interface ServicesMarketplaceSectionProps {
  destinations: Destination[];
  hotels: Hotel[];
  transportOptions: TransportOption[];
  guides: LocalGuide[];
  language: Language;
  activeDestinationFilter: string;
  onChangeDestinationFilter: (destId: string) => void;
  savedHotelIds: string[];
  onToggleSaveHotel: (hotelId: string) => void;
  selectedHotel?: Hotel;
  onSelectHotelForTrip: (hotel: Hotel) => void;
  selectedTransport?: TransportOption;
  onSelectTransportForTrip: (transport: TransportOption) => void;
  selectedTickets: TicketBookingSelection[];
  onAddTicketSelection: (ticket: TicketBookingSelection) => void;
  selectedGuide?: GuideBookingSelection;
  onSelectGuideForTrip: (guideSelection: GuideBookingSelection) => void;
}

export const ServicesMarketplaceSection: React.FC<ServicesMarketplaceSectionProps> = ({
  destinations,
  hotels,
  transportOptions,
  guides,
  language,
  activeDestinationFilter,
  onChangeDestinationFilter,
  savedHotelIds,
  onToggleSaveHotel,
  selectedHotel,
  onSelectHotelForTrip,
  selectedTransport,
  onSelectTransportForTrip,
  selectedTickets,
  onAddTicketSelection,
  selectedGuide,
  onSelectGuideForTrip,
}) => {
  const t = UI_TEXT[language];

  // Hotel filters
  const [maxHotelPrice, setMaxHotelPrice] = useState<number>(10000);
  const [minHotelRating, setMinHotelRating] = useState<number>(4.0);
  const [hotelTypeFilter, setHotelTypeFilter] = useState<string>('All');
  const [amenityFilter, setAmenityFilter] = useState<string>('All');
  const [detailHotel, setDetailHotel] = useState<Hotel | null>(null);

  // Transport filters
  const [transportTab, setTransportTab] = useState<'All' | TransportMode>('All');

  // Ticket booking state
  const [ticketCategoryFilter, setTicketCategoryFilter] = useState<string>('All');
  const [ticketDate, setTicketDate] = useState<string>('2026-10-16');
  const [ticketQuantities, setTicketQuantities] = useState<
    Record<string, { adults: number; children: number }>
  >({});
  const [ticketBookedFlash, setTicketBookedFlash] = useState<string | null>(null);

  // Guide booking state
  const [guideLangFilter, setGuideLangFilter] = useState<string>('All');
  const [guideBookingMode, setGuideBookingMode] = useState<
    Record<string, { type: 'hourly' | 'daily'; units: number }>
  >({});

  // Filtered Hotels
  const filteredHotels = hotels.filter((h) => {
    if (activeDestinationFilter !== 'all' && h.destinationId !== activeDestinationFilter) {
      return false;
    }
    if (h.pricePerNight > maxHotelPrice) return false;
    if (h.rating < minHotelRating) return false;
    if (hotelTypeFilter !== 'All' && h.hotelType !== hotelTypeFilter) return false;
    if (amenityFilter !== 'All' && !h.amenities.includes(amenityFilter)) return false;
    return true;
  });

  // Filtered Transport
  const filteredTransport = transportOptions.filter((tr) => {
    if (transportTab !== 'All' && tr.mode !== transportTab) return false;
    return true;
  });

  // Flattened Attractions for Ticket Booking
  const allAttractions = destinations.flatMap((dest) =>
    dest.famousAttractions.map((attr) => ({
      ...attr,
      destinationId: dest.id,
      cityName: dest.name,
    }))
  );

  const filteredAttractions = allAttractions.filter((attr) => {
    if (activeDestinationFilter !== 'all' && attr.destinationId !== activeDestinationFilter) {
      return false;
    }
    if (ticketCategoryFilter !== 'All' && attr.category !== ticketCategoryFilter) {
      return false;
    }
    return true;
  });

  // Filtered Guides
  const filteredGuides = guides.filter((g) => {
    if (activeDestinationFilter !== 'all' && g.destinationId !== activeDestinationFilter) {
      return false;
    }
    if (guideLangFilter !== 'All' && !g.languages.includes(guideLangFilter)) {
      return false;
    }
    return true;
  });

  const getTicketQty = (attrId: string) =>
    ticketQuantities[attrId] || { adults: 2, children: 0 };

  const updateTicketQty = (attrId: string, field: 'adults' | 'children', val: number) => {
    const current = getTicketQty(attrId);
    setTicketQuantities({
      ...ticketQuantities,
      [attrId]: {
        ...current,
        [field]: Math.max(field === 'adults' ? 1 : 0, val),
      },
    });
  };

  const getGuideBookingConfig = (guideId: string) =>
    guideBookingMode[guideId] || { type: 'hourly', units: 4 };

  return (
    <div className="space-y-16">
      {/* =========================================================
          SECTION 3: HOTELS & STAYS
         ========================================================= */}
      <section id="hotels-section" className="pt-14 border-t border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#B45309] mb-1">
                03 · Accommodations & Stays (Estimated Prices · Demo Mode)
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
                {t.hotelsTitle}
              </h2>
              <p className="text-sm text-[#57534E] mt-1">
                {t.hotelsSub}
              </p>
            </div>

            {/* Destination Selector Pill */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-[#57534E] whitespace-nowrap">
                Filter City:
              </label>
              <select
                value={activeDestinationFilter}
                onChange={(e) => onChangeDestinationFilter(e.target.value)}
                className="px-3 py-2 text-xs font-medium bg-white border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
              >
                <option value="all">All Indian Cities ({hotels.length} Stays)</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hotel Filter Bar */}
          <div className="bg-white border border-[#E7E2DA] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-[#44403C]">Max Price / Night</span>
                <span className="font-mono font-semibold text-[#B45309]">
                  {formatINR(maxHotelPrice)}
                </span>
              </div>
              <input
                type="range"
                min={1500}
                max={10000}
                step={200}
                value={maxHotelPrice}
                onChange={(e) => setMaxHotelPrice(Number(e.target.value))}
                className="w-full accent-[#B45309]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#44403C] mb-1">
                Minimum Rating
              </label>
              <select
                value={minHotelRating}
                onChange={(e) => setMinHotelRating(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
              >
                <option value={4.0}>4.0+ Very Good</option>
                <option value={4.5}>4.5+ Excellent</option>
                <option value={4.8}>4.8+ Top Rated</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#44403C] mb-1">
                Hotel Type
              </label>
              <select
                value={hotelTypeFilter}
                onChange={(e) => setHotelTypeFilter(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
              >
                <option value="All">All Property Types</option>
                <option value="Heritage Palace">Heritage Palace</option>
                <option value="Luxury Hotel">Luxury Hotel</option>
                <option value="Boutique Stay">Boutique Stay</option>
                <option value="Budget Resort">Budget Resort</option>
                <option value="Homestay">Homestay</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#44403C] mb-1">
                Amenity
              </label>
              <select
                value={amenityFilter}
                onChange={(e) => setAmenityFilter(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
              >
                <option value="All">Any Amenity</option>
                <option value="Free WiFi">Free WiFi</option>
                <option value="Swimming Pool">Swimming Pool</option>
                <option value="Sea View">Sea View</option>
                <option value="Temple Shuttle">Temple Shuttle</option>
                <option value="Pure Veg Restaurant">Pure Veg Restaurant</option>
                <option value="Spa">Spa</option>
              </select>
            </div>
          </div>

          {/* Hotels Grid */}
          {filteredHotels.length === 0 ? (
            <div className="bg-white border border-[#E7E2DA] rounded-xl p-8 text-center space-y-2">
              <p className="text-sm font-medium text-[#1C1917]">
                No hotels match your current filter combination.
              </p>
              <button
                onClick={() => {
                  onChangeDestinationFilter('all');
                  setMaxHotelPrice(10000);
                  setMinHotelRating(4.0);
                  setHotelTypeFilter('All');
                  setAmenityFilter('All');
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#1C1917] text-white rounded-lg"
              >
                Reset Hotel Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => {
                const isSelected = selectedHotel?.id === hotel.id;
                const isSaved = savedHotelIds.includes(hotel.id);
                return (
                  <div
                    key={hotel.id}
                    className={`bg-white border rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 ${
                      isSelected ? 'border-[#0F766E] ring-1 ring-[#0F766E]' : 'border-[#E7E2DA]'
                    }`}
                  >
                    <div>
                      <div className="relative h-48 w-full bg-[#1C1917]">
                        <ResilientImage
                          imageKey={hotel.imageKey}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <button
                          onClick={() => onToggleSaveHotel(hotel.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                          aria-label="Save hotel"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#F59E0B] text-[#F59E0B]' : ''}`} />
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                          <span className="text-xs text-white/90">
                            {hotel.city} · {hotel.hotelType}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-mono bg-black/60 px-2 py-0.5 rounded">
                            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                            {hotel.rating} ({hotel.reviewCount})
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2.5">
                        <div className="text-xs text-[#57534E]">
                          <span>{hotel.location}</span>
                          <span className="mx-1.5">·</span>
                          <span>{hotel.distanceFromCenterKm} km from center</span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-[#1C1917]">
                          {hotel.name}
                        </h3>

                        <p className="text-xs text-[#44403C]">
                          Room: <span className="font-medium text-[#1C1917]">{hotel.roomType}</span> ·{' '}
                          {hotel.breakfastIncluded ? 'Complimentary Breakfast Included' : 'Room Only'}
                        </p>

                        <p className="text-xs text-[#57534E]">
                          Near: {hotel.nearestAttraction}
                        </p>

                        <p className="text-xs text-[#57534E] pt-1">
                          Amenities: {hotel.amenities.join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-4 bg-[#FAF8F5] border-t border-[#E7E2DA] flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-[#57534E] block">
                          Estimated price / night (Demo)
                        </span>
                        <span className="font-mono text-lg font-bold text-[#1C1917]">
                          {formatINR(hotel.pricePerNight)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setDetailHotel(hotel)}
                          className="px-3 py-2 text-xs font-medium text-[#1C1917] bg-white border border-[#E7E2DA] rounded-lg hover:bg-[#F3EFEA] transition-colors whitespace-nowrap"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectHotelForTrip(hotel)}
                          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 ${
                            isSelected
                              ? 'bg-[#0F766E] text-white'
                              : 'bg-[#B45309] hover:bg-[#92400E] text-white'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Selected</span>
                            </>
                          ) : (
                            <span>Book Now (Demo)</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Hotel Details Modal */}
      {detailHotel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-[#E7E2DA] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#57534E]">
                  {detailHotel.city} · {detailHotel.hotelType} · Rating {detailHotel.rating}/5
                </p>
                <h3 className="font-display text-2xl font-bold text-[#1C1917]">
                  {detailHotel.name}
                </h3>
              </div>
              <button
                onClick={() => setDetailHotel(null)}
                className="p-1.5 rounded-lg border border-[#E7E2DA] text-[#57534E] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-48 rounded-lg overflow-hidden">
              <ResilientImage
                imageKey={detailHotel.imageKey}
                alt={detailHotel.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 text-xs text-[#44403C]">
              <p><strong className="text-[#1C1917]">Address:</strong> {detailHotel.location}</p>
              <p><strong className="text-[#1C1917]">Room Category:</strong> {detailHotel.roomType}</p>
              <p><strong className="text-[#1C1917]">Landmark Distance:</strong> {detailHotel.nearestAttraction} ({detailHotel.distanceFromCenterKm} km from city center)</p>
              <p><strong className="text-[#1C1917]">Breakfast:</strong> {detailHotel.breakfastIncluded ? 'Complimentary Indian & Continental Buffet' : 'Available at ₹350/person'}</p>
              <p><strong className="text-[#1C1917]">Amenities:</strong> {detailHotel.amenities.join(' · ')}</p>
              <p className="text-[#B45309] pt-1">
                Note: Estimated price ({formatINR(detailHotel.pricePerNight)}/night) uses structured demo data. Selecting adds this hotel to your Trip Cost Calculator & Demo Booking Summary.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E2DA]">
              <button
                onClick={() => setDetailHotel(null)}
                className="px-4 py-2 text-xs font-medium border border-[#E7E2DA] rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onSelectHotelForTrip(detailHotel);
                  setDetailHotel(null);
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#B45309] text-white rounded-lg"
              >
                Select Hotel for Trip ({formatINR(detailHotel.pricePerNight)}/night)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SECTION 4: TRAVEL TRANSPORT (Flights, Trains, Buses, Cars, Taxis)
         ========================================================= */}
      <section id="transport-section" className="pt-14 border-t border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#B45309] mb-1">
                04 · Flights, Vande Bharat Trains, Buses & Chauffeur Cabs
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
                {t.transportTitle}
              </h2>
              <p className="text-sm text-[#57534E] mt-1">
                {t.transportSub}
              </p>
            </div>

            {/* Mode Segmented Control */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-[#E7E2DA] rounded-lg">
              {(['All', 'Flight', 'Train', 'Bus', 'Car', 'Taxi'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTransportTab(mode)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    transportTab === mode
                      ? 'bg-[#1C1917] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {mode === 'All' ? 'All Modes' : mode === 'Car' ? 'Rental Cars' : mode === 'Taxi' ? 'Local Taxis' : `${mode}s`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTransport.map((tr) => {
              const isSelected = selectedTransport?.id === tr.id;
              return (
                <div
                  key={tr.id}
                  className={`bg-white border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected ? 'border-[#0F766E] ring-1 ring-[#0F766E]' : 'border-[#E7E2DA]'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="text-xs text-[#57534E]">
                      <span className="font-semibold text-[#B45309]">{tr.mode}</span>
                      <span className="mx-1.5">·</span>
                      <span>{tr.operatorName}</span>
                      <span className="mx-1.5">·</span>
                      <span className="font-mono">{tr.serviceNumber}</span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div>
                        <span className="font-mono text-sm font-bold text-[#1C1917] block">
                          {tr.departureTime}
                        </span>
                        <span className="text-xs text-[#44403C]">{tr.fromCity}</span>
                      </div>
                      <div className="text-xs font-mono text-[#57534E] px-2 border-b border-dashed border-[#D6D0C4]">
                        {tr.duration}
                      </div>
                      <div>
                        <span className="font-mono text-sm font-bold text-[#1C1917] block">
                          {tr.arrivalTime}
                        </span>
                        <span className="text-xs text-[#44403C]">{tr.toCity}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#57534E]">
                      Class / Vehicle: {tr.classType}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E7E2DA] shrink-0">
                    <div className="sm:text-right">
                      <span className="text-[11px] text-[#57534E] block">Approx. Fare</span>
                      <span className="font-mono text-lg font-bold text-[#1C1917]">
                        {formatINR(tr.approxFare)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectTransportForTrip(tr)}
                      className={`mt-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#0F766E] text-white'
                          : 'bg-[#1C1917] hover:bg-[#B45309] text-white'
                      }`}
                    >
                      {isSelected ? 'Selected for Trip' : 'Book Transport'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: ATTRACTION & MONUMENT TICKET BOOKING
         ========================================================= */}
      <section id="tickets-section" className="pt-14 border-t border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#B45309] mb-1">
                05 · Entry Passes & Experiences (Demo Booking Flow)
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
                {t.ticketsTitle}
              </h2>
              <p className="text-sm text-[#57534E] mt-1">
                {t.ticketsSub}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                type="date"
                value={ticketDate}
                onChange={(e) => setTicketDate(e.target.value)}
                className="px-3 py-1.5 text-xs font-mono bg-white border border-[#E7E2DA] rounded-lg"
                aria-label="Ticket visit date"
              />
              <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-[#E7E2DA] rounded-lg">
                {(['All', 'Monument', 'Temple', 'Museum', 'Park', 'Adventure', 'Event'] as const).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setTicketCategoryFilter(cat)}
                      className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                        ticketCategoryFilter === cat
                          ? 'bg-[#1C1917] text-white'
                          : 'text-[#57534E] hover:text-[#1C1917]'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAttractions.slice(0, 12).map((attr) => {
              const qty = getTicketQty(attr.id);
              const totalTicketPrice =
                attr.adultPrice * qty.adults + attr.childPrice * qty.children;
              const isAddedInTrip = selectedTickets.some((st) => st.attractionId === attr.id);
              const isFlashing = ticketBookedFlash === attr.id;

              return (
                <div
                  key={attr.id}
                  className="bg-white border border-[#E7E2DA] rounded-xl p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="text-xs text-[#57534E]">
                      <span className="font-semibold text-[#B45309]">{attr.cityName}</span>
                      <span className="mx-1.5">·</span>
                      <span>{attr.category}</span>
                      <span className="mx-1.5">·</span>
                      <span>{attr.duration}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#1C1917]">
                      {attr.name}
                    </h3>

                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {attr.description}
                    </p>

                    <p className="text-xs text-[#44403C] font-mono pt-1">
                      Hours: {attr.openingHours}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E7E2DA] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span>
                        Adult: <strong className="font-mono">{formatINR(attr.adultPrice)}</strong> · Child:{' '}
                        <strong className="font-mono">{formatINR(attr.childPrice)}</strong>
                      </span>
                      <span className="font-mono text-[#57534E]">{ticketDate}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between bg-[#FAF8F5] px-2.5 py-1.5 rounded border border-[#E7E2DA]">
                        <span>Adults</span>
                        <div className="flex items-center gap-2 font-mono">
                          <button
                            type="button"
                            onClick={() => updateTicketQty(attr.id, 'adults', qty.adults - 1)}
                            className="w-5 h-5 rounded bg-white border border-[#E7E2DA] flex items-center justify-center"
                          >
                            -
                          </button>
                          <span>{qty.adults}</span>
                          <button
                            type="button"
                            onClick={() => updateTicketQty(attr.id, 'adults', qty.adults + 1)}
                            className="w-5 h-5 rounded bg-white border border-[#E7E2DA] flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-[#FAF8F5] px-2.5 py-1.5 rounded border border-[#E7E2DA]">
                        <span>Children</span>
                        <div className="flex items-center gap-2 font-mono">
                          <button
                            type="button"
                            onClick={() => updateTicketQty(attr.id, 'children', qty.children - 1)}
                            className="w-5 h-5 rounded bg-white border border-[#E7E2DA] flex items-center justify-center"
                          >
                            -
                          </button>
                          <span>{qty.children}</span>
                          <button
                            type="button"
                            onClick={() => updateTicketQty(attr.id, 'children', qty.children + 1)}
                            className="w-5 h-5 rounded bg-white border border-[#E7E2DA] flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[11px] text-[#57534E] block">Total Ticket Price</span>
                        <span className="font-mono text-base font-bold text-[#1C1917]">
                          {formatINR(totalTicketPrice)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onAddTicketSelection({
                            attractionId: attr.id,
                            attractionName: attr.name,
                            city: attr.cityName,
                            ticketType: `${attr.category} Entry Pass`,
                            date: ticketDate,
                            adults: qty.adults,
                            children: qty.children,
                            adultPrice: attr.adultPrice,
                            childPrice: attr.childPrice,
                            totalPrice: totalTicketPrice,
                          });
                          setTicketBookedFlash(attr.id);
                          setTimeout(() => setTicketBookedFlash(null), 1800);
                        }}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                          isFlashing || isAddedInTrip
                            ? 'bg-[#0F766E] text-white'
                            : 'bg-[#B45309] hover:bg-[#92400E] text-white'
                        }`}
                      >
                        {isFlashing
                          ? 'Demo Ticket Added!'
                          : isAddedInTrip
                            ? 'Update Ticket in Trip'
                            : 'Book Ticket (Demo)'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6: HIRE A LOCAL GUIDE
         ========================================================= */}
      <section id="guides-section" className="pt-14 border-t border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#B45309] mb-1">
                06 · Regional Heritage Storytellers (Demo Guide Profiles)
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
                {t.guidesTitle}
              </h2>
              <p className="text-sm text-[#57534E] mt-1">
                {t.guidesSub}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-[#57534E]">Language:</label>
              <select
                value={guideLangFilter}
                onChange={(e) => setGuideLangFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-[#E7E2DA] rounded-lg"
              >
                <option value="All">All Languages</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Kannada">Kannada</option>
                <option value="Malayalam">Malayalam</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredGuides.map((guide) => {
              const cfg = getGuideBookingConfig(guide.id);
              const totalGuideCost =
                cfg.type === 'hourly'
                  ? guide.hourlyPrice * cfg.units
                  : guide.dailyPrice * cfg.units;
              const isSelected = selectedGuide?.guide.id === guide.id;

              return (
                <div
                  key={guide.id}
                  className={`bg-white border rounded-xl p-5 flex flex-col justify-between gap-4 ${
                    isSelected ? 'border-[#0F766E] ring-1 ring-[#0F766E]' : 'border-[#E7E2DA]'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-[#57534E]">
                      <span className="font-semibold text-[#B45309]">{guide.city}</span>
                      <span className="inline-flex items-center gap-1 font-mono text-[#1C1917]">
                        <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                        {guide.rating}/5 ({guide.reviewsCount})
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-[#1C1917]">
                        {guide.name}
                      </h3>
                      <p className="text-[11px] text-[#0F766E] font-medium">
                        {guide.verifiedBadge} · {guide.availability}
                      </p>
                    </div>

                    <div className="text-xs text-[#44403C] space-y-1 pt-1">
                      <p>
                        <strong className="text-[#1C1917]">Languages:</strong>{' '}
                        {guide.languages.join(', ')}
                      </p>
                      <p>
                        <strong className="text-[#1C1917]">Experience:</strong>{' '}
                        <span className="font-mono">{guide.experienceYears} years</span>
                      </p>
                      <p>
                        <strong className="text-[#1C1917]">Specialization:</strong>{' '}
                        {guide.specialization.join(' · ')}
                      </p>
                    </div>

                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {guide.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E7E2DA] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>{formatINR(guide.hourlyPrice)}/hour</span>
                      <span>·</span>
                      <span>{formatINR(guide.dailyPrice)}/day</span>
                    </div>

                    {/* Duration Selector */}
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      <button
                        type="button"
                        onClick={() =>
                          setGuideBookingMode({
                            ...guideBookingMode,
                            [guide.id]: { type: 'hourly', units: 4 },
                          })
                        }
                        className={`py-1.5 rounded border font-mono ${
                          cfg.type === 'hourly'
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'bg-[#FAF8F5] text-[#44403C] border-[#E7E2DA]'
                        }`}
                      >
                        4 Hours ({formatINR(guide.hourlyPrice * 4)})
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setGuideBookingMode({
                            ...guideBookingMode,
                            [guide.id]: { type: 'daily', units: 1 },
                          })
                        }
                        className={`py-1.5 rounded border font-mono ${
                          cfg.type === 'daily'
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'bg-[#FAF8F5] text-[#44403C] border-[#E7E2DA]'
                        }`}
                      >
                        Full Day ({formatINR(guide.dailyPrice)})
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onSelectGuideForTrip({
                          guide,
                          bookingType: cfg.type,
                          units: cfg.units,
                          date: ticketDate,
                          totalPrice: totalGuideCost,
                        })
                      }
                      className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#0F766E] text-white'
                          : 'bg-[#B45309] hover:bg-[#92400E] text-white'
                      }`}
                    >
                      {isSelected
                        ? `Guide Hired (${formatINR(totalGuideCost)})`
                        : `Hire Guide · ${formatINR(totalGuideCost)}`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
