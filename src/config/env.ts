function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const env = {

    backendApiUrl: getEnv("BACKEND_API_URL"),

    jwtAccessSecret: getEnv("JWT_ACCESS_SECRET"),

    jwtRefreshSecret: getEnv("JWT_REFRESH_SECRET"),

} as const;