"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPref = getUserPref;
exports.setUserPref = setUserPref;
exports.checkRateLimit = checkRateLimit;
const redis = require("../config/redis").default;
async function getUserPref(userId) {
    const key = `user:${userId}`;
    let data = await redis.get(key);
    if (!data)
        return null;
    return JSON.parse(data);
}
async function setUserPref(userId, perfs) {
    const key = `user:${userId}`;
    await redis.set(key, JSON.stringify(perfs));
}
async function checkRateLimit(userId, method) {
    const key = `user:rate:${userId}:${method}`;
    const count = await redis.incr(key);
    if (count === 1)
        await redis.expire(key, 3600); // Set expiration to 3600 seconds
    return count <= 3; // Allow up to 3 requests per hour
}
//# sourceMappingURL=cache.service.js.map