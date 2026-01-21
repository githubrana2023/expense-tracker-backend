import z from 'zod'

export const loginSchema = z.object({
    email:z.email({error:'Invalid Email!'}).optional(),
    phone:z.string({error:'Invalid Phone!'}).min(11).max(11).optional(),
    password:z.string() 
})

export const registerSchema = z.object({
    firstName:z.string().nonempty(),
    lastName:z.string().nonempty(),
    email:z.email({error:'Invalid Email!'}),
    phone:z.string({error:'Invalid Phone!'}).min(11).max(11),
    password:z.string() 
})