"use client";

import ProfileHeader from "@/app/components/profile/ProfileHeader";
import {
  useAdminVehicles,
  VEHICLE_TYPES,
  Vehicle,
  VehicleType,
} from "../../../hooks/useAdminVehicles";

export default function AdminVehiclesPage() {
  const {
    vehicles,
    loading,
    saving,
    form,
    editingId,
    setForm,
    submit,
    edit,
    remove,
  } = useAdminVehicles();

  return (
    <div className="bg-[#221a10] text-slate-100 min-h-screen font-[Plus_Jakarta_Sans] overflow-hidden">

      {/* HEADER */}
      <header className="sticky top-0 z-50 h-20 border-b border-[#ec9213]/10 bg-[#221a10]/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Admin · Vehicle Management
          </h1>
          <ProfileHeader />
        </div>
      </header>

      {/* BODY */}
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 xl:grid-cols-3 gap-8 h-[calc(100vh-5rem)]">

        {/* LEFT — FIXED FORM */}
        <aside className="xl:col-span-1 py-8">
          <div className="sticky top-28 bg-gradient-to-br from-black/50 to-black/30 border border-[#ec9213]/10 rounded-2xl p-8 shadow-xl">

            <h2 className="text-xl font-bold mb-6">
              {editingId ? "Edit Vehicle" : "Create Vehicle"}
            </h2>

            <div className="space-y-5">
              <input
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#ec9213]/10 focus:outline-none focus:ring-2 focus:ring-[#ec9213]"
                placeholder="Vehicle name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <select
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#ec9213]/10"
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as VehicleType,
                  })
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
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#ec9213]/10"
                placeholder="Price per day"
                value={form.pricePerDay}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pricePerDay: Number(e.target.value),
                  })
                }
              />

              <input
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#ec9213]/10"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
              />

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      available: e.target.checked,
                    })
                  }
                />
                Available for booking
              </label>

              <button
                onClick={submit}
                disabled={saving}
                className="w-full py-3 rounded-xl font-bold bg-[#ec9213] text-black hover:bg-orange-500 transition"
              >
                {editingId ? "Update Vehicle" : "Create Vehicle"}
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT — SCROLLABLE LIST */}
        <main className="xl:col-span-2 py-8 overflow-y-auto pr-2">
          {loading ? (
            <p className="text-slate-400">Loading vehicles…</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicles.map((v: Vehicle) => (
                <div
                  key={v._id}
                  className="group bg-black/40 border border-[#ec9213]/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#ec9213]/10 transition"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={v.imageUrl}
                      alt={v.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold">{v.name}</h3>
                    <p className="text-sm text-slate-400">{v.type}</p>

                    <p className="text-[#ec9213] font-extrabold">
                      ${v.pricePerDay} / day
                    </p>

                    <div className="flex gap-3 pt-4">
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
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}