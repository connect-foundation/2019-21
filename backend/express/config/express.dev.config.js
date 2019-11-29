const env = process.env;

const config = {
	port: env.EXPRESS_DEV_PORT,
	publicPath: env.EXPRESS_DEV_PUBLIC_PATH,
};

export default config;
