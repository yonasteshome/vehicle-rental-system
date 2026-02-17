export interface CreateVehicleInput {
  name: string;
  type: string;
  pricePerDay: number;
  available?: boolean;
}

export interface UpdateVehicleInput {
  name?: string;
  type?: string;
  pricePerDay?: number;
  available?: boolean;
}
