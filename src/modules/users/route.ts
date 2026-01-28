import { Context, Hono } from "hono";
import db from "@/drizzle/db";
import { AppType } from "@/types/app-type";

const userRouter = new Hono<AppType>()

userRouter.get('/',async (c, next) => {

    await next()
}, async (c) => {
    const users = await db.query.userTable.findMany()
    return c.json(users)
})

export default userRouter