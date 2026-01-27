import { sign, verify, decode } from 'jsonwebtoken'
import envConfig from "@/config/envConfig"
import { Secret } from '@/types/token'




export const generateToken = async (payload: Record<string, unknown>, { secret, expireIn }: Secret) => {
    const token = sign(payload, envConfig[secret], {
        expiresIn: envConfig[expireIn],
    })

    return token
}

export const isTokenStartWithBearer = (token: string) => token.startsWith('Bearer ')
