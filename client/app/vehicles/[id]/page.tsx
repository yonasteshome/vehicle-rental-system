"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { differenceInCalendarDays } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ================= ZUSTAND ================= */

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | null;

interface BookingState {
  startDate: string;
  endDate: string;
  status: BookingStatus;
  setStartDate: (v: string) => void;
  setEndDate: (v: string) => void;
  setStatus: (s: BookingStatus) => void;
  reset: () => void;
}

const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      startDate: "",
      endDate: "",
      status: null,

      setStartDate: (v) => set({ startDate: v }),
      setEndDate: (v) => set({ endDate: v }),
      setStatus: (s) => set({ status: s }),

      reset: () =>
        set({
          startDate: "",
          endDate: "",
          status: null,
        }),
    }),
    { name: "vehicle-booking-storage" }
  )
);

/* ================= TYPES ================= */

interface Vehicle {
  _id: string;
  name: string;
  type: string;
  pricePerDay: number;
  available: boolean;
  imageUrl: string;
}

interface Booking {
  vehicle: { _id: string };
  startDate: string;
  endDate: string;
  status: BookingStatus;
}

/* ================= PAGE ================= */

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    startDate,
    endDate,
    status,
    setStartDate,
    setEndDate,
    setStatus,
    reset,
  } = useBookingStore();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false); // ✅ ADDED

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const [vehicleRes, bookingsRes] = await Promise.all([
          api.get(`/vehicles/${id}`),
          api.get(`/bookings/my`, { withCredentials: true }),
        ]);

        setVehicle(vehicleRes.data.data);

        const existing = bookingsRes.data.data.find(
          (b: Booking) =>
            b.vehicle?._id === id &&
            ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"].includes(
              b.status as string
            )
        );

        if (existing) {
          setStartDate(existing.startDate.slice(0, 10));
          setEndDate(existing.endDate.slice(0, 10));
          setStatus(existing.status);
        } else {
          reset();
        }
      } catch (err) {
        console.error(err);
        reset();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, reset, setStartDate, setEndDate, setStatus]);

  /* ================= PRICE ================= */

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const diff = differenceInCalendarDays(
      new Date(endDate),
      new Date(startDate)
    );
    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  const totalPrice = vehicle ? days * vehicle.pricePerDay : 0;

  /* ================= RULE ================= */

  const canBook =
    !!startDate &&
    !!endDate &&
    days > 0 &&
    vehicle?.available &&
    !bookingLoading &&
    (!status || status === "PENDING");

  /* ================= BOOK ================= */

  const handleBooking = async () => {
    if (!vehicle || !canBook) return;

    try {
      setBookingLoading(true);

      const res = await api.post(
        "/bookings",
        {
          vehicleId: vehicle._id,
          startDate,
          endDate,
        },
        { withCredentials: true }
      );

      setStatus(res.data.data.status);
      alert("Booking successful");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  /* ================= PAY (ADDED ONLY) ================= */

  const handlePayment = async () => {
    if (!vehicle || status !== "PENDING") return;

    try {
      setPaymentLoading(true);

      await api.post(
        "/payments",
        {
          vehicleId: vehicle._id,
          amount: totalPrice,
        },
        { withCredentials: true }
      );

      alert("Payment successful. Waiting for confirmation.");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Payment failed");
    } finally {
      setPaymentLoading(false);
    }
  };

  /* ================= UI ================= */

  if (loading || !vehicle) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading vehicle...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold">{vehicle.name}</h1>
            <p className="text-gray-400 mt-2">Type: {vehicle.type}</p>
          </div>

          <div className="h-[420px] rounded-xl overflow-hidden bg-black">
            <img
              src={vehicle.imageUrl}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Spec label="Price / Day" value={`$${vehicle.pricePerDay}`} />
            <Spec
              label="Availability"
              value={vehicle.available ? "Available" : "Unavailable"}
            />
            <Spec label="Booking Status" value={status ?? "—"} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 space-y-6">

            <div>
              <span className="text-4xl font-extrabold text-orange-400">
                ${vehicle.pricePerDay}
              </span>
              <span className="text-gray-400"> / day</span>
            </div>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-black border border-[#2a2a2a] rounded-lg p-3"
            />

            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-black border border-[#2a2a2a] rounded-lg p-3"
            />

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

            {/* EXISTING BOOK BUTTON (UNCHANGED) */}
            <button
              onClick={handleBooking}
              disabled={!canBook}
              className="w-full bg-orange-400 hover:bg-orange-500 disabled:opacity-40 text-black font-bold py-4 rounded-xl"
            >
              {bookingLoading
                ? "Booking..."
                : status && status !== "PENDING"
                ? "Booking Locked"
                : "Confirm Booking"}
            </button>

            {/* ✅ PAY NOW BUTTON (ONLY ADDED PART) */}
            {status === "PENDING" && (
              <button
                onClick={handlePayment}
                disabled={paymentLoading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-40 text-black font-bold py-4 rounded-xl"
              >
                {paymentLoading ? "Processing Payment..." : "Pay Now"}
              </button>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= HELPER ================= */

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 text-center">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-bold mt-1">{value}</p>
    </div>
  );
}