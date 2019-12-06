import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const config = {
	port: env.SOCKET_IO_SERVER_TEST_PORT,
};

export default config;
