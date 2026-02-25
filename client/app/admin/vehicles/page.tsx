"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import ProfileHeader from "@/app/components/profile/ProfileHeader";
import api from "@/lib/api";

interface Vehicle {
  _id: string;
  name: string;
  type: string;
  pricePerDay: number;
  available: boolean;
  imageUrl?: string;
}

const VEHICLE_TYPES = ["Luxury", "SUV", "Sport", "Electric"];

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    type: "Luxury",
    pricePerDay: "",
    imageUrl: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchVehicles = async () => {
    setLoading(true);
    const res = await api.get("/vehicles");
    setVehicles(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const submitHandler = async () => {
    const payload = {
      ...form,
      pricePerDay: Number(form.pricePerDay),
      available: true,
    };

    if (editingId) {
      await api.put(`/vehicles/${editingId}`, payload);
    } else {
      await api.post("/vehicles", payload);
    }

    setForm({
      name: "",
      type: "Luxury",
      pricePerDay: "",
      imageUrl: "",
    });
    setEditingId(null);
    fetchVehicles();
  };

  const editVehicle = (v: Vehicle) => {
    setEditingId(v._id);
    setForm({
      name: v.name,
      type: v.type,
      pricePerDay: String(v.pricePerDay),
      imageUrl: v.imageUrl || "",
    });
  };

  const deleteVehicle = async (id: string) => {
    if (!confirm("Delete this vehicle?")) return;
    await api.delete(`/vehicles/${id}`);
    fetchVehicles();
  };

  return (
    <>
      <Head>
        <title>Admin | Vehicle Management</title>
      </Head>

      <div className="bg-[#221a10] text-slate-100 h-screen overflow-hidden font-[Plus_Jakarta_Sans]">

        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-50 border-b border-[#ec9213]/10 bg-[#221a10]/80 backdrop-blur-md">
          <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">

            {/* BRAND */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#ec9213] rounded-lg flex items-center justify-center">
                <span className="material-icons text-black">
                  directions_car
                </span>
              </div>

              <div className="leading-tight">
                <div className="text-xl font-extrabold tracking-tight">
                  LUXE
                  <span className="text-[#ec9213]">DRIVE</span>
                </div>
                <div className="text-xs font-semibold text-[#ec9213] uppercase">
                  Admin Panel
                </div>
              </div>
            </div>

            <ProfileHeader />
          </div>
        </header>

        {/* ================= BODY ================= */}
        <div className="max-w-[1600px] mx-auto flex gap-8 px-6 h-[calc(100vh-5rem)]">

          {/* ================= SIDEBAR ================= */}
          <aside className="hidden lg:block w-72 py-8 space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-icons text-[#ec9213]">
                settings
              </span>
              Admin Panel
            </h3>

            <div className="p-6 rounded-xl bg-gradient-to-br from-[#ec9213] to-orange-600">
              <p className="text-xs uppercase tracking-widest font-bold">
                Vehicle Control
              </p>
              <h4 className="text-lg font-bold mt-2">
                Manage Fleet Inventory
              </h4>
            </div>
          </aside>

          {/* ================= MAIN ================= */}
          <main className="flex-1 overflow-y-auto py-8 pr-2">

            {/* FORM */}
            <div className="bg-black/40 border border-[#ec9213]/10 rounded-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Vehicle Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="bg-black/50 p-3 rounded-lg outline-none"
              />

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
                className="bg-black/50 p-3 rounded-lg outline-none"
              >
                {VEHICLE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Price Per Day"
                value={form.pricePerDay}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pricePerDay: e.target.value,
                  })
                }
                className="bg-black/50 p-3 rounded-lg outline-none"
              />

              <input
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
                className="bg-black/50 p-3 rounded-lg outline-none"
              />

              <button
                onClick={submitHandler}
                className="col-span-full bg-[#ec9213] text-black py-3 rounded-lg font-bold hover:bg-orange-500 transition"
              >
                {editingId ? "Update Vehicle" : "Create Vehicle"}
              </button>
            </div>

            {/* GRID */}
            {loading ? (
              <p className="text-slate-400">Loading vehicles...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((car) => (
                  <div
                    key={car._id}
                    className="bg-black/40 border border-[#ec9213]/10 rounded-xl overflow-hidden"
                  >
                    <div className="h-48 bg-black/30 overflow-hidden">
                      {car.imageUrl ? (
                        <img
                          src={car.imageUrl}
                          alt={car.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-icons text-6xl text-[#ec9213]/40">
                            directions_car
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl truncate">
                        {car.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {car.type}
                      </p>

                      <p className="text-[#ec9213] text-xl font-extrabold mt-2">
                        ${car.pricePerDay}
                        <span className="text-xs text-slate-400">
                          {" "}
                          / day
                        </span>
                      </p>

                      <div className="flex gap-2 mt-6">
                        <button
                          onClick={() => editVehicle(car)}
                          className="flex-1 py-2 rounded-lg bg-blue-600 font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteVehicle(car._id)}
                          className="flex-1 py-2 rounded-lg bg-red-600 font-bold"
                        >
                          Delete
                        </button>
                      </div>
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