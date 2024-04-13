// setup next.js with prisma
import { PrismaClient } from '@prisma/client';
import { RedisClientType, createClient } from 'redis';

let prisma: PrismaClient;
let redis: RedisClientType;

declare global {
    var prisma: PrismaClient | undefined;
    var redis: RedisClientType;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  redis = createClient({
    url: process.env.REDIS_URL
});
redis.connect();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
        global.redis = createClient({
            url: process.env.REDIS_URL
        });
    }
    prisma = global.prisma;
    redis = global.redis;
    redis.connect();
}

export {
    prisma,
    redis
};