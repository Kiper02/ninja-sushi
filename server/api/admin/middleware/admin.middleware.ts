import prisma from "~/lib/prisma";
import {UserRoles} from "@prisma/client";

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

    if(user.role !== UserRoles.ADMIN) {
        throw createError({
            statusCode: 403,
            statusMessage: "У вас недостаточно прав"
        })
    }


    event.context.user = user;
})
