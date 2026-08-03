import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { JwtPayload } from "jsonwebtoken"
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { renewAccessToken } from '@/app/(auth)/auth.actions'


// This function can be marked `async` if using `await` inside

const AUTH_ROUTES = ["/auth"]

const PUBLIC_ROUTES = ['/', "/gears", ...AUTH_ROUTES]

export async function proxy(request: NextRequest) {

    const refreshToken = request.cookies.get("refreshToken")?.value
    let accessToken = request.cookies.get("accessToken")?.value

    console.log(accessToken)

    const verifiedRefreshToken = refreshToken ? await verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload : null

    let verifiedAccessToken = accessToken ? await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!) as JwtPayload : null

    const cookieStore = await cookies()

    if (verifiedAccessToken?.errors || typeof verifiedAccessToken === "string") {
        cookieStore.delete("accessToken")
    }
    if (verifiedRefreshToken?.errors || typeof verifiedRefreshToken === "string") {
        cookieStore.delete("refreshToken")
    }

    const pathname = request.nextUrl.pathname

    const now = Math.floor(Date.now() / 1000)
    const expiredAccessToken = !verifiedAccessToken || typeof verifiedAccessToken === "string" || (verifiedAccessToken.exp ?? 0) < now
    const expiredRefreshToken = !verifiedRefreshToken || typeof verifiedRefreshToken === "string" || (verifiedRefreshToken.exp ?? 0) < now

    if (expiredAccessToken && !expiredRefreshToken) {
        const result = await renewAccessToken()

        if (result?.success) {

            const newAccessToken = await result?.data

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24
            })

            accessToken = newAccessToken
            verifiedAccessToken = await verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET!) as JwtPayload
        }
    }

    let userRole;

    const isPublicRoute = PUBLIC_ROUTES.some(route => (route === pathname && route === "/") || (pathname.startsWith(route) && route !== "/"))
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))

    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set("redirectTo", pathname)
        return NextResponse.redirect(loginUrl)
    }

    if (accessToken) {
        userRole = verifiedAccessToken?.role
    }

    if (accessToken && isAuthRoute) {

        if (userRole === "CUSTOMER") {
            return NextResponse.redirect(new URL("/dashboard/customer", request.url))
        }
        else if (userRole === "PROVIDER") {
            return NextResponse.redirect(new URL("/dashboard/provider", request.url))
        }
        else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard/admin", request.url))
        }
    }

    if (accessToken) {
        if (userRole !== "CUSTOMER" && (pathname.startsWith("/dashboard/customer") || pathname.startsWith("/payment"))) {
            return NextResponse.redirect(new URL("/not-found", request.url))
        }
        else if (userRole !== "PROVIDER" && pathname.startsWith("/dashboard/provider")) {
            return NextResponse.redirect(new URL("/not-found", request.url))
        }
        else if (userRole !== "ADMIN" && pathname.startsWith("/dashboard/admin")) {
            return NextResponse.redirect(new URL("/not-found", request.url))
        }
    }
    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        "/auth/:path*",
        "/dashboard/:path*"
    ]
}
