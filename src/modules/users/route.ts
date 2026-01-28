import { Context, Hono } from "hono";
import db from "@/drizzle/db";
import { AppType } from "@/types/app-type";

const userRouter = new Hono<AppType>()


export default userRouter