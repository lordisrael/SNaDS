import Redis from "ioredis";
import { Redis as UpstashRedis } from "@upstash/redis";

let redis: any;

if (process.env.NODE_ENV === "production") {
  redis = new UpstashRedis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
} else {
  redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
}

export default redis;