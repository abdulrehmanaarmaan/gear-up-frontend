import z from "zod";

// Zod Schema matching Prisma User Model
export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(8, "Phone number is required"),
    role: z.enum(["CUSTOMER", "PROVIDER", "ADMIN"]),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    image: z.string().url().optional().or(z.literal("")),
});

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});
