import React, { useState } from 'react';
import { X, Plus, Trash2, ShieldCheck } from 'lucide-react';
import {
  Destination,
  Hotel,
  TransportOption,
  LocalGuide,
  CompletedBooking,
  UserProfile,
} from '../types/travel';
import { formatINR } from '../utils/format';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  onUpdateDestinations: (items: Destination[]) => void;
  hotels: Hotel[];
  onUpdateHotels: (items: Hotel[]) => void;
  transport: TransportOption[];
  onUpdateTransport: (items: TransportOption[]) => void;
  guides: LocalGuide[];
  onUpdateGuides: (items: LocalGuide[]) => void;
  bookings: CompletedBooking[];
  onUpdateBookings: (items: CompletedBooking[]) => void;
  users: UserProfile[];
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  destinations,
  onUpdateDestinations,
  hotels,
  onUpdateHotels,
  transport,
  onUpdateTransport,
  guides,
  onUpdateGuides,
  bookings,
  onUpdateBookings,
  users,
}) => {
  const [activeTab, setActiveTab] = useState<
    'destinations' | 'hotels' | 'attractions' | 'guides' | 'transport' | 'bookings' | 'users'
  >('destinations');

  // Quick Add Hotel form state
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelCityId, setNewHotelCityId] = useState('hyderabad');
  const [newHotelPrice, setNewHotelPrice] = useState(3200);

  // Quick Add Guide form state
  const [newGuideName, setNewGuideName] = useState('');
  const [newGuideCityId, setNewGuideCityId] = useState('hyderabad');
  const [newGuideHourly, setNewGuideHourly] = useState(750);

  // Quick Add Transport state
  const [newTrOperator, setNewTrOperator] = useState('');
  const [newTrFrom, setNewTrFrom] = useState('Hyderabad');
  const [newTrTo, setNewTrTo] = useState('Tirupati');
  const [newTrFare, setNewTrFare] = useState(1450);

  if (!isOpen) return null;

  const handleAddHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName.trim()) return;
    const cityObj = destinations.find((d) => d.id === newHotelCityId) || destinations[0];
    const newItem: Hotel = {
      id: `htl-custom-${Date.now()}`,
      destinationId: cityObj.id,
      city: cityObj.name,
      name: newHotelName.trim(),
      location: `Central ${cityObj.name}`,
      rating: 4.7,
      reviewCount: 65,
      hotelType: 'Boutique Stay',
      roomType: 'Deluxe AC Room',
      pricePerNight: newHotelPrice,
      amenities: ['Free WiFi', 'Restaurant', 'Parking'],
      breakfastIncluded: true,
      distanceFromCenterKm: 1.5,
      nearestAttraction: `${cityObj.name} Heritage Center`,
      imageKey: cityObj.imageKey,
      coordinates: { x: 50, y: 50 },
    };
    onUpdateHotels([newItem, ...hotels]);
    setNewHotelName('');
  };

  const handleAddGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuideName.trim()) return;
    const cityObj = destinations.find((d) => d.id === newGuideCityId) || destinations[0];
    const newGuide: LocalGuide = {
      id: `gd-custom-${Date.now()}`,
      name: newGuideName.trim(),
      city: cityObj.name,
      destinationId: cityObj.id,
      languages: ['Telugu', 'Hindi', 'English'],
      experienceYears: 6,
      rating: 4.8,
      reviewsCount: 48,
      hourlyPrice: newGuideHourly,
      dailyPrice: newGuideHourly * 5,
      specialization: ['Historical Monuments', 'Temple Heritage'],
      availability: 'Available Today',
      bio: `Verified local guide in ${cityObj.name}.`,
      verifiedBadge: 'Admin Verified Guide (Demo)',
    };
    onUpdateGuides([newGuide, ...guides]);
    setNewGuideName('');
  };

  const handleAddTransport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrOperator.trim()) return;
    const item: TransportOption = {
      id: `tr-custom-${Date.now()}`,
      mode: 'Train',
      operatorName: newTrOperator.trim(),
      serviceNumber: 'EXP-2026',
      fromCity: newTrFrom,
      toCity: newTrTo,
      departureTime: '07:00 AM',
      arrivalTime: '01:30 PM',
      duration: '6h 30m',
      approxFare: newTrFare,
      classType: 'AC Executive',
    };
    onUpdateTransport([item, ...transport]);
    setNewTrOperator('');
  };

  const handleUpdateTicketPrice = (destId: string, attrId: string, newAdultPrice: number) => {
    const updated = destinations.map((d) => {
      if (d.id !== destId) return d;
      return {
        ...d,
        famousAttractions: d.famousAttractions.map((a) =>
          a.id === attrId ? { ...a, adultPrice: Math.max(0, newAdultPrice) } : a
        ),
      };
    });
    onUpdateDestinations(updated);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl max-w-6xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1C1917] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#F59E0B]" />
            <div>
              <h2 className="font-display text-xl font-bold">
                India Trip Planner — Admin Management Console
              </h2>
              <p className="text-xs text-white/70">
                Manage Destinations, Hotels, Attractions & Ticket Prices, Local Guides, Transport, Users, and Demo Bookings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 bg-white border-b border-[#E7E2DA] flex flex-wrap gap-1.5 shrink-0">
          {(
            [
              { id: 'destinations', label: `Destinations (${destinations.length})` },
              { id: 'hotels', label: `Hotels (${hotels.length})` },
              { id: 'attractions', label: 'Attractions & Ticket Prices' },
              { id: 'guides', label: `Guides (${guides.length})` },
              { id: 'transport', label: `Transport (${transport.length})` },
              { id: 'bookings', label: `Bookings (${bookings.length})` },
              { id: 'users', label: `Users (${users.length})` },
            ] as const
          ).map((tb) => (
            <button
              key={tb.id}
              type="button"
              onClick={() => setActiveTab(tb.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === tb.id
                  ? 'bg-[#B45309] text-white'
                  : 'bg-[#FAF8F5] text-[#44403C] hover:bg-[#F3EFEA]'
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* 1. Destinations */}
          {activeTab === 'destinations' && (
            <div className="bg-white border border-[#E7E2DA] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E7E2DA] text-[#57534E]">
                    <th className="p-3">City Name</th>
                    <th className="p-3">State</th>
                    <th className="p-3">Best Season</th>
                    <th className="p-3">Hotel / Night (₹)</th>
                    <th className="p-3">Recommended Days</th>
                    <th className="p-3">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2DA]">
                  {destinations.map((d) => (
                    <tr key={d.id}>
                      <td className="p-3 font-semibold text-[#1C1917]">
                        {d.name} ({d.nameTe})
                      </td>
                      <td className="p-3 text-[#44403C]">{d.state}</td>
                      <td className="p-3 text-[#44403C]">{d.bestTimeToVisit}</td>
                      <td className="p-3 font-mono font-semibold">{formatINR(d.costs.hotelPerNight)}</td>
                      <td className="p-3 font-mono">{d.recommendedDays} Days</td>
                      <td className="p-3 font-mono">{d.rating}/5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 2. Hotels */}
          {activeTab === 'hotels' && (
            <div className="space-y-4">
              <form
                onSubmit={handleAddHotel}
                className="bg-white border border-[#E7E2DA] rounded-xl p-4 flex flex-wrap items-end gap-3 text-xs"
              >
                <div className="flex-1 min-w-[180px]">
                  <label className="block font-medium mb-1">New Hotel Name</label>
                  <input
                    type="text"
                    value={newHotelName}
                    onChange={(e) => setNewHotelName(e.target.value)}
                    placeholder="e.g. Royal Deccan Heritage Inn"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">City</label>
                  <select
                    value={newHotelCityId}
                    onChange={(e) => setNewHotelCityId(e.target.value)}
                    className="px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Est. Price / Night (₹)</label>
                  <input
                    type="number"
                    value={newHotelPrice}
                    onChange={(e) => setNewHotelPrice(Number(e.target.value))}
                    className="w-28 px-3 py-2 font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1C1917] text-white font-semibold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Hotel
                </button>
              </form>

              <div className="bg-white border border-[#E7E2DA] rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#E7E2DA] text-[#57534E]">
                      <th className="p-3">Hotel Name</th>
                      <th className="p-3">City</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Price / Night</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2DA]">
                    {hotels.map((h) => (
                      <tr key={h.id}>
                        <td className="p-3 font-semibold text-[#1C1917]">{h.name}</td>
                        <td className="p-3">{h.city}</td>
                        <td className="p-3">{h.hotelType}</td>
                        <td className="p-3 font-mono font-semibold">{formatINR(h.pricePerNight)}</td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => onUpdateHotels(hotels.filter((x) => x.id !== h.id))}
                            className="text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. Attractions & Ticket Prices */}
          {activeTab === 'attractions' && (
            <div className="bg-white border border-[#E7E2DA] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E7E2DA] text-[#57534E]">
                    <th className="p-3">City</th>
                    <th className="p-3">Attraction</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Timings</th>
                    <th className="p-3">Adult Ticket Price (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2DA]">
                  {destinations.slice(0, 10).flatMap((d) =>
                    d.famousAttractions.map((attr) => (
                      <tr key={attr.id}>
                        <td className="p-3 font-medium text-[#B45309]">{d.name}</td>
                        <td className="p-3 font-semibold text-[#1C1917]">{attr.name}</td>
                        <td className="p-3">{attr.category}</td>
                        <td className="p-3 font-mono text-[#57534E]">{attr.openingHours}</td>
                        <td className="p-3">
                          <input
                            type="number"
                            min={0}
                            value={attr.adultPrice}
                            onChange={(e) =>
                              handleUpdateTicketPrice(d.id, attr.id, Number(e.target.value))
                            }
                            className="w-24 px-2 py-1 font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 4. Guides */}
          {activeTab === 'guides' && (
            <div className="space-y-4">
              <form
                onSubmit={handleAddGuide}
                className="bg-white border border-[#E7E2DA] rounded-xl p-4 flex flex-wrap items-end gap-3 text-xs"
              >
                <div className="flex-1 min-w-[180px]">
                  <label className="block font-medium mb-1">Guide Name</label>
                  <input
                    type="text"
                    value={newGuideName}
                    onChange={(e) => setNewGuideName(e.target.value)}
                    placeholder="e.g. Venkat Rao"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">City</label>
                  <select
                    value={newGuideCityId}
                    onChange={(e) => setNewGuideCityId(e.target.value)}
                    className="px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    value={newGuideHourly}
                    onChange={(e) => setNewGuideHourly(Number(e.target.value))}
                    className="w-28 px-3 py-2 font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1C1917] text-white font-semibold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Guide
                </button>
              </form>

              <div className="bg-white border border-[#E7E2DA] rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#E7E2DA] text-[#57534E]">
                      <th className="p-3">Guide Name</th>
                      <th className="p-3">City</th>
                      <th className="p-3">Languages</th>
                      <th className="p-3">Hourly / Daily</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2DA]">
                    {guides.map((g) => (
                      <tr key={g.id}>
                        <td className="p-3 font-semibold text-[#1C1917]">{g.name}</td>
                        <td className="p-3">{g.city}</td>
                        <td className="p-3">{g.languages.join(', ')}</td>
                        <td className="p-3 font-mono">
                          {formatINR(g.hourlyPrice)}/hr · {formatINR(g.dailyPrice)}/day
                        </td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => onUpdateGuides(guides.filter((x) => x.id !== g.id))}
                            className="text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. Transport */}
          {activeTab === 'transport' && (
            <div className="space-y-4">
              <form
                onSubmit={handleAddTransport}
                className="bg-white border border-[#E7E2DA] rounded-xl p-4 flex flex-wrap items-end gap-3 text-xs"
              >
                <div className="flex-1 min-w-[160px]">
                  <label className="block font-medium mb-1">Operator / Service</label>
                  <input
                    type="text"
                    value={newTrOperator}
                    onChange={(e) => setNewTrOperator(e.target.value)}
                    placeholder="e.g. APSRTC Vennela Sleeper"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">From</label>
                  <input
                    type="text"
                    value={newTrFrom}
                    onChange={(e) => setNewTrFrom(e.target.value)}
                    className="w-32 px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">To</label>
                  <input
                    type="text"
                    value={newTrTo}
                    onChange={(e) => setNewTrTo(e.target.value)}
                    className="w-32 px-3 py-2 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Fare (₹)</label>
                  <input
                    type="number"
                    value={newTrFare}
                    onChange={(e) => setNewTrFare(Number(e.target.value))}
                    className="w-24 px-3 py-2 font-mono bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1C1917] text-white font-semibold rounded-lg"
                >
                  + Add Route
                </button>
              </form>

              <div className="bg-white border border-[#E7E2DA] rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#E7E2DA] text-[#57534E]">
                      <th className="p-3">Mode</th>
                      <th className="p-3">Operator</th>
                      <th className="p-3">Route</th>
                      <th className="p-3">Approx. Fare</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2DA]">
                    {transport.map((tr) => (
                      <tr key={tr.id}>
                        <td className="p-3 font-semibold text-[#B45309]">{tr.mode}</td>
                        <td className="p-3 font-medium text-[#1C1917]">{tr.operatorName}</td>
                        <td className="p-3">{tr.fromCity} → {tr.toCity}</td>
                        <td className="p-3 font-mono font-semibold">{formatINR(tr.approxFare)}</td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => onUpdateTransport(transport.filter((x) => x.id !== tr.id))}
                            className="text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. Bookings */}
          {activeTab === 'bookings' && (
            <div className="bg-white border border-[#E7E2DA] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E7E2DA] text-[#57534E]">
                    <th className="p-3">Booking ID</th>
                    <th className="p-3">Traveler</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Dates</th>
                    <th className="p-3">Total (₹)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2DA]">
                  {bookings.map((b) => (
                    <tr key={b.bookingId}>
                      <td className="p-3 font-mono font-semibold text-[#B45309]">{b.bookingId}</td>
                      <td className="p-3 font-medium text-[#1C1917]">{b.userName}</td>
                      <td className="p-3">{b.destinationName}</td>
                      <td className="p-3 font-mono">{b.startDate} → {b.endDate}</td>
                      <td className="p-3 font-mono font-bold">{formatINR(b.costBreakdown.totalCost)}</td>
                      <td className="p-3 text-[#0F766E] font-semibold">{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 7. Users */}
          {activeTab === 'users' && (
            <div className="bg-white border border-[#E7E2DA] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E7E2DA] text-[#57534E]">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2DA]">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="p-3 font-semibold text-[#1C1917]">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3 font-mono">{u.phone}</td>
                      <td className="p-3">{u.city}</td>
                      <td className="p-3 uppercase font-mono">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
