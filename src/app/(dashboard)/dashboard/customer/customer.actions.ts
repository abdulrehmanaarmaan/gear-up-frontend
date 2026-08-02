"use server"

import { PrevState } from "@/app/(auth)/auth.types"
import { createRentalSchema } from "@/app/(marketing)/marketing.schemas"
import { env } from "@/config/env"
import { redirect } from "next/navigation"
import { reviewSchema } from "./customer.schemas"
import { provideNewAccessToken } from "@/app/(auth)/auth.actions"

const { backendApiUrl } = env

export const createRentalOrder = async (payload: unknown) => {

    const parsed = createRentalSchema.safeParse(payload)

    if (!parsed.success) {
        return { success: false, message: "Invalid rental data.", errors: parsed.error.flatten().fieldErrors }
    }

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/rentals`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json()

    return result
}

export const getMyOrders = async () => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/rentals`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        }
    })

    const result = await response.json()

    return result
}

export const getOrderDetails = async (id: string) => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/rentals/${id}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
        }
    })

    const result = await response.json()

    return result
}

export const createPayment = async (payload: unknown) => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/payments/create`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (result?.success) {
        redirect(result?.data?.checkoutUrl)
    }

    return result
}

export const getMyPayments = async () => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/payments`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
        }
    })

    const result = await response.json()

    return result
}

export const getPaymentDetails = async (id: string) => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/payments/${id}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
        }
    })

    const result = await response.json()

    return result
}

export const leaveReview = async (prevState: PrevState, formData: FormData) => {

    const values = {
        gearId: formData.get("gearId"),
        rentalOrderId: formData.get("rentalOrderId"),

        rating: Number(formData.get("rating")),

        review: formData.get("review"),
    };

    const parsed = reviewSchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    const { data } = parsed;

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/reviews`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    return result
}

export const checkoutRentalOrder = async (id: string) => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/payments/create`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            rentalOrderId: id,
        }),
    }
    );

    const result = await response.json()

    console.log(result)

    return result
}


