"use server"

import { provideNewAccessToken } from "@/app/(auth)/auth.actions"
import { env } from "@/config/env"
import { revalidateTag } from "next/cache"

const { backendApiUrl } = env

export const getUserAccounts = async (
    page: number,
    limit: number,
    search: string
) => {

    const accessToken = await provideNewAccessToken()

    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    if (search.trim()) {
        params.set("search", search);
    }

    const response = await fetch(`${backendApiUrl}/api/admin/users?${params.toString()}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "force-cache",
        next: {
            tags: ["user-accounts"]
        }
    })


    const result = await response.json()

    console.log(result)

    return result?.data
}

export const updateAccountStatus = async (id: string, payload: unknown) => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (result?.success) {
        revalidateTag("user-accounts", {
            expire: 0
        })
    }

    return result
}

export const getGears = async () => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/admin/gears`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        }
    })

    const result = await response.json()

    return result
}

export const getRentalOrders = async () => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/admin/rentals`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        }
    })

    const result = await response.json()

    return result
}