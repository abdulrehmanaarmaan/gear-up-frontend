import { IUserAccount } from "@/app/(auth)/auth.types"
import { IGearResponse } from "../provider/provider.types"

export interface IReview {
    gearId: string
    rentalOrderId: string
    rating: number
    review: string
}

export interface IRentalOrder {
    id: string
    gearId: string
    totalDays: number
    totalAmount: number
    status: string
    subtotal: number
    payment: {
        status: string
        amount: number
        method: string
    }
    serviceFee: number
    provider: IUserAccount
    customer: IUserAccount
    pricePerDay: number
    gear: IGearResponse
    quantity: number
    rentalStartDate: string
    rentalEndDate: string
    pickupAddress: string
    notes?: string
    createdAt: string
}