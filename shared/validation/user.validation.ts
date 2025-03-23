import { z } from 'zod'


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100)
});

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
    name: z.string().min(3).max(50),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
})