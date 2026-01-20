import 'dotenv/config'

const envConfig = {
    PORT: Number(process.env.PORT!),
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
    DATABASE_URL: process.env.DATABASE_URL!,
}

export default envConfig