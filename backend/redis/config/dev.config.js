import dotenv from "dotenv";

dotenv.config();

const config = {
	port: process.env.REDIS_DEV_PORT,
	host: process.env.REDIS_DEV_HOST,
};

export default config;
