"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/api";

type PaymentMethod = "CASH" | "CARD" | "MOBILE";

export default function PaymentPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const router = useRouter();

  const [method, setMethod] = useState<PaymentMethod>("CASH");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (!bookingId) return;

    try {
      setLoading(true);
      setError("");

      await api.post(
        "/payments",
        {
          bookingId,
          method,
        },
        {
          withCredentials: true, // 🔐 httpOnly cookie auth
        }
      );

      alert("Payment successful");
      router.push("/vehicles"); // or wherever you want
    } catch (err: any) {
      setError(err?.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 space-y-6">

        <h1 className="text-2xl font-bold text-center">Payment</h1>

        <div className="text-sm text-gray-400 break-all text-center">
          Booking ID:
          <div className="font-mono text-orange-400 mt-1">
            {bookingId}
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">
            Payment Method
          </label>

          <select
            value={method}
            onChange={(e) =>
              setMethod(e.target.value as PaymentMethod)
            }
            className="w-full bg-black border border-[#2a2a2a] rounded-lg p-3"
          >
            <option value="CASH">Cash</option>
            <option value="CARD">Card</option>
            <option value="MOBILE">Mobile</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-black font-bold py-4 rounded-xl"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </main>
  );
}