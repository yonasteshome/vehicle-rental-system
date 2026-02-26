"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ================= TYPES  of interface================= */

interface AdminStats {
  totalRevenue: number;
  totalBookings: number;
  totalVehicles: number;
  totalUsers: number;
}

/* ================= PAGE ================= */

export default function AdminReportsPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  const loadStats = async () => {
    try {
      const res = await api.get("/reports/stats");

      setStats(res.data.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  /* ================= CHART DATA ================= */

  const chartData = stats
    ? [
        {
          name: "Bookings",
          value: stats.totalBookings,
        },
        {
          name: "Vehicles",
          value: stats.totalVehicles,
        },
        {
          name: "Users",
          value: stats.totalUsers,
        },
      ]
    : [];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#221a10] text-white p-8">

      {/* HEADER */}
      <header className="mb-10">

        <h1 className="text-3xl font-bold mb-1">
          Admin Analytics
        </h1>

        <p className="text-slate-400">
          Business performance overview
        </p>

      </header>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-20 text-[#ec9213] font-semibold">
          Loading statistics...
        </div>
      )}

      {/* CONTENT */}
      {!loading && stats && (
        <div className="space-y-10">

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="Total Revenue"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              highlight
            />

            <StatCard
              title="Bookings"
              value={stats.totalBookings}
            />

            <StatCard
              title="Vehicles"
              value={stats.totalVehicles}
            />

            <StatCard
              title="Users"
              value={stats.totalUsers}
            />

          </section>

          {/* ================= CHART ================= */}
          <section
            className="
              bg-black/40 border border-[#ec9213]/20
              rounded-2xl p-6
            "
          >

            <h2 className="text-xl font-bold mb-6">
              Platform Overview
            </h2>

            <div className="w-full h-[320px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={chartData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#ec9213"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </section>

        </div>
      )}

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
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`
        p-6 rounded-2xl border
        bg-black/40
        ${
          highlight
            ? "border-[#ec9213]/60 shadow-[0_0_20px_#ec921330]"
            : "border-[#ec9213]/20"
        }
      `}
    >
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}