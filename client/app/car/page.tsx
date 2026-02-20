"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

export default function Page() {
  /** MOCK VEHICLE (replace with API later) */
  const vehicle = {
    _id: "65abc123",
    name: "Porsche 911 Carrera 2024",
    type: "SPORT",
    pricePerDay: 499,
    available: true,
    imageUrl: "data:image/jpeg;base64,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",
  };

  /** BOOKING STATE */
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  /** PRICE CALCULATION */
  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  const totalPrice = days * vehicle.pricePerDay;

  /** BOOKING HANDLER */
  const handleBooking = async () => {
    if (!startDate || !endDate) {
      alert("Please select rental dates");
      return;
    }

    setLoading(true);

    const bookingPayload = {
      vehicle: vehicle._id,
      startDate,
      endDate,
    };

    try {
      await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // if auth cookie
        body: JSON.stringify(bookingPayload),
      });

      alert("Booking created successfully!");
    } catch (err) {
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* LEFT – VEHICLE DETAIL */}
        <div className="lg:col-span-8 space-y-8">

          {/* Title */}
          <div>
            <h1 className="text-4xl font-extrabold">
              {vehicle.name}
            </h1>
            <p className="text-gray-400 mt-2">
              Type: {vehicle.type}
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[420px] rounded-xl overflow-hidden">
            <Image
              src={vehicle.imageUrl}
              alt={vehicle.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Spec label="Price / Day" value={`$${vehicle.pricePerDay}`} />
            <Spec label="Availability" value={vehicle.available ? "Available" : "Unavailable"} />
            <Spec label="Transmission" value="8-Speed PDK" />
            <Spec label="Fuel" value="Premium Gas" />
          </div>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed">
            Experience elite performance and luxury with this premium sports car.
            Perfect for business trips, special events, or unforgettable drives.
          </p>
        </div>

        {/* RIGHT – BOOKING */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 space-y-6">

            {/* Price */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-4xl font-extrabold text-orange-400">
                  ${vehicle.pricePerDay}
                </span>
                <span className="text-gray-400"> / day</span>
              </div>

              {vehicle.available && (
                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                  Available
                </span>
              )}
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 uppercase">
                  Pick-up Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-black border border-[#2a2a2a] rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase">
                  Drop-off Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-black border border-[#2a2a2a] rounded-lg p-3 mt-1"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-[#2a2a2a] pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">
                  {vehicle.pricePerDay} × {days} days
                </span>
                <span>${totalPrice}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-400">
                  ${totalPrice}
                </span>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleBooking}
              disabled={loading || !vehicle.available}
              className="w-full bg-orange-400 hover:bg-orange-500 disabled:opacity-50 text-black font-bold py-4 rounded-xl transition"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/** Small helper */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 text-center">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-bold mt-1">{value}</p>
    </div>
  );
}