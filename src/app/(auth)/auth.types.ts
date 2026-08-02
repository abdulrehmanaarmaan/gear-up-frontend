import z from "zod"
import { registerSchema } from "./auth.schemas"
import { IGearResponse } from "../(dashboard)/dashboard/provider/provider.types"
import { IRentalOrder } from "../(dashboard)/dashboard/customer/customer.interfaces"

export interface PrevState {
    success: boolean
    statusCode: number
    message: string
}

export type RegisterFormValues =
    z.infer<typeof registerSchema>;

export interface IUserAccount {
    id?: string
    name: string
    email: string
    password: string
    phone?: string
    image?: string
    role?: string
    isVerified?: string
    createdAt?: string
    gearItems?: IGearResponse[]
    providerOrders?: IRentalOrder[]
    customerOrders?: IRentalOrder[]
    status?: string
    address?: string
    city?: string
    country?: string
}