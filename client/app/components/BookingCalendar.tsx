"use client";

import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useBookingStore } from "@/store/bookingStore";

interface Props {
  open: boolean;
  onClose: () => void;
  disabledRanges: DateRange[];
}

export default function BookingCalendar({
  open,
  onClose,
  disabledRanges,
}: Props) {
  const { startDate, endDate, setStartDate, setEndDate } =
    useBookingStore();

  if (!open) return null;

  return (
    <div className="absolute z-50 mt-2 bg-black border border-[#2a2a2a] rounded-xl p-4 shadow-xl">
      <DayPicker
        mode="range"
        numberOfMonths={2}
        selected={{
          from: startDate ?? undefined,
          to: endDate ?? undefined,
        }}
        onSelect={(range) => {
          setStartDate(range?.from ?? null);
          setEndDate(range?.to ?? null);
        }}
        disabled={disabledRanges}
      />

      <button
        onClick={onClose}
        className="mt-3 w-full bg-orange-500 py-2 rounded-lg font-bold text-black"
      >
        Done
      </button>
    </div>
  );
}