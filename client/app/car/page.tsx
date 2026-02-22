"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

/* ================== MOCK MODELS ================== */

interface Vehicle {
  _id: string;
  name: string;
  type: string;
  pricePerDay: number;
  available: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

interface Booking {
  _id: string;
  user: string;
  vehicle: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

/* ================== MOCK DATA ================== */

const mockVehicle: Vehicle = {
  _id: "65abc123",
  name: "Porsche 911 Carrera 2024",
  type: "SPORT",
  pricePerDay: 499,
  available: true,
  imageUrl:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...",
  createdAt: "2026-01-10T08:30:00.000Z",
  updatedAt: "2026-02-15T14:12:00.000Z",
};

const mockUserId = "64user001";

/* ================== PAGE ================== */

export default function Page() {
  const vehicle = mockVehicle;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================== PRICE CALC ================== */

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  const totalPrice = days * vehicle.pricePerDay;

  /* ================== BOOKING (MOCK) ================== */

  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert("Please select rental dates");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newBooking: Booking = {
        _id: crypto.randomUUID(),
        user: mockUserId,
        vehicle: vehicle._id,
        startDate,
        endDate,
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setBooking(newBooking);
      setLoading(false);
    }, 800);
  };

  /* ================== UI ================== */

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold">{vehicle.name}</h1>
            <p className="text-gray-400 mt-2">Type: {vehicle.type}</p>
            <p className="text-xs text-gray-500 mt-1">
              Created: {new Date(vehicle.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="relative h-[420px] rounded-xl overflow-hidden">
            <Image
              src={vehicle.imageUrl}
              alt={vehicle.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Spec label="Price / Day" value={`$${vehicle.pricePerDay}`} />
            <Spec
              label="Availability"
              value={vehicle.available ? "Available" : "Unavailable"}
            />
            <Spec
              label="Updated"
              value={new Date(vehicle.updatedAt).toLocaleDateString()}
            />
            <Spec
              label="Booking Status"
              value={booking ? booking.status : "—"}
            />
          </div>

          {booking && (
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 space-y-2">
              <p className="font-bold text-lg">Mock Booking Created</p>
              <p className="text-sm text-gray-400">
                Booking ID: {booking._id}
              </p>
              <p className="text-sm text-gray-400">
                Status: {booking.status}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 space-y-6">

            <div className="flex justify-between items-center">
              <div>
                <span className="text-4xl font-extrabold text-orange-400">
                  ${vehicle.pricePerDay}
                </span>
                <span className="text-gray-400"> / day</span>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-black border border-[#2a2a2a] rounded-lg p-3"
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-black border border-[#2a2a2a] rounded-lg p-3"
              />
            </div>

            <div className="border-t border-[#2a2a2a] pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>
                  {vehicle.pricePerDay} × {days} days
                </span>
                <span>${totalPrice}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-400">${totalPrice}</span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-orange-400 hover:bg-orange-500 disabled:opacity-50 text-black font-bold py-4 rounded-xl"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================== HELPER ================== */

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 text-center">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-bold mt-1">{value}</p>
    </div>
  );
}