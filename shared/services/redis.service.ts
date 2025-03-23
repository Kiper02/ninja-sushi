import Redis from "ioredis";
import configUtil from "#shared/utils/config.util";

class RedisService {
    private redis: Redis;
    private prefix: string;

    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD,
        });
        this.prefix = configUtil<string>("REDIS_PREFIX");
    }

    public async saveSession(userId: string): Promise<boolean> {
        const key = `${this.prefix}:userId:${userId}`;
        try {
            await this.redis.set(key, userId);
        }
        catch (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Ошибка при сохранении сессии'
            })
        }
        return true;
    }

    public async getSession(userId: string): Promise<string[] | []> {
        const key = `${this.prefix}:userId:${userId}`;
        const sessionData = await this.redis.get(key);
        return sessionData ? JSON.parse(sessionData) : [];
    }

    public async deleteSession(userId: string): Promise<void> {
        const key = `${this.prefix}:userId:${userId}`;
        await this.redis.del(key);
    }
}

export default new RedisService();
