import z from "zod";
import { GearCondition } from "./provider.types";

export const gearSchema = z.object({
    categoryId: z.string().min(1),
    title: z.string().min(3),
    description: z.string().min(20),
    brand: z.string().min(2),
    model: z.string().optional(),
    condition: z.nativeEnum(GearCondition).optional(),
    pricePerDay: z.coerce.number().min(50, "Daily rental price must be at least ৳50.").positive(),
    quantity: z.coerce.number().int().positive(),
    location: z.string().min(5),
    images: z.array(z.string().url())
        .min(1, "At least one image is required")
        .max(6),
    specifications: z.record(
        z.string(),
        z.union([
            z.string(),
            z.number(),
            z.boolean(),
            z.null()
        ])
    )
        .optional(),
})

export type GearFormValues = z.infer<typeof gearSchema>;

export const updateGearSchema = gearSchema.extend({
    slug: z.string(),
    isAvailable: z.boolean(),
})

export type UpdateGearFormValues = z.infer<typeof updateGearSchema>

