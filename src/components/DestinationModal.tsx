import React, { useState } from 'react';
import {
  X,
  Star,
  Calendar,
  CloudSun,
  MapPin,
  Clock,
  Check,
  Heart,
  Compass,
  Navigation,
  Utensils,
  Hotel as HotelIcon,
  Ticket,
} from 'lucide-react';
import { Destination, AttractionItem, Language } from '../types/travel';
import { ResilientImage } from './ResilientImage';
import { formatINR } from '../utils/format';
import { ALL_GALLERY_IMAGES, IMAGE_ASSETS } from '../utils/images';

interface DestinationModalProps {
  destination: Destination | null;
  language: Language;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (destId: string) => void;
  onPlanTripHere: (dest: Destination) => void;
  onQuickAddTicket: (dest: Destination, attraction: AttractionItem) => void;
  onBrowseHotelsHere: (destId: string) => void;
  onHireGuideHere: (destId: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  language,
  isSaved,
  onClose,
  onToggleSave,
  onPlanTripHere,
  onQuickAddTicket,
  onBrowseHotelsHere,
  onHireGuideHere,
}) => {
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [addedTicketId, setAddedTicketId] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  if (!destination) return null;

  const gallery = [
    IMAGE_ASSETS[destination.imageKey],
    ...ALL_GALLERY_IMAGES.filter((img) => img !== IMAGE_ASSETS[destination.imageKey]).slice(0, 3),
  ];

  const handleAddTicket = (attr: AttractionItem) => {
    onQuickAddTicket(destination, attr);
    setAddedTicketId(attr.id);
    setTimeout(() => setAddedTicketId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dest-modal-title"
    >
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E7E2DA] shrink-0">
          <div>
            <div className="text-xs text-[#57534E]">
              <span>{language === 'te' ? destination.stateTe : destination.state}</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>Recommended {destination.recommendedDays} Days</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>Best: {destination.bestTimeToVisit}</span>
            </div>
            <h2 id="dest-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {destination.name}{' '}
              <span className="text-lg font-normal text-[#57534E]">({destination.nameTe})</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(destination.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                isSaved
                  ? 'bg-[#B45309]/10 border-[#B45309] text-[#B45309]'
                  : 'bg-white border-[#E7E2DA] text-[#1C1917] hover:bg-[#F3EFEA]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#B45309]' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Place'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-[#E7E2DA] text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFEA] transition-colors"
              aria-label="Close destination details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Hero Gallery + Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-3">
              <div className="relative h-64 sm:h-80 w-full rounded-lg overflow-hidden bg-[#1C1917]">
                <img
                  src={gallery[activeGalleryIdx]}
                  alt={`${destination.name} view ${activeGalleryIdx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-opacity duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <p className="text-xs text-white/80">
                      {destination.categories.join(' · ')}
                    </p>
                    <p className="font-display text-xl font-semibold">
                      {language === 'te' ? destination.taglineTe : destination.tagline}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-mono bg-black/60 px-2.5 py-1 rounded">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span>{destination.rating}</span>
                    <span className="text-xs text-white/70">({destination.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-4 gap-2.5">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIdx(idx)}
                    className={`h-16 rounded-md overflow-hidden border-2 transition-all ${
                      activeGalleryIdx === idx ? 'border-[#B45309] opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${destination.name} thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Key Facts & Cost Estimates */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#E7E2DA] rounded-lg p-5 space-y-5">
              <div className="space-y-3">
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  About {destination.name}
                </h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  {language === 'te' ? destination.descriptionTe : destination.description}
                </p>
              </div>

              {/* Weather & Best Time */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E7E2DA] text-xs">
                <div>
                  <span className="text-[#57534E] block">Best Time to Visit</span>
                  <span className="font-semibold text-[#1C1917] mt-0.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
                    {destination.bestTimeToVisit}
                  </span>
                </div>
                <div>
                  <span className="text-[#57534E] block">Weather & Temp</span>
                  <span className="font-semibold text-[#1C1917] mt-0.5 flex items-center gap-1.5 font-mono">
                    <CloudSun className="w-3.5 h-3.5 text-[#0F766E]" />
                    {destination.weatherInfo.tempRange}
                  </span>
                </div>
                <div className="col-span-2 text-[#57534E]">
                  Condition: <span className="text-[#1C1917]">{destination.weatherInfo.seasonCondition}</span> · Humidity: <span className="font-mono">{destination.weatherInfo.humidity}</span>
                </div>
              </div>

              {/* Approximate Cost Breakdown */}
              <div className="pt-3 border-t border-[#E7E2DA] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1C1917]">Estimated Daily Costs (₹)</span>
                  <span className="text-xs text-[#57534E]">Recommended: {destination.recommendedDays} Days</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-xs bg-[#FAF8F5] p-3 rounded-lg border border-[#E7E2DA]">
                  <div>
                    <span className="text-[#57534E] block">Hotel Stay / Night</span>
                    <span className="font-mono font-semibold text-sm text-[#1C1917]">
                      {formatINR(destination.costs.hotelPerNight)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#57534E] block">Food Estimate / Day</span>
                    <span className="font-mono font-semibold text-sm text-[#1C1917]">
                      {formatINR(destination.costs.foodPerDay)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#57534E] block">Local Transport / Day</span>
                    <span className="font-mono font-semibold text-sm text-[#1C1917]">
                      {formatINR(destination.costs.localTransportPerDay)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#57534E] block">Avg. Entry Tickets</span>
                    <span className="font-mono font-semibold text-sm text-[#1C1917]">
                      {formatINR(destination.costs.entryTicketAvg)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                <button
                  onClick={() => {
                    onPlanTripHere(destination);
                    onClose();
                  }}
                  className="px-3 py-2.5 bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-center"
                >
                  Plan Itinerary
                </button>
                <button
                  onClick={() => {
                    onBrowseHotelsHere(destination.id);
                    onClose();
                  }}
                  className="px-3 py-2.5 bg-white hover:bg-[#F3EFEA] text-[#1C1917] border border-[#E7E2DA] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-center"
                >
                  Find Hotels
                </button>
                <button
                  onClick={() => {
                    onHireGuideHere(destination.id);
                    onClose();
                  }}
                  className="px-3 py-2.5 bg-white hover:bg-[#F3EFEA] text-[#1C1917] border border-[#E7E2DA] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-center"
                >
                  Hire Local Guide
                </button>
              </div>
            </div>
          </div>

          {/* Famous Attractions with Timings & Entry Ticket Prices */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#E7E2DA] pb-2">
              <h3 className="font-display text-xl font-bold text-[#1C1917]">
                Famous Attractions, Opening Hours & Entry Tickets
              </h3>
              <span className="text-xs text-[#57534E]">
                Click "Add Ticket" to include in your trip cost calculator & booking summary
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {destination.famousAttractions.map((attr) => {
                const isAdded = addedTicketId === attr.id;
                return (
                  <div
                    key={attr.id}
                    className="bg-white border border-[#E7E2DA] rounded-lg p-4 flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-[#57534E]">
                        <span>{attr.category} · Duration: {attr.duration}</span>
                        <span className="font-mono text-[#1C1917]">
                          Adult: {attr.adultPrice === 0 ? 'Free' : formatINR(attr.adultPrice)} · Child: {attr.childPrice === 0 ? 'Free' : formatINR(attr.childPrice)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-base text-[#1C1917]">
                        {attr.name} {attr.nameTe ? <span className="text-xs font-normal text-[#57534E]">({attr.nameTe})</span> : null}
                      </h4>
                      <p className="text-xs text-[#57534E] leading-relaxed">
                        {attr.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#E7E2DA] text-xs">
                      <span className="text-[#57534E] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#B45309]" />
                        {attr.openingHours}
                      </span>
                      <button
                        onClick={() => handleAddTicket(attr)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                          isAdded
                            ? 'bg-[#0F766E] text-white'
                            : 'bg-[#FAF8F5] hover:bg-[#B45309] hover:text-white text-[#1C1917] border border-[#E7E2DA]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Trip</span>
                          </>
                        ) : (
                          <>
                            <Ticket className="w-3.5 h-3.5" />
                            <span>Add Ticket ({formatINR(attr.adultPrice)})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Things to Do + Interactive City Map & Nearby Places */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white border border-[#E7E2DA] rounded-lg p-5 space-y-5">
              <div>
                <h3 className="font-display text-lg font-bold text-[#1C1917] mb-3">
                  Top Things to Do in {destination.name}
                </h3>
                <ol className="space-y-2.5 text-sm text-[#44403C]">
                  {destination.thingsToDo.map((activity, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-semibold text-[#B45309] mt-0.5">
                        0{index + 1}.
                      </span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-4 border-t border-[#E7E2DA]">
                <h4 className="font-display text-base font-bold text-[#1C1917] mb-2.5">
                  Nearby Tourist Places (Excursions)
                </h4>
                <div className="space-y-2">
                  {destination.nearbyPlaces.map((np, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-[#FAF8F5] last:border-0"
                    >
                      <span className="font-medium text-[#1C1917]">{np.name}</span>
                      <span className="text-[#57534E] font-mono">
                        {np.type} · {np.distanceKm} km
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Destination Interactive Map & Location View */}
            <div className="lg:col-span-7 bg-white border border-[#E7E2DA] rounded-lg p-5 flex flex-col justify-between space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#1C1917]">
                    {destination.name} Interactive Location Map
                  </h3>
                  <p className="text-xs text-[#57534E] font-mono">
                    GPS: {destination.mapCoordinates.lat.toFixed(4)}° N, {destination.mapCoordinates.lng.toFixed(4)}° E
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#57534E]">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B45309] inline-block" /> Attraction
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E] inline-block" /> Dining
                  </span>
                </div>
              </div>

              {/* Interactive SVG City Map Grid */}
              <div className="relative h-60 w-full bg-[#F3EFEA] rounded-lg border border-[#E7E2DA] overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="cityGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E5DEC9" strokeWidth="0.4" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#cityGrid)" />
                  {/* Decorative arterial roads & river */}
                  <path d="M 0 65 Q 45 50 100 70" fill="none" stroke="#BAE6FD" strokeWidth="4" opacity="0.7" />
                  <path d="M 15 0 L 55 100 M 0 40 L 100 55 M 30 100 L 85 0" fill="none" stroke="#D6D0C4" strokeWidth="1.2" />
                </svg>

                {/* Attraction Pins */}
                {destination.famousAttractions.map((attr) => (
                  <button
                    key={attr.id}
                    onClick={() => setSelectedPin(`${attr.name} (${attr.category || 'Attraction'}) — Entry: ${formatINR(attr.adultPrice)}`)}
                    style={{ left: `${attr.coordinates.x}%`, top: `${attr.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                    title={attr.name}
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#B45309] text-white shadow-md group-hover:scale-110 transition-transform">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <span className="mt-1 block px-1.5 py-0.5 bg-white/95 border border-[#E7E2DA] rounded text-[10px] font-medium text-[#1C1917] whitespace-nowrap shadow-sm">
                      {attr.name.split(' ')[0]} {attr.name.split(' ')[1]}
                    </span>
                  </button>
                ))}

                {/* Restaurant Pins */}
                {destination.sampleRestaurants.map((rest, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPin(`${rest.name} — ${rest.cuisine} (Avg ${formatINR(rest.avgCostForTwo)} for two)`)}
                    style={{ left: `${rest.x}%`, top: `${rest.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                    title={rest.name}
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0F766E] text-white shadow-md group-hover:scale-110 transition-transform">
                      <Utensils className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs bg-[#FAF8F5] px-3.5 py-2.5 rounded border border-[#E7E2DA]">
                <span className="text-[#44403C]">
                  {selectedPin || `Click any marker above to inspect ${destination.name} attractions & dining spots.`}
                </span>
                <span className="font-mono text-[#0F766E] whitespace-nowrap ml-2">
                  {destination.famousAttractions.length} Landmarks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
