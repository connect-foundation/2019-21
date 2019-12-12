import redis from "redis";
import asyncRedis from "async-redis";
import getLogger from "../libs/logger.js";
import loadConfig from "./config/configLoader.js";

const config = loadConfig();
const client = redis.createClient(config.port, config.host);
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
