import { EnvConfigKeys } from "./env-config"

export type TokenKey = Extract<EnvConfigKeys, 'ACCESS_TOKEN_SECRET' | 'REFRESH_TOKEN_SECRET'>
export type TokenExpireInKey = Extract<EnvConfigKeys, 'ACCESS_TOKEN_EXPIRE_IN' | 'REFRESH_TOKEN_EXPIRE_IN'>

export type Secret = {
    secret: TokenKey
    expireIn: TokenExpireInKey
}