import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
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

    if(!user) {
        throw createError({
            status: 401,
            statusMessage: 'Пользователь не найден'
        })
    }

    event.context.user = user;
})
