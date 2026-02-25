"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProfileHeader from "@/app/components/profile/ProfileHeader";

/* ================= TYPES ================= */

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

interface Vehicle {
  name: string;
  imageUrl: string;
  pricePerDay: number;
}

interface Booking {
  _id: string;
  vehicle: Vehicle | null; // 🔒 VERY IMPORTANT
  startDate: string;
  endDate: string;
  status: BookingStatus;
}

/* ================= PAGE ================= */

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  /* ================= FETCH ================= */

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings", {
        withCredentials: true, // ✅ HttpOnly cookies
      });
      setBookings(res.data.data);
    } catch {
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= ACTIONS ================= */

  const confirmBooking = async (id: string) => {
    try {
      setActionLoading(id);
      await api.put(
        `/bookings/${id}/confirm`,
        {},
        { withCredentials: true }
      );
      fetchBookings();
    } catch {
      alert("Confirm failed");
    } finally {
      setActionLoading(null);
    }
  };

  const cancelBooking = async (id: string) => {
    if (!confirm("Cancel this booking?")) return;

    try {
      setActionLoading(id);
      await api.put(
        `/bookings/${id}/cancel`,
        {},
        { withCredentials: true }
      );
      fetchBookings();
    } catch {
      alert("Cancel failed");
    } finally {
      setActionLoading(null);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="bg-[#221a10] text-slate-100 min-h-screen font-[Plus_Jakarta_Sans] overflow-hidden">

      {/* HEADER */}
      <header className="sticky top-0 z-50 h-20 border-b border-[#ec9213]/10 bg-[#221a10]/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Admin · Bookings
          </h1>
          <ProfileHeader />
        </div>
      </header>

      {/* BODY */}
      <div className="max-w-[1600px] mx-auto px-6 py-8 h-[calc(100vh-5rem)] overflow-y-auto">

        {loading ? (
          <p className="text-slate-400">Loading bookings…</p>
        ) : bookings.length === 0 ? (
          <p className="text-slate-400">No bookings found</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="flex gap-6 bg-black/40 border border-[#ec9213]/10 rounded-2xl p-6"
              >
                {/* IMAGE — SAFE */}
                {b.vehicle ? (
                  <img
                    src={b.vehicle.imageUrl}
                    alt={b.vehicle.name}
                    className="w-40 h-28 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-40 h-28 rounded-xl bg-black/50 flex items-center justify-center text-sm text-slate-400">
                    Vehicle deleted
                  </div>
                )}

                {/* INFO */}
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-bold">
                    {b.vehicle?.name ?? "Unknown Vehicle"}
                  </h2>

                  <p className="text-sm text-slate-400">
                    {new Date(b.startDate).toDateString()} →{" "}
                    {new Date(b.endDate).toDateString()}
                  </p>

                  <p className="text-[#ec9213] font-bold">
                    ${b.vehicle?.pricePerDay ?? "--"} / day
                  </p>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      b.status === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : b.status === "CONFIRMED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3 justify-center">
                  {b.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => confirmBooking(b._id)}
                        disabled={actionLoading === b._id}
                        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 font-bold"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => cancelBooking(b._id)}
                        disabled={actionLoading === b._id}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 font-bold"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}