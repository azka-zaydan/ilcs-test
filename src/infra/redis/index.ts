import { createClient, RedisClientType } from "redis";
import Logger from "../../shared/logger";

let redisClient: RedisClientType;

async function getRedisConn() {
	redisClient = createClient({
		database: Number(process.env.CACHE_REDIS_DB),
		socket: {
			host: process.env.CACHE_REDIS_HOST,
			port: Number(process.env.CACHE_REDIS_PORT),
		},
	});

	redisClient.on("error", (err) => {
		Logger.error(`Redis Client Error: ${err}`);
		throw err;
	});

	await redisClient.connect();
	Logger.info("Redis Connected!");
}

export async function setupRedisConn() {
	await getRedisConn();
}

const redis = {
	client: () => redisClient,
};

export default redis;
