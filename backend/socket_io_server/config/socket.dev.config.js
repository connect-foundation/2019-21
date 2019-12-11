import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const config = {
	port: env.SOCKET_IO_SERVER_DEV_PORT,
	tokenArgs: {
		secret: process.env.AUTH_TOKEN_SECRET,
		issuer: process.env.AUTH_TOKEN_ISSUER,
		audience: process.env.AUTH_TOKEN_AUDIENCE,
	},
};

export default config;
