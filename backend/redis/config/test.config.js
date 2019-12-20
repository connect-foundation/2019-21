import dotenv from "dotenv";

dotenv.config();

const config = {
	port: parseInt(process.env.REDIS_TEST_PORT, 10),
	host: process.env.REDIS_TEST_HOST,
};

export default config;
