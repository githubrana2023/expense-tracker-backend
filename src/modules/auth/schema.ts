import z from 'zod'

export const loginSchema = z.object({
    email:z.email({error:'Invalid Email!'}).nonempty(),
    password:z.string() 
})

export const registerSchema = z.object({
    name:z.string().nonempty(),
    email:z.email({error:'Invalid Email!'}),
    password:z.string() 
})