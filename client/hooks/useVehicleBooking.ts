"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";

import api from "@/lib/api";
import { Vehicle, Booking } from "@/types/booking";
import { useBookingStore } from "@/store/bookingStore";

/* ================= HOOK RETURN TYPE ================= */

export interface UseVehicleBookingReturn {
  vehicle: Vehicle | null;
  loading: boolean;
  bookingLoading: boolean;

  startDate: string;
  endDate: string;
  status: string | null;

  days: number;
  totalPrice: number;
  canBook: boolean;

  setStartDate: (v: string) => void;
  setEndDate: (v: string) => void;

  book: () => Promise<void>;
  goToPayment: () => void;
}

/* ================= HOOK ================= */

export function useVehicleBooking(): UseVehicleBookingReturn {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    startDate,
    endDate,
    status,
    bookingId,
    setStartDate,
    setEndDate,
    setStatus,
    setBookingId,
    reset,
  } = useBookingStore();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);

  /* ========== FETCH VEHICLE + EXISTING BOOKING ========== */

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const [vehicleRes, bookingsRes] = await Promise.all([
          api.get(`/vehicles/${id}`),
          api.get(`/bookings/my`, { withCredentials: true }),
        ]);

        setVehicle(vehicleRes.data.data);

        const existing: Booking | undefined =
          bookingsRes.data.data.find(
            (b: Booking) => b.vehicle?._id === id
          );

        if (existing) {
          setStartDate(existing.startDate.slice(0, 10));
          setEndDate(existing.endDate.slice(0, 10));
          setStatus(existing.status);
          setBookingId(existing._id);
        } else {
          reset();
        }
      } catch (error) {
        console.error(error);
        reset();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, reset, setStartDate, setEndDate, setStatus, setBookingId]);

  /* ========== PRICE CALCULATION ========== */

  const days = useMemo<number>(() => {
    if (!startDate || !endDate) return 0;

    const diff = differenceInCalendarDays(
      new Date(endDate),
      new Date(startDate)
    );

    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  const totalPrice = useMemo<number>(() => {
    return vehicle ? days * vehicle.pricePerDay : 0;
  }, [days, vehicle]);

  /* ========== BOOKING RULES ========== */

  const canBook =
    Boolean(startDate) &&
    Boolean(endDate) &&
    days > 0 &&
    Boolean(vehicle?.available) &&
    !bookingLoading &&
    (!status || status === "PENDING");

  /* ========== ACTIONS ========== */

  const book = async (): Promise<void> => {
    if (!vehicle || !canBook) return;

    try {
      setBookingLoading(true);

      const res = await api.post(
        "/bookings",
        {
          vehicleId: vehicle._id,
          startDate,
          endDate,
        },
        { withCredentials: true }
      );

      setStatus(res.data.data.status);
      setBookingId(res.data.data._id);
      alert("Booking successful");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  const goToPayment = (): void => {
    if (!bookingId) return;
    router.push(`/payment/${bookingId}`);
  };

  return {
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
  };
}