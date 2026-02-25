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
  _id: string;
  name: string;
  imageUrl?: string;
}

interface Booking {
  _id: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  vehicle: Vehicle | null;
  user?: {
    email: string;
  };
}

/* ================= PAGE ================= */

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  /* ================= FETCH ================= */

  const loadBookings = async () => {
    try {
      const res = await api.get("/bookings", { withCredentials: true });
      setBookings(res.data.data);
      setIsAdmin(true);
    } catch {
      const res = await api.get("/bookings/my", { withCredentials: true });
      setBookings(res.data.data);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  /* ================= ACTIONS ================= */

  const confirmBooking = async (id: string) => {
    await api.put(`/bookings/${id}/confirm`, {}, { withCredentials: true });
    loadBookings();
  };

  const cancelBooking = async (id: string) => {
    const url = isAdmin
      ? `/bookings/${id}/cancel`
      : `/bookings/my/${id}/cancel`;

    await api.put(url, {}, { withCredentials: true });
    loadBookings();
  };

  /* ================= STATS ================= */

  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;
  const cancelled = bookings.filter((b) => b.status === "CANCELLED").length;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#221a10] text-white font-[Plus_Jakarta_Sans]">

      {/* HEADER */}
      <header className="h-20 border-b border-[#ec9213]/20 bg-[#221a10]/90">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold">
              {isAdmin ? "Booking Management" : "My Reservations"}
            </h1>
            <p className="text-sm text-slate-400">
              Monitor and manage rental activity
            </p>
          </div>

          <ProfileHeader />
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">

        {/* STATS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <StatCard title="Total" value={total} />
          <StatCard title="Pending" value={pending} highlight />
          <StatCard title="Confirmed" value={confirmed} />
          <StatCard title="Cancelled" value={cancelled} />

        </section>

        {/* TABLE */}
        <section className="bg-black/40 border border-[#ec9213]/20 rounded-2xl overflow-hidden">

          {loading ? (
            <div className="p-12 text-center text-slate-400">
              Loading bookings...
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              No bookings found
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                {/* HEAD */}
                <thead className="bg-black/60 border-b border-[#ec9213]/20">

                  <tr className="text-left text-slate-300">

                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Dates</th>
                    <th className="p-4">Status</th>

                    {isAdmin && (
                      <th className="p-4">User</th>
                    )}

                    <th className="p-4 text-right">Actions</th>

                  </tr>

                </thead>

                {/* BODY */}
                <tbody>

                  {bookings.map((b) => (
                    <tr
                      key={b._id}
                      className="border-b border-[#ec9213]/10 hover:bg-white/5 transition"
                    >

                      {/* IMAGE */}
                      <td className="p-4">
                        {b.vehicle?.imageUrl ? (
                          <img
                            src={b.vehicle.imageUrl}
                            className="w-20 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-20 h-12 bg-black/30 rounded-lg flex items-center justify-center text-xs text-slate-400">
                            No Image
                          </div>
                        )}
                      </td>

                      {/* NAME */}
                      <td className="p-4 font-semibold">
                        {b.vehicle?.name ?? "Deleted"}
                      </td>

                      {/* DATE */}
                      <td className="p-4 text-slate-400">
                        {new Date(b.startDate).toLocaleDateString()} →
                        {new Date(b.endDate).toLocaleDateString()}
                      </td>

                      {/* STATUS */}
                      <td className="p-4">
                        <StatusBadge status={b.status} />
                      </td>

                      {/* USER */}
                      {isAdmin && (
                        <td className="p-4 text-slate-400 text-xs">
                          {b.user?.email}
                        </td>
                      )}

                      {/* ACTIONS */}
                      <td className="p-4 text-right space-x-2">

                        {isAdmin && b.status === "PENDING" && (
                          <button
                            onClick={() => confirmBooking(b._id)}
                            className="px-3 py-1 rounded-md bg-green-500 text-black text-xs font-bold hover:bg-green-600"
                          >
                            Confirm
                          </button>
                        )}

                        {b.status !== "CANCELLED" && (
                          <button
                            onClick={() => cancelBooking(b._id)}
                            className="px-3 py-1 rounded-md bg-red-600 text-xs font-bold hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        )}

                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>

            </div>
          )}

        </section>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  highlight,
}: {
  title: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`
        p-6 rounded-2xl border
        bg-black/40
        ${highlight
          ? "border-[#ec9213]/60 shadow-[0_0_20px_#ec921330]"
          : "border-[#ec9213]/20"}
      `}
    >
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
    CONFIRMED: "bg-green-500/20 text-green-400 border-green-500/40",
    CANCELLED: "bg-red-500/20 text-red-400 border-red-500/40",
    COMPLETED: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full border font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}