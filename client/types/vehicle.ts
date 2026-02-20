export interface Vehicle {
  _id: string;
  name: string;
  type: string;
  pricePerDay: number;
  available: boolean;
  imageUrl?: string;
}

export type VehicleType = "All" | "Luxury" | "SUV" | "Sport" | "Electric";