import { defineEventHandler } from 'h3'
import {categorySchema} from "#shared/validation/category.validation";
import s3Service from "~/server/services/s3.service";
import { v4 } from 'uuid'
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);

    if (!formData) {
        throw createError({ statusCode: 400, message: "No form data provided" });
    }

    console.log(formData)
    const nameField = formData.find(field => field.name === 'name');
    const fileField = formData.find(field => field.name === 'file');

    if (!nameField || !fileField) {
        throw createError({ statusCode: 400, message: "Missing required fields" });
    }

    const name = nameField.data.toString();
    const validation = categorySchema.safeParse({ name });
    if (!validation.success) {
        throw validation.error.issues;
    }

    const fileBuffer = fileField.data;
    const fileName = v4();
    const fileType = fileField.type || 'image/jpeg';

    await s3Service.upload(fileBuffer, fileName, fileType);
    const url = await s3Service.findLink(fileName);

    await prisma.category.create({
        data: {
            name: validation.data.name,
            icon: fileName
        }
    });

    return true;
});