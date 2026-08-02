"use server"

import { env } from "@/config/env"
import { gearSchema, updateGearSchema } from "./provider.schemas"
import { IGear, IUpdateGear } from "./provider.types"
import { provideNewAccessToken } from "@/app/(auth)/auth.actions"
import { revalidateTag } from "next/cache"

const { backendApiUrl } = env

export const getMyRentalOrders = async () => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/provider/orders`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "force-cache",
        next: {
            tags: ["provider-orders"]
        }
    })

    const result = await response.json()

    return result
}

export const getMyGears = async () => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/provider/gears`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "force-cache",
        next: {
            tags: ["provider-gears"]
        }
    })

    const result = await response.json()

    return result
}

export const updateOrderStatus = async (id: string, payload: unknown) => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/provider/orders/${id}`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (result?.success) {
        revalidateTag("provider-orders", {
            expire: 0
        })
    }

    return result
}

export const addGear = async (payload: IGear) => {
    console.log("Incoming payload:", payload);

    const parsed = gearSchema.safeParse(payload)

    console.log("Parsed:", parsed.success ? parsed.data : parsed.error);

    if (!parsed.success) {
        return {
            success: false,
            message: "Invalid gear data.",
            errors: parsed.error.flatten().fieldErrors
        }
    }

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/provider/gear`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (result?.success) {
        revalidateTag("provider-gears", {
            expire: 0
        }
        )
    }

    return result
}

export const editMyGear = async (id: string, payload: IUpdateGear) => {

    const parsed = updateGearSchema.safeParse(payload)

    if (!parsed.success) {
        return {
            success: false,
            message: "Invalid gear data.",
            errors: parsed.error.flatten().fieldErrors
        }
    }

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/provider/gear/${id}`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (result?.success) {
        revalidateTag("provider-gears", {
            expire: 0
        }
        )
    }

    return result
}

export const removeMyGear = async (id: string) => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/provider/gear/${id}`, {
        method: "DELETE",
        headers: {
            Cookie: `accessToken=${accessToken}`
        }
    })

    const result = await response.json()

    if (result?.success) {
        revalidateTag("provider-gears", {
            expire: 0
        }
        )
    }

    return result
}