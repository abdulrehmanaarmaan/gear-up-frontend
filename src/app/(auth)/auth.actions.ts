"use server"

import { env } from "@/config/env"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { IUserAccount, PrevState } from "./auth.types"
import { loginSchema } from "./auth.schemas"
import { verifyToken } from "../../lib/jwt"
import { JwtPayload } from "jsonwebtoken"
import { revalidateTags } from "@/lib/revalidate"

const { backendApiUrl, jwtAccessSecret } = env

export const register = async (payload: IUserAccount) => {

    const response = await fetch(`${backendApiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (result?.success) {

        revalidateTags([
            "user-accounts"
        ])

        redirect("/auth/login?registered=true", "replace")
    }

    return result
}

export const login = async (redirectTo: string, prevState: PrevState, formData: FormData) => {

    const values = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const validated =
        loginSchema.safeParse(values);

    if (!validated?.success) {

        return {
            success: false,
            message: "Please correct the highlighted fields.",
            errors:
                validated.error.flatten().fieldErrors,
        };

    }

    const { data } = validated;

    const response = await fetch(`${backendApiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    const cookieStore = await cookies()

    if (result?.success) {

        const { data } = await result

        const { accessToken, refreshToken, loggedUser } = await data

        const verifiedToken = await verifyToken(accessToken, jwtAccessSecret!) as JwtPayload
        // console.log('verifiedToken', verifiedToken)
        if (verifiedToken?.errors || typeof verifiedToken === "string") {
            throw new Error("The token provided is invalid.")
        }

        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24
        })

        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        })

        if (redirectTo) {
            redirect(redirectTo, "replace")
        }

        const { role } = await loggedUser

        if (role === "ADMIN") {
            redirect("/dashboard/admin", "replace")
        }
        else if (role === "PROVIDER") {
            redirect("/dashboard/provider", "replace")
        }
        else if (role === "CUSTOMER") {
            redirect("/dashboard/customer", "replace")
        }
    }

    return result
}

export const getMyAccount = async () => {

    const accessToken = await provideNewAccessToken()

    const response = await fetch(`${backendApiUrl}/api/auth/me`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "force-cache",
        next: {
            tags: ["my-account"]
        }
    })

    const result = await response.json()
    return result
}

export const logout = async () => {

    const cookieStore = await cookies()

    cookieStore.delete("accessToken")
    cookieStore.delete("refreshToken")

    return {
        success: true,
        message: "Logged out successfully."
    }
}

export const renewAccessToken = async () => {

    const cookieStore = await cookies()

    const refreshToken = cookieStore.get("refreshToken")?.value

    const response = await fetch(`${backendApiUrl}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            Cookie: `refreshToken=${refreshToken}`
        }
    })

    const result = await response.json()

    return result
}

export const provideNewAccessToken = async () => {

    const cookieStore = await cookies()

    const refreshToken = cookieStore?.get("refreshToken")?.value
    let accessToken = cookieStore?.get("accessToken")?.value

    // console.log('access', accessToken)
    const verifiedRefreshToken = refreshToken ? await verifyToken(refreshToken, process.env.
        JWT_REFRESH_SECRET!) as JwtPayload : null
    // console.log(verifiedRefreshToken)
    const verifiedAccessToken = accessToken ? await verifyToken(accessToken, process.env.
        JWT_ACCESS_SECRET!) as JwtPayload : null

    if (verifiedAccessToken?.errors || typeof verifiedAccessToken === "string") {
        cookieStore.delete("accessToken")
    }
    if (verifiedRefreshToken?.errors || typeof verifiedRefreshToken === "string") {
        cookieStore.delete("refreshToken")
    }

    const now = Math.floor(Date.now() / 1000)
    const expiredAccessToken = !verifiedAccessToken || typeof verifiedAccessToken === "string" ||
        (verifiedAccessToken.exp ?? 0) < now
    const expiredRefreshToken = !verifiedRefreshToken || typeof verifiedRefreshToken === "string" ||
        (verifiedRefreshToken.exp ?? 0) < now
    // console.log("decoded", verifiedAccessToken)
    if (expiredAccessToken && !expiredRefreshToken) {
        const result = await renewAccessToken()
        if (result?.success) {

            const refreshedToken = await result?.data
            cookieStore.set("accessToken", refreshedToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax"
            })
            accessToken = refreshedToken
            // verifiedAccessToken = await verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET!) as
            // JwtPayload
        }
    }

    return accessToken
}