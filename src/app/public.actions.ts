"use server"

import { env } from "@/config/env"

const { backendApiUrl } = env

export const getGears = async (
    filters: {
        search?: string,
        category?: string,
        brand?: string,
        price?: string,
        available?: string
    }
) => {

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.set(key, value);
        }
    });

    const response = await fetch(`${backendApiUrl}/api/gears?${params.toString()}`, {
        cache: "force-cache",
        next: {
            tags: ["gears"]
        }
    })

    const result = await response.json()

    return result
}

export const getGearDetails = async (id: string) => {

    const response = await fetch(`${backendApiUrl}/api/gears/${id}`)

    const result = await response.json()

    return result
}

export const getGearCategories = async () => {

    const response = await fetch(`${backendApiUrl}/api/categories`, {
        cache: "force-cache",
        next: {
            tags: ["gear-categories"]
        }
    })

    const result = await response.json()

    return result
}