import db from "@/drizzle/db"
import { userTable } from "@/drizzle/schema"
import { verifyToken } from "@/libs/jwt/verify-token"
import { AppError, isTokenStartWithBearer } from "@/libs/utils"
import { eq, or } from "drizzle-orm"
import { MiddlewareHandler } from "hono"

export const authMiddleware = (): MiddlewareHandler => async (c, next) => {

    const token = c.req.header('Authorization')
    if (!token) throw new AppError(401, 'Unauthorized!')

    if (!isTokenStartWithBearer(token)) throw new AppError(402, 'Forbidden!')

    const [, accessToken] = token.split(" ")

    const payload = verifyToken({ token: accessToken, secret: 'ACCESS_TOKEN_SECRET' })

    const [existUser] = await db.select({
        id: userTable.id,
        email: userTable.email,
        phone: userTable.phone
    }).from(userTable).where(
        or(
            payload.email ? eq(userTable.email, payload.email) : undefined,
            payload.phone ? eq(userTable.phone, payload.phone) : undefined,
        )
    )

    if (!existUser) throw new AppError(400, 'User not registered!')

    c.set('user', existUser)
    await next()
}