"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProfileHeader from "@/app/components/profile/ProfileHeader";

type VehicleType = "Luxury" | "SUV" | "Sport" | "Electric";

interface Vehicle {
  _id: string;
  name: string;
  type: VehicleType;
  pricePerDay: number;
  available: boolean;
  imageUrl: string;
}

const VEHICLE_TYPES: VehicleType[] = [
  "Luxury",
  "SUV",
  "Sport",
  "Electric",
];

const EMPTY_FORM = {
  name: "",
  type: "Luxury" as VehicleType,
  pricePerDay: 0,
  imageUrl: "",
  available: true,
};

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ================= FETCH ================= */

  const fetchVehicles = async () => {
    try {
      const res = await api.get("/vehicles", {
        withCredentials: true,
      });
      setVehicles(res.data.data);
    } catch (err) {
      alert("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  /* ================= FORM ================= */

  const submit = async () => {
    if (!form.name || !form.imageUrl || form.pricePerDay <= 0) {
      alert("Fill all fields correctly");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await api.put(
          `/vehicles/${editingId}`,
          form,
          { withCredentials: true }
        );
      } else {
        await api.post(
          "/vehicles",
          form,
          { withCredentials: true }
        );
      }

      setForm(EMPTY_FORM);
      setEditingId(null);
      fetchVehicles();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const edit = (v: Vehicle) => {
    setEditingId(v._id);
    setForm({
      name: v.name,
      type: v.type,
      pricePerDay: v.pricePerDay,
      imageUrl: v.imageUrl,
      available: v.available,
    });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this vehicle?")) return;

    try {
      await api.delete(`/vehicles/${id}`, {
        withCredentials: true,
      });
      fetchVehicles();
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="bg-[#221a10] text-slate-100 min-h-screen font-[Plus_Jakarta_Sans]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#ec9213]/10 bg-[#221a10]/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">
            Admin · Vehicles
          </h1>
          <ProfileHeader />
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-10 grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="bg-black/40 border border-[#ec9213]/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Vehicle" : "Add Vehicle"}
          </h2>

          <div className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#ec9213]/10"
              placeholder="Vehicle name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <select
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#ec9213]/10"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as VehicleType })
              }
            >
              {VEHICLE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#ec9213]/10"
              placeholder="Price per day"
              value={form.pricePerDay}
              onChange={(e) =>
                setForm({ ...form, pricePerDay: Number(e.target.value) })
              }
            />

            <input
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#ec9213]/10"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) =>
                setForm({ ...form, imageUrl: e.target.value })
              }
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) =>
                  setForm({ ...form, available: e.target.checked })
                }
              />
              Available
            </label>

            <button
              onClick={submit}
              disabled={saving}
              className="w-full py-3 rounded-lg font-bold bg-[#ec9213] text-black hover:bg-orange-500"
            >
              {editingId ? "Update Vehicle" : "Create Vehicle"}
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            vehicles.map((v) => (
              <div
                key={v._id}
                className="bg-black/40 border border-[#ec9213]/10 rounded-xl overflow-hidden"
              >
                <img
                  src={v.imageUrl}
                  alt={v.name}
                  className="h-44 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold">{v.name}</h3>
                  <p className="text-sm text-slate-400">{v.type}</p>

                  <p className="text-[#ec9213] font-extrabold mt-2">
                    ${v.pricePerDay} / day
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => edit(v)}
                      className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(v._id)}
                      className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}