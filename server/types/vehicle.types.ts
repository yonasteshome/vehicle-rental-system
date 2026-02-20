export interface CreateVehicleInput {
  name: string;
  type: string;
  pricePerDay: number;
  imageUrl: string;       // ✅ added
  available?: boolean;
}

export interface UpdateVehicleInput {
  name?: string;
  type?: string;
  pricePerDay?: number;
  imageUrl?: string;      // ✅ added
  available?: boolean;
}