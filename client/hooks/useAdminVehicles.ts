"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

/* ================= TYPES of the objects================= */

export type VehicleType = "Luxury" | "SUV" | "Sport" | "Electric";

export interface Vehicle {
  _id: string;
  name: string;
  type: VehicleType;
  pricePerDay: number;
  available: boolean;
  imageUrl: string;
}

export const VEHICLE_TYPES: VehicleType[] = [
  "Luxury",
  "SUV",
  "Sport",
  "Electric",
];

export const EMPTY_FORM = {
  name: "",
  type: "Luxury" as VehicleType,
  pricePerDay: 0,
  imageUrl: "",
  available: true,
};

/* ================= HOOK ================= */

export function useAdminVehicles() {
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
    } catch {
      alert("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  /* ================= ACTIONS ================= */

  const submit = async () => {
    if (!form.name || !form.imageUrl || form.pricePerDay <= 0) {
      alert("Fill all fields correctly again");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await api.put(`/vehicles/${editingId}`, form, {
          withCredentials: true,
        });
      } else {
        await api.post("/vehicles", form, {
          withCredentials: true,
        });
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

  const edit = (vehicle: Vehicle) => {
    setEditingId(vehicle._id);
    setForm(vehicle);
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

  return {
    vehicles,
    loading,
    saving,
    form,
    editingId,
    setForm,
    submit,
    edit,
    remove,
  };
}
