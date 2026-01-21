import { Hono } from "hono";
import userRouter from "../modules/users/route";

const router = new Hono()

router.get('/test',async (c)=>{
    return c.json({message:'test route'})
})
router.route('/users',userRouter)

export default router