import Redis from "ioredis";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort  = Number(process.env.REDIS_PORT || 6379);

export const redis = new Redis({
    host: redisHost,
    port: redisPort,
});

redis.on("connect", () => console.log(`Conectado ao Redis em ${redisHost}:${redisPort}`));
redis.on("error", (err) => console.error("Erro no Redis:", err));