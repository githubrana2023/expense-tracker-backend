import { Hono } from "hono";
import { validator } from "hono/validator";

import { loginSchema, registerSchema } from "@/modules/auth/schema";
import { generateToken } from "@/libs/utils";
import db from "@/drizzle/db";
import { comparePassword, generateHashPassword } from "@/libs/bcrypt";
import { eq, or } from "drizzle-orm";
import { AppType } from "@/types/app-type";
import { familyTable } from "@/drizzle/schema";



const authRouter = new Hono<AppType>()

authRouter.post('/login',
    validator('json', async (value, c) => {
        const validate = loginSchema.safeParse(value)

        if (!validate.success) throw new Error('Invalid Fields')
        const { email } = validate.data

        return {
            ...validate.data,
            email,
        }

    }),
    async (c) => {
        const { email, password, } = c.req.valid('json')


        const [existUser] = await db.select().from(familyTable).where(eq(familyTable.email, email))

        if (!existUser) return c.json({ message: 'Invalid Credencials' })

        const pwIsMatch = await comparePassword(password, existUser.password)

        if (!pwIsMatch) return c.json({ message: 'Invalid Credencials' })


        const accessToken = await generateToken({
            id: existUser.id,
            email: existUser.email,
        }, {
            secret: 'ACCESS_TOKEN_SECRET',
            expireIn: 'ACCESS_TOKEN_EXPIRE_IN'
        })

        const refreshToken = await generateToken({
            id: existUser.id,
            email: existUser.email,
        }, {
            secret: 'REFRESH_TOKEN_SECRET',
            expireIn: 'REFRESH_TOKEN_EXPIRE_IN'
        })


        return c.json({
            message: 'response from auth/login route',
            data: {
                message: "logged in success",
                accessToken,
                refreshToken
            }
        })
    })



authRouter.post('/register',
    validator('json', async (value, c) => {
        const validate = registerSchema.safeParse(value)

        if (!validate.success) throw validate.error

        return validate.data

    }),
    async (c) => {
        const body = c.req.valid('json')
        const { email, password } = body


        const [existUser] = await db.select().from(familyTable).where(eq(familyTable.email, email))

        if (existUser) return c.json({ message: 'User already registerd' })

        const hashedPw = await generateHashPassword(password)

        const [newUser] = await db.insert(familyTable).values({ ...body, password: hashedPw }).returning()

        return c.json({
            message: 'response from auth/login route',
            data: {
                message: "registerd success",
                newUser
            }
        })
    })


export default authRouter