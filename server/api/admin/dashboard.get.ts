import adminMiddleware from "~/server/api/admin/middleware/admin.middleware";

export default defineEventHandler(async(event) => {
    await adminMiddleware(event);

})