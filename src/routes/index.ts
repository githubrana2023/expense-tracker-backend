import { Hono } from "hono";
import authRouter from "../modules/auth/route";

const router = new Hono()

router.route('/auth', authRouter)

export default router