import {defineEventHandler} from 'h3'
import {registerSchema} from "#shared/validation/user.validation";
import {hash} from "argon2";
import prisma from "~/lib/prisma";

export default defineEventHandler(async event => {
    const result = await readValidatedBody(event, body => registerSchema.safeParse(body));
    if(!result.success) {
        throw result.error.issues;
    }
    const body = result.data;
    await prisma.user.create({
        data: {
            ...body,
            password: await hash(body.password),
        }
    })

    return true;
})