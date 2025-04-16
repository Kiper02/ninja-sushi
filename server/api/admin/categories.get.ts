import { defineEventHandler } from 'h3'
import adminMiddleware from "~/server/api/admin/middleware/admin.middleware";
import prisma from "~/lib/prisma";
import s3Service from "~/server/services/s3.service";

export default defineEventHandler(async(event) => {
    await adminMiddleware(event);

    const categories = await prisma.category.findMany();

    return await Promise.all(categories.map( async (category: any) => {
        const url = await s3Service.findLink(category.icon);
        return {
            ...category,
            icon: url
        }
    }))
})