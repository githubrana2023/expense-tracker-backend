import { Hono } from "hono";
import { validator } from "hono/validator";

import { loginSchema, registerSchema } from "@/modules/auth/schema";
import { generateToken } from "@/libs/utils";
import db from "@/drizzle/db";
import { comparePassword } from "@/libs/bcrypt";
import { userTable } from "@/drizzle/schema";
import { eq, or } from "drizzle-orm";



const authRouter = new Hono()

authRouter.post('/login',
    validator('json', async (value, c) => {
        const validate = loginSchema.safeParse(value)

        if (!validate.success) throw new Error('Invalid Fields')
        const { phone, email } = validate.data

        if (!email && !phone) return c.json({ message: "Please enter Email or Phone!" })

        return {
            ...validate.data,
            email,
            phone
        }

    }),
    async (c) => {
        const { email, password, phone } = c.req.valid('json')


        const [existUser] = await db.select().from(userTable).where(
            or(
                email ? eq(userTable.email, email) : undefined,
                phone ? eq(userTable.phone, phone) : undefined,

            )
        )

        if (!existUser) return c.json({ message: 'Invalid Credencials' })

        const pwIsMatch = await comparePassword(password, existUser.password)

        if (!pwIsMatch) return c.json({ message: 'Invalid Credencials' })


        const accessToken = await generateToken({ email, phone },
            {
                secret: 'ACCESS_TOKEN_SECRET',
                expireIn: 'ACCESS_TOKEN_EXPIRE_IN'
            }
        )

        const refreshToken = await generateToken({ email, phone },
            {
                secret: 'REFRESH_TOKEN_SECRET',
                expireIn: 'REFRESH_TOKEN_EXPIRE_IN'
            }
        )


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
        const { email, password, phone } = body

        // const existUser = await db.query.userTable.findFirst({
        //     where(storedUser, { or, eq }) {
        //         return or(
        //             eq(storedUser.email, email),
        //             eq(storedUser.phone, phone)
        //         )
        //     },
        // })

        // if (existUser) return c.json({ message: 'User already registerd' })

        // const hashedPw = await generateHashPassword(password)

        // const [newUser] = await db.insert(userTable).values({ ...body, password: hashedPw }).returning()

        return c.json({
            message: 'response from auth/login route',
            data: {
                message: "registerd success",
                // newUser
            }
        })
    })


export default authRouter