"use client";

// hooks/useVehicles.ts

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Vehicle, VehicleType } from "@/types/vehicle";

export function useVehicles() {
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedType, setSelectedType] = useState<VehicleType>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const res = await api.get("/vehicles");
        setAllVehicles(res.data.data);
        setVehicles(res.data.data); // initially ALL
      } catch (err) {
        console.error("Failed to fetch vehicles", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // 🔥 SAME FILTER LOGIC AS ORIGINAL
  useEffect(() => {
    if (selectedType === "All") {
      setVehicles(allVehicles);
    } else {
      setVehicles(
        allVehicles.filter(
          (v) =>
            v.type.toLowerCase() === selectedType.toLowerCase()
        )
      );
    }
  }, [selectedType, allVehicles]);

  return {
    vehicles,
    selectedType,
    setSelectedType,
    loading,
    total: vehicles.length,
  };
}