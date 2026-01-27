import 'dotenv/config'

const envConfig = {
    PORT: Number(process.env.PORT!),
    BCRYPT_SALT: Number(process.env.BCRYPT_SALT!),
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
    // ACCESS_TOKEN_EXPIRE_IN: "1d",
    // REFRESH_TOKEN_EXPIRE_IN: "7d",
    ACCESS_TOKEN_EXPIRE_IN: 30,
    REFRESH_TOKEN_EXPIRE_IN: "7d",
    DATABASE_URL: process.env.DATABASE_URL!,
} as const

export default envConfig