import { sign } from "hono/jwt"
import envConfig, { EnvConfigKeys } from "../config/envConfig"

export const dayInMiliseconds = (day: number) => 60 * 60 * 24 * day
export const addDay = (currentDate: Date, additionalDay: number) => new Date(currentDate.getTime() + additionalDay).getTime()

type Secret = {
    secret: Extract<EnvConfigKeys, 'ACCESS_TOKEN_SECRET' | 'REFRESH_TOKEN_SECRET'>,
    expireIn: Extract<EnvConfigKeys, 'ACCESS_TOKEN_EXPIRE_IN' | 'REFRESH_TOKEN_EXPIRE_IN'>
}

export const generateToken = async (payload: unknown, { secret, expireIn }: Secret) => {
    const now = new Date()

    const token = await sign({
        sub: payload,
        iat: now.getTime(),
        exp: addDay(now, dayInMiliseconds(envConfig[expireIn]))
    }, envConfig[secret])

    return token
}

export const isTokenStartWithBearer = (token: string) => token.startsWith('Bearer ')