"use client";

import { useVehicleBooking } from "@/hooks/useVehicleBooking";

/* ================= PAGE ================= */

export default function VehicleDetailPage() {
  const {
    vehicle,
    loading,
    bookingLoading,
    startDate,
    endDate,
    status,
    days,
    totalPrice,
    canBook,
    setStartDate,
    setEndDate,
    book,
    goToPayment,
  } = useVehicleBooking();

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

            {/* BOOK */}
            <button
              onClick={book}
              disabled={!canBook}
              className="w-full bg-orange-400 hover:bg-orange-500 disabled:opacity-40 text-black font-bold py-4 rounded-xl"
            >
              {bookingLoading
                ? "Booking..."
                : status && status !== "PENDING"
                ? "Booking Locked"
                : "Confirm Booking"}
            </button>

            {/* PAY */}
            {status === "CONFIRMED" && (
              <button
                onClick={goToPayment}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl"
              >
                Pay Now
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