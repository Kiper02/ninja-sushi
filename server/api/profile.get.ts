import prisma from "~/lib/prisma";
import { defineEventHandler } from 'h3';
export default defineEventHandler(async(event) => {
    const userId = parseCookies(event)?.userId;
    if(!userId) {
        throw createError({
            status: 401,
            statusMessage: 'Вы не авторизованы'
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw createError({
            status: 401,
            statusMessage: 'Пользователь не найден'
        })
    }

    return user;
})