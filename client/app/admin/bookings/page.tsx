"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

interface Booking {
  _id: string;
  vehicle: {
    name: string;
    imageUrl: string;
    pricePerDay: number;
  };
  startDate: string;
  endDate: string;
  status: BookingStatus;
}

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/my", {
        withCredentials: true, // 🔒 HttpOnly cookie
      });
      setBookings(res.data.data);
    } catch (err) {
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= ACTIONS ================= */
  const cancelBooking = async (id: string) => {
    if (!confirm("Cancel this booking?")) return;

    try {
      await api.put(
        `/bookings/my/${id}/cancel`,
        {},
        { withCredentials: true }
      );
      fetchBookings();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Cancel failed");
    }
  };

  const payNow = (id: string) => {
    // ⚠️ frontend only redirect (NO backend call)
    router.push(`/payment/${id}`);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#221a10] text-slate-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8">My Bookings</h1>

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
                {/* IMAGE */}
                <img
                  src={b.vehicle.imageUrl}
                  alt={b.vehicle.name}
                  className="w-40 h-28 object-cover rounded-xl"
                />

                {/* INFO */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{b.vehicle.name}</h2>

                  <p className="text-sm text-slate-400">
                    {new Date(b.startDate).toDateString()} →{" "}
                    {new Date(b.endDate).toDateString()}
                  </p>

                  <p className="mt-2 font-bold text-[#ec9213]">
                    ${b.vehicle.pricePerDay} / day
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold
                      ${
                        b.status === "PENDING"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : b.status === "CONFIRMED"
                          ? "bg-green-500/20 text-green-400"
                          : b.status === "CANCELLED"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-slate-500/20 text-slate-300"
                      }
                    `}
                  >
                    {b.status}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3 justify-center">
                  {b.status === "PENDING" && (
                    <button
                      onClick={() => payNow(b._id)}
                      className="px-5 py-2 rounded-lg font-bold bg-[#ec9213] text-black hover:bg-orange-500"
                    >
                      Pay Now
                    </button>
                  )}

                  {b.status === "PENDING" && (
                    <button
                      onClick={() => cancelBooking(b._id)}
                      className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500"
                    >
                      Cancel
                    </button>
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