import { channel } from "diagnostics_channel";

const redis = require("../config/redis").default;

export async function getUserPref(userId: string) {
    const key  = `user:${userId}`;
    let data = await redis.get(key);
    if(!data) return null;
    return JSON.parse(data);
}

export async function setUserPref(userId: string, perfs: any) {
    const key = `user:${userId}`;
    await redis.set(key, JSON.stringify(perfs));
}

export async function checkRateLimit(userId: string, method: string) {
    const key = `user:rate:${userId}:${method}`
    const count = await redis.incr(key);
    if( count === 1) await redis.expire(key, 3600); // Set expiration to 3600 seconds
    return count <= 3; // Allow up to 3 requests per hour
}