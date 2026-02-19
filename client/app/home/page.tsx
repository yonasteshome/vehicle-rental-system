"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import api from "@/lib/api";

interface Vehicle {
  _id: string;
  name: string;
  type: string;
  pricePerDay: number;
  available: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function Page() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // 🚗 VEHICLES (PUBLIC)
      try {
        const vehicleRes = await api.get("/vehicles");
        setVehicles(vehicleRes.data.data);
      } catch (err) {
        console.error("Failed to fetch vehicles", err);
      }

      // 👤 PROFILE (COOKIE AUTH)
      try {
        const userRes = await api.get("/auth/me");
        setUser(userRes.data.data);
      } catch {
        setUser(null); // user not logged in → allowed
      }

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      <Head>
        <title>Premium Car Rental | Explorer</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-[#221a10] text-slate-100 h-screen overflow-hidden font-[Plus_Jakarta_Sans]">

        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-50 border-b border-[#ec9213]/10 bg-[#221a10]/80 backdrop-blur-md">
          <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">

            {/* BRAND */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#ec9213] rounded-lg flex items-center justify-center">
                <span className="material-icons text-black">directions_car</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                LUXE<span className="text-[#ec9213]">DRIVE</span>
              </span>
            </div>

            {/* PROFILE */}
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right leading-tight">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-[#ec9213] uppercase">
                    {user.role}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full border-2 border-[#ec9213] bg-black/40 flex items-center justify-center">
                  <span className="material-icons text-[#ec9213]">person</span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ================= BODY ================= */}
        <div className="max-w-[1600px] mx-auto flex gap-8 px-6 h-[calc(100vh-5rem)]">

          {/* ================= SIDEBAR ================= */}
          <aside className="hidden lg:block w-72 sticky top-20 h-full overflow-y-auto space-y-8 py-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-icons text-[#ec9213]">tune</span>
              Filters
            </h3>

            <div>
              <p className="text-sm font-semibold uppercase text-slate-400 mb-2">
                Vehicle Type
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["Luxury", "SUV", "Sport", "Electric"].map((t, i) => (
                  <button
                    key={t}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      i === 0
                        ? "bg-[#ec9213] text-black"
                        : "bg-black/30 border border-[#ec9213]/10 hover:bg-[#ec9213]/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-[#ec9213] to-orange-600">
              <p className="text-xs uppercase tracking-widest font-bold">
                Weekly Deal
              </p>
              <h4 className="text-lg font-bold mt-2">
                Get 20% off on Electric Fleet
              </h4>
              <button className="mt-4 bg-white text-black px-4 py-2 rounded-lg text-xs font-bold">
                Explore Now
              </button>
            </div>
          </aside>

          {/* ================= VEHICLES ================= */}
          <main className="flex-1 overflow-y-auto py-8 pr-2">
            <h1 className="text-3xl font-extrabold mb-2">
              Available Luxury Fleet
            </h1>
            <p className="text-slate-400 mb-8">
              Showing {vehicles.length} cars
            </p>

            {loading ? (
              <p className="text-slate-400">Loading vehicles...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((car) => (
                  <div
                    key={car._id}
                    className="bg-black/40 border border-[#ec9213]/10 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#ec9213]/10 transition"
                  >
                    <div className="h-48 bg-black/30 flex items-center justify-center">
                      <span className="material-icons text-6xl text-[#ec9213]/40">
                        directions_car
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl">{car.name}</h3>
                      <p className="text-sm text-slate-400">{car.type}</p>

                      <p className="text-[#ec9213] text-xl font-extrabold mt-2">
                        ${car.pricePerDay}
                        <span className="text-xs text-slate-400"> / day</span>
                      </p>

                      <button
                        disabled={!car.available}
                        className={`mt-6 w-full py-3 font-bold rounded-lg ${
                          car.available
                            ? "bg-[#ec9213] text-black hover:bg-orange-500"
                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {car.available ? "Rent Now →" : "Unavailable"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
