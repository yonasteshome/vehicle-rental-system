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

  // ✅ Convert string → Date
  const parsedStartDate = startDate ? new Date(startDate) : undefined;
  const parsedEndDate = endDate ? new Date(endDate) : undefined;

  if (!open) return null;

  return (
    <div className="absolute z-50 mt-2 bg-black border border-[#2a2a2a] rounded-xl p-4 shadow-xl">
      <DayPicker
        mode="range"
        numberOfMonths={2}
        selected={{
          from: parsedStartDate,
          to: parsedEndDate,
        }}
        onSelect={(range) => {
          setStartDate(range?.from ? range.from.toISOString() : null);
          setEndDate(range?.to ? range.to.toISOString() : null);
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