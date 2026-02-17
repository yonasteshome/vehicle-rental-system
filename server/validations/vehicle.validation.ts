import { z } from "zod";

export const createVehicleSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    type: z.string().min(2),
    pricePerDay: z.number().positive(),
    available: z.boolean().optional(),
  }),
});

export const updateVehicleSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    pricePerDay: z.number().positive().optional(),
    available: z.boolean().optional(),
  }),
});
