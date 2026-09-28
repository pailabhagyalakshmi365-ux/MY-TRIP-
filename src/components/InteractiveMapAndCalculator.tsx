import React, { useState } from 'react';
import {
  MapPin,
  Calculator,
  Hotel as HotelIcon,
  Utensils,
  Compass,
  Navigation,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import {
  Destination,
  Hotel,
  TransportOption,
  TicketBookingSelection,
  GuideBookingSelection,
  BudgetTier,
  Language,
} from '../types/travel';
import { formatINR } from '../utils/format';
import { UI_TEXT } from '../data/translations';

interface InteractiveMapAndCalculatorProps {
  destinations: Destination[];
  hotels: Hotel[];
  language: Language;
  selectedDestination: Destination;
  onSelectDestination: (dest: Destination) => void;
  onOpenDestinationModal: (dest: Destination) => void;
  daysCount: number;
  onChangeDaysCount: (days: number) => void;
  adults: number;
  onChangeAdults: (adults: number) => void;
  childrenCount: number;
  onChangeChildren: (children: number) => void;
  budgetTier: BudgetTier;
  onChangeBudgetTier: (tier: BudgetTier) => void;
  selectedHotel?: Hotel;
  selectedTransport?: TransportOption;
  selectedTickets: TicketBookingSelection[];
  selectedGuide?: GuideBookingSelection;
  customOtherExpenses: number;
  onChangeCustomOtherExpenses: (val: number) => void;
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
  onScrollToBookingSummary: () => void;
}

export const InteractiveMapAndCalculator: React.FC<InteractiveMapAndCalculatorProps> = ({
  destinations,
  hotels,
  language,
  selectedDestination,
  onSelectDestination,
  onOpenDestinationModal,
  daysCount,
  onChangeDaysCount,
  adults,
  onChangeAdults,
  childrenCount,
  onChangeChildren,
  budgetTier,
  onChangeBudgetTier,
  selectedHotel,
  selectedTransport,
  selectedTickets,
  selectedGuide,
  customOtherExpenses,
  onChangeCustomOtherExpenses,
  costBreakdown,
  onScrollToBookingSummary,
}) => {
  const t = UI_TEXT[language];
  const [mapMode, setMapMode] = useState<'india' | 'city'>('india');
  const [markerFilter, setMarkerFilter] = useState<'all' | 'attractions' | 'hotels' | 'restaurants' | 'nearby'>('all');
  const [activeMarkerInfo, setActiveMarkerInfo] = useState<{
    title: string;
    subtitle: string;
    meta: string;
  } | null>(null);

  const cityHotels = hotels.filter((h) => h.destinationId === selectedDestination.id);

  return (
    <div className="space-y-16">
      {/* =========================================================
          SECTION 7: INTERACTIVE MAP (All-India + City Explorer)
         ========================================================= */}
      <section id="map-section" className="pt-14 border-t border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#B45309] mb-1">
                07 · Interactive Geography & Local Markers
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
                {t.mapTitle}
              </h2>
              <p className="text-sm text-[#57534E] mt-1">
                {t.mapSub}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-white border border-[#E7E2DA] rounded-lg">
                <button
                  type="button"
                  onClick={() => setMapMode('india')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    mapMode === 'india'
                      ? 'bg-[#1C1917] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  All-India Map (22 Cities)
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode('city')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    mapMode === 'city'
                      ? 'bg-[#1C1917] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {selectedDestination.name} City Markers
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Map Canvas (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-[#E7E2DA] rounded-xl p-4 flex flex-col justify-between space-y-3">
              {/* Top Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E7E2DA]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1C1917]">
                    Active Focus: {selectedDestination.name} ({selectedDestination.state})
                  </span>
                  <span className="text-xs font-mono text-[#57534E]">
                    {selectedDestination.mapCoordinates.lat.toFixed(2)}°N, {selectedDestination.mapCoordinates.lng.toFixed(2)}°E
                  </span>
                </div>

                {mapMode === 'city' && (
                  <div className="flex flex-wrap items-center gap-1">
                    {(['all', 'attractions', 'hotels', 'restaurants', 'nearby'] as const).map((mf) => (
                      <button
                        key={mf}
                        type="button"
                        onClick={() => setMarkerFilter(mf)}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors capitalize ${
                          markerFilter === mf
                            ? 'bg-[#B45309] text-white'
                            : 'bg-[#FAF8F5] text-[#57534E] hover:text-[#1C1917]'
                        }`}
                      >
                        {mf}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Interactive Map Viewport */}
              {mapMode === 'india' ? (
                <div className="relative h-[420px] w-full bg-[#F3EFEA] rounded-lg border border-[#E7E2DA] overflow-hidden">
                  {/* Stylized India Silhouette & Lat/Long Grid */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="indiaGeoGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E2DBC8" strokeWidth="0.35" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#indiaGeoGrid)" />
                    {/* Stylized Subcontinent Polygon */}
                    <path
                      d="M 34 6 L 44 8 L 46 18 L 58 28 L 72 30 L 84 32 L 78 44 L 66 48 L 58 64 L 52 80 L 44 92 L 38 88 L 32 72 L 26 56 L 18 46 L 26 34 L 30 18 Z"
                      fill="#E7E0D0"
                      stroke="#C7BCA6"
                      strokeWidth="0.8"
                    />
                  </svg>

                  {/* All 22 Destination Pins */}
                  {destinations.map((dest) => {
                    const isSelected = dest.id === selectedDestination.id;
                    return (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => {
                          onSelectDestination(dest);
                          setActiveMarkerInfo({
                            title: `${dest.name} (${dest.state})`,
                            subtitle: dest.tagline,
                            meta: `Recommended: ${dest.recommendedDays} Days · Hotel avg: ${formatINR(dest.costs.hotelPerNight)}/night`,
                          });
                        }}
                        style={{
                          left: `${dest.mapCoordinates.indiaMapX}%`,
                          top: `${dest.mapCoordinates.indiaMapY}%`,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
                      >
                        <span
                          className={`flex items-center justify-center rounded-full shadow-md transition-transform ${
                            isSelected
                              ? 'w-7 h-7 bg-[#B45309] text-white scale-125 ring-4 ring-[#B45309]/25'
                              : 'w-5 h-5 bg-[#1C1917] text-white hover:scale-110 hover:bg-[#B45309]'
                          }`}
                        >
                          <MapPin className="w-3 h-3" />
                        </span>
                        <span
                          className={`mt-0.5 block px-1.5 py-0.5 rounded text-[10px] font-medium whitespace-nowrap shadow-sm ${
                            isSelected
                              ? 'bg-[#B45309] text-white font-semibold'
                              : 'bg-white/90 text-[#1C1917] border border-[#E7E2DA]'
                          }`}
                        >
                          {dest.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="relative h-[420px] w-full bg-[#F3EFEA] rounded-lg border border-[#E7E2DA] overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="cityZoomGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#E2DBC8" strokeWidth="0.4" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#cityZoomGrid)" />
                    <path d="M 0 60 Q 50 45 100 68" fill="none" stroke="#BAE6FD" strokeWidth="5" opacity="0.7" />
                    <path d="M 20 0 L 60 100 M 0 35 L 100 50 M 35 100 L 80 0" fill="none" stroke="#D6D0C4" strokeWidth="1.5" />
                  </svg>

                  {/* City Center Marker */}
                  <div
                    style={{ left: '50%', top: '50%' }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <div className="w-24 h-24 rounded-full border border-dashed border-[#B45309]/40 flex items-center justify-center">
                      <span className="px-2 py-0.5 bg-[#1C1917] text-white text-[10px] font-semibold rounded">
                        {selectedDestination.name} Center
                      </span>
                    </div>
                  </div>

                  {/* Attractions Markers */}
                  {(markerFilter === 'all' || markerFilter === 'attractions') &&
                    selectedDestination.famousAttractions.map((attr) => (
                      <button
                        key={attr.id}
                        type="button"
                        onClick={() =>
                          setActiveMarkerInfo({
                            title: attr.name,
                            subtitle: `${attr.category} · ${attr.openingHours}`,
                            meta: `Entry Ticket: Adult ${formatINR(attr.adultPrice)} · Child ${formatINR(attr.childPrice)}`,
                          })
                        }
                        style={{ left: `${attr.coordinates.x}%`, top: `${attr.coordinates.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#B45309] text-white shadow-md group-hover:scale-110 transition-transform">
                          <Compass className="w-3.5 h-3.5" />
                        </span>
                        <span className="mt-1 block px-1.5 py-0.5 bg-white border border-[#E7E2DA] rounded text-[10px] font-medium text-[#1C1917] whitespace-nowrap">
                          {attr.name.slice(0, 18)}
                        </span>
                      </button>
                    ))}

                  {/* Hotels Markers */}
                  {(markerFilter === 'all' || markerFilter === 'hotels') &&
                    cityHotels.map((htl) => (
                      <button
                        key={htl.id}
                        type="button"
                        onClick={() =>
                          setActiveMarkerInfo({
                            title: htl.name,
                            subtitle: `${htl.hotelType} · ${htl.location}`,
                            meta: `Estimated Price: ${formatINR(htl.pricePerNight)}/night · Rating ${htl.rating}/5`,
                          })
                        }
                        style={{ left: `${htl.coordinates.x}%`, top: `${htl.coordinates.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1D4ED8] text-white shadow-md group-hover:scale-110 transition-transform">
                          <HotelIcon className="w-3.5 h-3.5" />
                        </span>
                        <span className="mt-1 block px-1.5 py-0.5 bg-white border border-[#E7E2DA] rounded text-[10px] font-medium text-[#1C1917] whitespace-nowrap">
                          {htl.name.slice(0, 16)}
                        </span>
                      </button>
                    ))}

                  {/* Restaurants Markers */}
                  {(markerFilter === 'all' || markerFilter === 'restaurants') &&
                    selectedDestination.sampleRestaurants.map((rest, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setActiveMarkerInfo({
                            title: rest.name,
                            subtitle: `Cuisine: ${rest.cuisine}`,
                            meta: `Estimated Meal for Two: ${formatINR(rest.avgCostForTwo)}`,
                          })
                        }
                        style={{ left: `${rest.x}%`, top: `${rest.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0F766E] text-white shadow-md group-hover:scale-110 transition-transform">
                          <Utensils className="w-3 h-3" />
                        </span>
                        <span className="mt-1 block px-1.5 py-0.5 bg-white border border-[#E7E2DA] rounded text-[10px] font-medium text-[#1C1917] whitespace-nowrap">
                          {rest.name.slice(0, 16)}
                        </span>
                      </button>
                    ))}

                  {/* Nearby Places Markers */}
                  {(markerFilter === 'all' || markerFilter === 'nearby') &&
                    selectedDestination.nearbyPlaces.map((np, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setActiveMarkerInfo({
                            title: `${np.name} (Nearby Excursion)`,
                            subtitle: `Category: ${np.type}`,
                            meta: `Distance from ${selectedDestination.name}: ${np.distanceKm} km`,
                          })
                        }
                        style={{
                          left: `${15 + idx * 32}%`,
                          top: `${85 - idx * 10}%`,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#6D28D9] text-white shadow-md group-hover:scale-110 transition-transform">
                          <Navigation className="w-3 h-3" />
                        </span>
                        <span className="mt-1 block px-1.5 py-0.5 bg-white border border-[#E7E2DA] rounded text-[10px] font-medium text-[#1C1917] whitespace-nowrap">
                          {np.name.slice(0, 16)} ({np.distanceKm}km)
                        </span>
                      </button>
                    ))}
                </div>
              )}

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E] pt-1">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" /> Tourist Attractions
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" /> Hotels
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" /> Restaurants
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]" /> Nearby Places
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMapMode(mapMode === 'india' ? 'city' : 'india')}
                  className="text-xs font-semibold text-[#B45309] hover:underline"
                >
                  {mapMode === 'india'
                    ? `Zoom into ${selectedDestination.name} City Map →`
                    : '← Back to All-India Map'}
                </button>
              </div>
            </div>

            {/* Right: Selected Map Destination & Marker Inspector (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-[#E7E2DA] rounded-xl p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-[#57534E]">
                    {selectedDestination.state} · Best: {selectedDestination.bestTimeToVisit}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#1C1917]">
                    {selectedDestination.name} ({selectedDestination.nameTe})
                  </h3>
                  <p className="text-xs text-[#44403C] mt-1 leading-relaxed">
                    {selectedDestination.description}
                  </p>
                </div>

                {activeMarkerInfo && (
                  <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#B45309]/40 space-y-1">
                    <span className="text-[10px] font-semibold text-[#B45309] uppercase tracking-wider">
                      Selected Map Pin
                    </span>
                    <h4 className="font-semibold text-sm text-[#1C1917]">
                      {activeMarkerInfo.title}
                    </h4>
                    <p className="text-xs text-[#57534E]">{activeMarkerInfo.subtitle}</p>
                    <p className="text-xs font-mono font-medium text-[#1C1917] pt-0.5">
                      {activeMarkerInfo.meta}
                    </p>
                  </div>
                )}

                <div className="space-y-2 pt-2 border-t border-[#E7E2DA]">
                  <h4 className="text-xs font-semibold text-[#1C1917]">
                    Quick Switch City on Map:
                  </h4>
                  <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                    {destinations.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          onSelectDestination(d);
                          setMapMode('city');
                        }}
                        className={`px-2.5 py-1 text-xs rounded border transition-colors whitespace-nowrap ${
                          d.id === selectedDestination.id
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'bg-[#FAF8F5] text-[#44403C] border-[#E7E2DA] hover:bg-[#F3EFEA]'
                        }`}
                      >
                        {d.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#E7E2DA]">
                <button
                  type="button"
                  onClick={() => setMapMode('city')}
                  className="px-3 py-2.5 text-xs font-semibold bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#1C1917] border border-[#E7E2DA] rounded-lg transition-colors whitespace-nowrap"
                >
                  Inspect City Pins
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDestinationModal(selectedDestination)}
                  className="px-3 py-2.5 text-xs font-semibold bg-[#B45309] hover:bg-[#92400E] text-white rounded-lg transition-colors whitespace-nowrap"
                >
                  Full City Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 8: TRIP COST CALCULATOR (₹)
         ========================================================= */}
      <section id="cost-calculator" className="pt-14 border-t border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-[#B45309] mb-1">
              08 · Real-Time Indian Rupee (₹) Trip Budget Estimator
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
              {t.calculatorTitle}
            </h2>
            <p className="text-sm text-[#57534E] mt-1">
              {t.calculatorSub}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Calculator Controls (6 cols) */}
            <div className="lg:col-span-6 bg-white border border-[#E7E2DA] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-3">
                <h3 className="font-display text-xl font-bold text-[#1C1917]">
                  Adjust Parameters & Budget Tier
                </h3>
                <span className="text-xs text-[#57534E]">Recalculates Instantly</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1">
                    Destination City
                  </label>
                  <select
                    value={selectedDestination.id}
                    onChange={(e) => {
                      const found = destinations.find((d) => d.id === e.target.value);
                      if (found) onSelectDestination(found);
                    }}
                    className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1">
                    Trip Duration (Days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={14}
                    value={daysCount}
                    onChange={(e) => onChangeDaysCount(Math.max(1, Math.min(14, Number(e.target.value))))}
                    className="w-full px-3 py-2 text-sm font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1">
                    Number of Adults
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={adults}
                    onChange={(e) => onChangeAdults(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 text-sm font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1">
                    Number of Children
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={childrenCount}
                    onChange={(e) => onChangeChildren(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3 py-2 text-sm font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
              </div>

              {/* Instant Budget Tier Switcher */}
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                  Select Budget Style (Recalculates Hotel, Food & Transit Multipliers)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Budget', 'Standard', 'Premium', 'Luxury'] as BudgetTier[]).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => onChangeBudgetTier(tier)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                        budgetTier === tier
                          ? 'bg-[#B45309] text-white border-[#B45309]'
                          : 'bg-[#FAF8F5] text-[#44403C] border-[#E7E2DA] hover:bg-[#F3EFEA]'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shopping / Other Expenses Buffer Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-[#44403C]">
                    Shopping, Souvenirs & Miscellaneous Buffer
                  </span>
                  <span className="font-mono font-semibold text-[#1C1917]">
                    {formatINR(customOtherExpenses)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15000}
                  step={500}
                  value={customOtherExpenses}
                  onChange={(e) => onChangeCustomOtherExpenses(Number(e.target.value))}
                  className="w-full accent-[#B45309]"
                />
              </div>

              <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA] text-xs text-[#57534E] space-y-1">
                <p className="font-medium text-[#1C1917]">Active Selections Included:</p>
                <p>
                  Hotel: {selectedHotel ? `${selectedHotel.name} (${formatINR(selectedHotel.pricePerNight)}/night)` : `City Avg (${formatINR(selectedDestination.costs.hotelPerNight)}/night)`}
                </p>
                <p>
                  Transport: {selectedTransport ? `${selectedTransport.operatorName} (${selectedTransport.mode})` : 'Estimated Intercity Round-Trip'}
                </p>
                <p>
                  Attraction Tickets: {selectedTickets.length > 0 ? `${selectedTickets.length} booked pass(es)` : 'Destination standard entry estimate'}
                </p>
                <p>
                  Local Guide: {selectedGuide ? `${selectedGuide.guide.name} (${formatINR(selectedGuide.totalPrice)})` : 'Not selected (₹0)'}
                </p>
              </div>
            </div>

            {/* Right: Itemized Cost Formula Table & Totals (6 cols) */}
            <div className="lg:col-span-6 bg-white border border-[#E7E2DA] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#1C1917]">
                    Itemized Trip Cost Breakdown
                  </h3>
                  <p className="text-xs text-[#57534E]">
                    {selectedDestination.name} · {daysCount} Days · {adults + childrenCount} Traveler(s) · {budgetTier} Tier
                  </p>
                </div>
                <Calculator className="w-5 h-5 text-[#B45309]" />
              </div>

              <div className="divide-y divide-[#E7E2DA] text-sm">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#44403C]">1. Intercity Transportation</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    {formatINR(costBreakdown.transport)}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#44403C]">2. Hotel Accommodation ({daysCount} nights)</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    + {formatINR(costBreakdown.hotel)}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#44403C]">3. Food & Dining Estimate</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    + {formatINR(costBreakdown.food)}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#44403C]">4. Attraction & Monument Tickets</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    + {formatINR(costBreakdown.tickets)}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#44403C]">5. Local Guide Fee</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    + {formatINR(costBreakdown.guide)}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#44403C]">6. Local Transportation (Auto/Cab/Metro)</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    + {formatINR(costBreakdown.localTransport)}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#44403C]">7. Other Expenses & Souvenirs</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    + {formatINR(costBreakdown.otherExpenses)}
                  </span>
                </div>
              </div>

              {/* 3 Key Summary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t-2 border-[#1C1917]">
                <div className="bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg p-3.5">
                  <span className="text-xs text-[#57534E] block">Cost Per Person</span>
                  <span className="font-mono text-lg font-bold text-[#1C1917]">
                    {formatINR(costBreakdown.costPerPerson)}
                  </span>
                </div>
                <div className="bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg p-3.5">
                  <span className="text-xs text-[#57534E] block">Daily Average Cost</span>
                  <span className="font-mono text-lg font-bold text-[#1C1917]">
                    {formatINR(costBreakdown.dailyAverage)}
                  </span>
                </div>
                <div className="bg-[#1C1917] text-white rounded-lg p-3.5">
                  <span className="text-xs text-white/75 block">Total Estimated Cost</span>
                  <span className="font-mono text-xl font-bold text-[#F59E0B]">
                    {formatINR(costBreakdown.totalCost)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onScrollToBookingSummary}
                className="w-full py-3 px-4 bg-[#B45309] hover:bg-[#92400E] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Proceed to Booking Summary & Confirmation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
