import { defineEventHandler } from 'h3'
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const { name, categoryId } = getRouterParams(event)

    const where: any = {};
    if(name) where.name = name;
    if(categoryId) where.categoryId = categoryId;

    return prisma.product.findMany({
        where: where,
    })
})