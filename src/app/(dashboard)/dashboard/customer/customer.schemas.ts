import { z } from "zod";

export const reviewSchema = z.object({
    gearId: z.string().uuid(),
    rentalOrderId: z.string().uuid(),
    rating: z.number().min(1).max(5),
    review: z
        .string()
        .trim()
        .min(20, "Review must be at least 20 characters.")
        .max(500, "Maximum 500 characters."),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;