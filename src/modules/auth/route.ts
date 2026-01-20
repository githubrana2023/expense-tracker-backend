import { Hono } from "hono";

const authRouter = new Hono()

authRouter.get('/login', (c) => {

    return c.json({
        message: 'response from auth/login route'
    })
})

export default authRouter