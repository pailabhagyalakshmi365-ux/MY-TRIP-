import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Check,
  Bookmark,
  ArrowRight,
  Clock,
  Utensils,
  Hotel as HotelIcon,
  Compass,
  AlertCircle,
} from 'lucide-react';
import {
  Destination,
  BudgetTier,
  TravelType,
  TransportMode,
  GeneratedItinerary,
  Language,
} from '../types/travel';
import { generateDayByDayItinerary } from '../data/servicesData';
import { formatINR, calculateDaysBetween } from '../utils/format';
import { UI_TEXT } from '../data/translations';

interface TripPlannerSectionProps {
  destinations: Destination[];
  language: Language;
  selectedDestinationId: string;
  onSelectDestinationId: (id: string) => void;
  onSaveItinerary: (itinerary: GeneratedItinerary) => void;
  onApplyToTripBuilder: (params: {
    destinationId: string;
    startDate: string;
    endDate: string;
    adults: number;
    children: number;
    travelType: TravelType;
    budget: BudgetTier;
    transportMode: TransportMode;
    itinerary: GeneratedItinerary;
  }) => void;
}

const INTEREST_OPTIONS = [
  'History',
  'Nature',
  'Adventure',
  'Temples',
  'Beaches',
  'Shopping',
  'Wildlife',
];

const HOTEL_PREFERENCES = [
  '3-Star Comfort Hotel',
  '4-Star Boutique Stay',
  '5-Star Heritage Palace',
  'Eco & Nature Resort',
  'Verified Family Homestay',
];

const FOOD_PREFERENCES = [
  'South Indian Vegetarian',
  'North Indian & Mughlai',
  'Regional Local Thali & Street Food',
  'Multi-Cuisine Family Dining',
  'Pure Jain / Sattvic Vegetarian',
];

export const TripPlannerSection: React.FC<TripPlannerSectionProps> = ({
  destinations,
  language,
  selectedDestinationId,
  onSelectDestinationId,
  onSaveItinerary,
  onApplyToTripBuilder,
}) => {
  const t = UI_TEXT[language];

  const [startingCity, setStartingCity] = useState('Hyderabad');
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-10-18');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [travelType, setTravelType] = useState<TravelType>('Family');
  const [budget, setBudget] = useState<BudgetTier>('Standard');
  const [transportMode, setTransportMode] = useState<TransportMode>('Flight');
  const [hotelPreference, setHotelPreference] = useState(HOTEL_PREFERENCES[1]);
  const [foodPreference, setFoodPreference] = useState(FOOD_PREFERENCES[0]);
  const [interests, setInterests] = useState<string[]>(['History', 'Temples', 'Nature']);
  const [formError, setFormError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  const activeDest =
    destinations.find((d) => d.id === selectedDestinationId) || destinations[0];

  // Generate an initial sample itinerary on first load
  useEffect(() => {
    if (activeDest && !generatedItinerary) {
      const initial = generateDayByDayItinerary({
        startingCity,
        destination: activeDest,
        startDate,
        endDate,
        adults,
        children,
        travelType,
        budget,
        transportMode,
        hotelPreference,
        foodPreference,
        interests,
      });
      setGeneratedItinerary(initial);
    }
  }, [activeDest]);

  const toggleInterest = (item: string) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!startingCity.trim()) {
      setFormError('Please enter your starting city.');
      return;
    }
    if (!startDate || !endDate) {
      setFormError('Please select both start date and end date.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setFormError('End date must be on or after the start date.');
      return;
    }
    if (adults < 1) {
      setFormError('At least 1 adult traveler is required.');
      return;
    }
    if (interests.length === 0) {
      setFormError('Please select at least one travel interest.');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const result = generateDayByDayItinerary({
        startingCity: startingCity.trim(),
        destination: activeDest,
        startDate,
        endDate,
        adults,
        children,
        travelType,
        budget,
        transportMode,
        hotelPreference,
        foodPreference,
        interests,
      });
      setGeneratedItinerary(result);
      setIsGenerating(false);
    }, 250);
  };

  const handleSave = () => {
    if (!generatedItinerary) return;
    onSaveItinerary(generatedItinerary);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const daysSelected = calculateDaysBetween(startDate, endDate);

  return (
    <section id="trip-planner" className="py-14 border-t border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-medium text-[#B45309] mb-1">
            02 · Interactive Itinerary Engine
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
            {t.tripPlannerTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] mt-2">
            {t.tripPlannerSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Trip Planning Form (5 cols) */}
          <form
            onSubmit={handleGenerate}
            className="lg:col-span-5 bg-white border border-[#E7E2DA] rounded-xl p-6 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-3">
              <h3 className="font-display text-xl font-bold text-[#1C1917]">
                Configure Your Trip
              </h3>
              <span className="text-xs font-mono text-[#0F766E]">
                {daysSelected} {daysSelected === 1 ? 'Day' : 'Days'} Selected
              </span>
            </div>

            {formError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Starting City
                </label>
                <input
                  type="text"
                  value={startingCity}
                  onChange={(e) => setStartingCity(e.target.value)}
                  placeholder="e.g. Hyderabad, Mumbai"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Destination
                </label>
                <select
                  value={selectedDestinationId}
                  onChange={(e) => onSelectDestinationId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.state})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                />
              </div>
            </div>

            {/* Adults & Children */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Adults (12+ yrs)
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={adults}
                  onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Children (0–11 yrs)
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={children}
                  onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                />
              </div>
            </div>

            {/* Travel Type */}
            <div>
              <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                Travel Type
              </label>
              <div className="grid grid-cols-4 gap-1.5 bg-[#FAF8F5] p-1 rounded-lg border border-[#E7E2DA]">
                {(['Solo', 'Couple', 'Family', 'Friends'] as TravelType[]).map((tt) => (
                  <button
                    key={tt}
                    type="button"
                    onClick={() => setTravelType(tt)}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      travelType === tt
                        ? 'bg-[#1C1917] text-white'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {tt}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Tier & Transport */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Budget Tier
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value as BudgetTier)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                >
                  <option value="Budget">Budget (Economy)</option>
                  <option value="Standard">Standard (Comfort)</option>
                  <option value="Premium">Premium (Upscale)</option>
                  <option value="Luxury">Luxury (Royal Heritage)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Preferred Transport
                </label>
                <select
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value as TransportMode)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                >
                  <option value="Flight">Flight</option>
                  <option value="Train">Train (Vande Bharat / Express)</option>
                  <option value="Bus">Luxury AC Bus</option>
                  <option value="Car">Private Car / SUV</option>
                </select>
              </div>
            </div>

            {/* Hotel & Food Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Hotel Preference
                </label>
                <select
                  value={hotelPreference}
                  onChange={(e) => setHotelPreference(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                >
                  {HOTEL_PREFERENCES.map((hp) => (
                    <option key={hp} value={hp}>
                      {hp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Food Preference
                </label>
                <select
                  value={foodPreference}
                  onChange={(e) => setFoodPreference(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg focus:outline-none focus:border-[#B45309]"
                >
                  {FOOD_PREFERENCES.map((fp) => (
                    <option key={fp} value={fp}>
                      {fp}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Interests Multi-Select */}
            <div>
              <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                Interests (Select one or more)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {INTEREST_OPTIONS.map((interest) => {
                  const active = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap ${
                        active
                          ? 'bg-[#B45309] text-white border-[#B45309]'
                          : 'bg-[#FAF8F5] text-[#44403C] border-[#E7E2DA] hover:bg-[#F3EFEA]'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 px-4 bg-[#B45309] hover:bg-[#92400E] text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Compass className="w-4 h-4" />
              <span>{isGenerating ? 'Building Your Itinerary...' : t.generateItineraryBtn}</span>
            </button>
          </form>

          {/* Right: Generated Day-by-Day Itinerary Display (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {generatedItinerary && (
              <div className="bg-white border border-[#E7E2DA] rounded-xl p-6 space-y-6">
                {/* Itinerary Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E2DA] pb-4">
                  <div>
                    <div className="text-xs text-[#57534E]">
                      <span>{generatedItinerary.startingCity} to {generatedItinerary.destinationName}</span>
                      <span className="mx-1.5">·</span>
                      <span>{generatedItinerary.daysCount} Days</span>
                      <span className="mx-1.5">·</span>
                      <span>{generatedItinerary.travelType} ({generatedItinerary.adults} Adults{generatedItinerary.children > 0 ? `, ${generatedItinerary.children} Children` : ''})</span>
                      <span className="mx-1.5">·</span>
                      <span>{generatedItinerary.budget} Tier</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#1C1917] mt-1">
                      {generatedItinerary.destinationName} Day-by-Day Itinerary
                    </h3>
                    <p className="text-xs text-[#57534E] mt-0.5">
                      Interests: {generatedItinerary.interests.join(', ')} · Dining: {generatedItinerary.foodPreference}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end shrink-0">
                    <span className="text-xs text-[#57534E]">Estimated Itinerary Cost</span>
                    <span className="font-mono text-2xl font-bold text-[#B45309]">
                      {formatINR(generatedItinerary.totalEstimatedCost)}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#E7E2DA] bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#1C1917] transition-colors whitespace-nowrap"
                      >
                        {savedNotice ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#0F766E]" />
                            <span>Saved to My Trips</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Save Itinerary</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onApplyToTripBuilder({
                            destinationId: generatedItinerary.destinationId,
                            startDate: generatedItinerary.startDate,
                            endDate: generatedItinerary.endDate,
                            adults: generatedItinerary.adults,
                            children: generatedItinerary.children,
                            travelType: generatedItinerary.travelType,
                            budget: generatedItinerary.budget,
                            transportMode: generatedItinerary.transportMode,
                            itinerary: generatedItinerary,
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1C1917] hover:bg-[#292524] text-white transition-colors whitespace-nowrap"
                      >
                        <span>Sync with Cost Calculator</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Day Cards */}
                <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
                  {generatedItinerary.days.map((day) => (
                    <div
                      key={day.dayNumber}
                      className="border border-[#E7E2DA] rounded-lg p-5 bg-[#FAF8F5] space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7E2DA] pb-2.5">
                        <div>
                          <span className="font-mono text-xs font-semibold text-[#B45309]">
                            DAY 0{day.dayNumber} · {day.dateStr}
                          </span>
                          <h4 className="font-display text-lg font-bold text-[#1C1917]">
                            {day.title}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-[#57534E] block">Day Estimate</span>
                          <span className="font-mono text-sm font-bold text-[#1C1917]">
                            {formatINR(day.dailyTotalCost)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        {/* Morning */}
                        <div className="bg-white p-3 rounded border border-[#E7E2DA] space-y-1">
                          <div className="flex items-center justify-between text-[#57534E]">
                            <span className="font-semibold text-[#1C1917]">Morning ({day.morning.time})</span>
                            <span className="font-mono">{formatINR(day.morning.cost)}</span>
                          </div>
                          <p className="text-[#44403C]">{day.morning.activity}</p>
                        </div>

                        {/* Lunch */}
                        <div className="bg-white p-3 rounded border border-[#E7E2DA] space-y-1">
                          <div className="flex items-center justify-between text-[#57534E]">
                            <span className="font-semibold text-[#1C1917]">Lunch ({day.lunch.time})</span>
                            <span className="font-mono">{formatINR(day.lunch.cost)}</span>
                          </div>
                          <p className="text-[#44403C]">{day.lunch.recommendation}</p>
                        </div>

                        {/* Afternoon */}
                        <div className="bg-white p-3 rounded border border-[#E7E2DA] space-y-1">
                          <div className="flex items-center justify-between text-[#57534E]">
                            <span className="font-semibold text-[#1C1917]">Afternoon ({day.afternoon.time})</span>
                            <span className="font-mono">{formatINR(day.afternoon.cost)}</span>
                          </div>
                          <p className="text-[#44403C]">{day.afternoon.activity}</p>
                        </div>

                        {/* Evening */}
                        <div className="bg-white p-3 rounded border border-[#E7E2DA] space-y-1">
                          <div className="flex items-center justify-between text-[#57534E]">
                            <span className="font-semibold text-[#1C1917]">Evening ({day.evening.time})</span>
                            <span className="font-mono">{formatINR(day.evening.cost)}</span>
                          </div>
                          <p className="text-[#44403C]">{day.evening.activity}</p>
                        </div>
                      </div>

                      {/* Dinner & Hotel */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E7E2DA] text-xs text-[#44403C]">
                        <div>
                          <span className="font-semibold text-[#1C1917]">Dinner & Stay:</span>{' '}
                          {day.dinnerAndStay.dinner} · Overnight at {day.dinnerAndStay.hotelName}
                        </div>
                        <span className="font-mono font-semibold text-[#1C1917]">
                          Stay + Dinner: {formatINR(day.dinnerAndStay.cost)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
