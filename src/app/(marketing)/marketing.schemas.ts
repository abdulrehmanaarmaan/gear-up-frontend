import { z } from "zod"

export const createRentalSchema = z.object({
    gearId: z.string().uuid(),
    quantity: z.coerce.number().int().positive(),
    rentalStartDate: z.string().min(1, "Start date is required"),
    rentalEndDate: z.string().min(1, "End date is required"),
    pickupAddress: z.string().min(5, "Pickup address is required"),
    notes: z.string().optional(),
}).refine(
    (data) => new Date(data.rentalEndDate).getTime() > new Date(data.rentalStartDate).getTime(),
    { message: "End date must be after start date", path: ["rentalEndDate"] }
)

export type CreateRentalFormValues = z.infer<typeof createRentalSchema>