import { Hono } from "hono";
import { AppType } from "@/types/app-type";

const accessRouter = new Hono<AppType>()


accessRouter.get('/users/:userId?HELLO', async (c) => {
    const userId = c.req.queries()

    console.log({userId})

    return c.json({
        access: "granted"
    })
})

export default accessRouter