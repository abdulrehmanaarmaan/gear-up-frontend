"use server"

import jwt from "jsonwebtoken"

export const verifyToken = async (jwtToken: string, jwtSecret: string) => {

    try {
        const verifiedToken = jwt.verify(jwtToken, jwtSecret)
        return verifiedToken
    }
    catch (error) {
        return {
            errors: error
        }
    }
}