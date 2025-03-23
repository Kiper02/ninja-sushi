import { z } from 'zod';

async function readValidatedBody<T>(schema: z.ZodType<T>) {
    const result = schema.safeParse(schema);
    if (!result.success) {
        throw new Error('Invalid request body');
    }
    return result.data;
}