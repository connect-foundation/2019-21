import redis from "redis";
// noinspection NpmUsedModulesInstalled
import asyncRedis from "async-redis";
import getLogger from "../libs/logger.js";
import config from "./config";

const client = redis.createClient(config.port, config.host);
// noinspection JSUnresolvedFunction
const asyncRedisClient = asyncRedis.decorate(client);

const logger = getLogger("socket.io-redis");

asyncRedisClient.on("ready", () => {
	logger.info("redis client now ready");
});

asyncRedisClient.on("connect", () => {
	logger.info("redis client connected");
});

asyncRedisClient.on("error", err => {
	logger.info(err);
});

asyncRedisClient.on("reconnecting", ({delay, attempt}) => {
	logger.info(`reconnecting delay: ${delay} attempt: ${attempt}`);
});

export default asyncRedisClient;
