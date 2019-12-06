import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const config = {
	port: env.EXPRESS_PROD_PORT,
	publicPath: env.EXPRESS_PROD_PUBLIC_PATH,
	tokenArgs: {
		secret: process.env.AUTH_TOKEN_SECRET,
		issuer: process.env.AUTH_TOKEN_ISSUER,
		audience: process.env.AUTH_TOKEN_AUDIENCE,
	},
	oAuthArgs: {
		clientID: process.env.OAUTH2_CLIENT_PROD_ID,
		clientSecret: process.env.OAUTH2_CLIENT_PROD_SECRET,
		callbackURL: process.env.OAUTH2_PROD_CALLBACK,
	},
	routePage: {
		main: process.env.PROD_MAIN_PAGE,
		host: process.env.PROD_HOST_PAGE,
		guest: process.env.PROD_GUEST_PAGE,
	},
};

export default config;
