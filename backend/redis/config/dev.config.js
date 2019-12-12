import dotenv from "dotenv";

dotenv.config();

const config = {
	port: parseInt(process.env.REDIS_PROD_PORT_PORT, 10),
	host: process.env.REDIS_PROD_PORT,
};

export default config;
