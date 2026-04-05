const Redis = require("ioredis");

let redis;

if (process.env.NODE_ENV === "production") {
  // Redis disable (safe deployment) 
  redis = {
    get: async () => null,
    set: async () => null,
  };

  console.log("Redis disabled in production");
} else {
  // real Redis in local development
  redis = new Redis({
    host: process.env.REDIS_URL || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  });

  redis.on("connect", () => {
    console.log("Redis connected");
  });

  redis.on("error", (err) => {
    console.error("Redis error", err);
  });
}

module.exports = redis;