import {defineEventHandler} from "h3";
import {loginSchema} from "#shared/validation/admin.validation";
import prisma from "~/lib/prisma";
import {verify} from "argon2";
import redisService from "#shared/services/redis.service";
import {saveSession} from "#shared/utils/session.util";
import {UserRoles} from "@prisma/client";


export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => loginSchema.safeParse(body));
    if(!result.success) {
        throw result.error.issues;
    }

    const body = result.data;
    const existingUser = await prisma.user.findUnique({
        where: {
            email: body.email,
        }
    })

    if(!existingUser) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Пользователь не найден'
        })
    }

    if(existingUser.role !== UserRoles.ADMIN) {
        throw createError({
            statusCode: 403,
            statusMessage: "У вас недостаточно прав"
        })
    }

    const verifyPassword = await  verify(existingUser.password, body.password)

    if(!verifyPassword) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Неверный пароль'
        })
    }

    await redisService.saveSession(existingUser);
    saveSession(event, existingUser);
    return true;
})