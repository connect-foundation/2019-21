import dotenv from "dotenv";

dotenv.config();

const config = {
	port: parseInt(process.env.REDIS_PROD_PORT, 10),
	host: process.env.REDIS_PROD_HOST,
};

export default config;
