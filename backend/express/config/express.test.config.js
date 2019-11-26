const env = process.env;

const config = {
	port: env.EXPRESS_TEST_PORT,
	publicPath: env.EXPRESS_TEST_PUBLIC_PATH,
};

export default config;
