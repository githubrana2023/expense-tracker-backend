
import { sign } from "hono/jwt"
import { addDays, addMinutes, addSeconds } from 'date-fns'
import envConfig, { EnvConfigKeys } from "@/config/envConfig"


type Secret = {
    secret: Extract<EnvConfigKeys, 'ACCESS_TOKEN_SECRET' | 'REFRESH_TOKEN_SECRET'>,
    expireIn: Extract<EnvConfigKeys, 'ACCESS_TOKEN_EXPIRE_IN' | 'REFRESH_TOKEN_EXPIRE_IN'>
}

export const generateToken = async (payload: Record<string, unknown>, { secret, expireIn }: Secret) => {
    const test = true

    const now = Date.now()
    const iat = Math.floor(now / 1000)
    const tempExp = test ? addSeconds(new Date(now), 30).getTime() : addDays(new Date(now), envConfig[expireIn]).getTime()
    const exp = tempExp / 1000

    const token = await sign({
        ...payload,
        iat,
        exp,
    }, envConfig[secret], 'HS256')

    return token
}

export const isTokenStartWithBearer = (token: string) => token.startsWith('Bearer ')


export const tryCatch = async <T,>(promise: Promise<T>) => {
    try {
        const data = await promise
        return {
            error: null,
            data
        }
    } catch (error) {
        return {
            data: null,
            error
        }
    }
}