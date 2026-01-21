import 'dotenv/config'

const envConfig = {
    PORT: Number(process.env.PORT!),
    BCRYPT_SALT: Number(process.env.BCRYPT_SALT!),
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
    ACCESS_TOKEN_EXPIRE_IN: 1,
    REFRESH_TOKEN_EXPIRE_IN: 7,
    DATABASE_URL: process.env.DATABASE_URL!,
} as const
export type EnvConfig = typeof envConfig
export type EnvConfigKeys = keyof EnvConfig
export default envConfig