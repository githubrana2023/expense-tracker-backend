import { Hono } from "hono";
import userRouter from "../modules/users/route";
import { AppType } from "@/types/app-type";
import accessRouter from "@/modules/access/route";

const router = new Hono<AppType>()

router.get('/test',async (c)=>{
    
    return c.json({message:'test route'})
})
router.route('/users',userRouter)
router.route('/access',accessRouter)

export default router