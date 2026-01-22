import { Hono } from "hono";
import db from "@/drizzle/db";

const userRouter = new Hono()

userRouter.get('/',async (c) => {
    const users = await db.query.userTable.findMany()
    return c.json(users)
})

export default userRouter