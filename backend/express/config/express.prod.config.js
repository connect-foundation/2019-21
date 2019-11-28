const env = process.env;

const config = {
	port: env.EXPRESS_PROD_PORT,
	publicPath: env.EXPRESS_PROD_PUBLIC_PATH,
};

export default config;
