const path = require("path");

const envPath = path.resolve(__dirname, "../.env");

require("dotenv").config({path: envPath});

// todo ./config의 *.config.js 에서 로드 하도록 변경
module.exports = {
	development: {
		username: process.env.MYSQL_DEV_USER,
		password: process.env.MYSQL_DEV_PASSWORD,
		database: process.env.MYSQL_DEV_SCHEME,
		host: process.env.MYSQL_DEV_HOST,
		dialect: process.env.MYSQL_DEV_DIALECT,
		port: process.env.MYSQL_DEV_PORT,
		containerName: process.env.MYSQL_DEV_CONTAINER_NAME,
		logging: false,
	},
	test: {
		username: process.env.MYSQL_TEST_USER,
		password: process.env.MYSQL_TEST_PASSWORD,
		database: process.env.MYSQL_TEST_SCHEME,
		host: process.env.MYSQL_TEST_HOST,
		dialect: process.env.MYSQL_TEST_DIALECT,
		port: process.env.MYSQL_TEST_PORT,
		containerName: process.env.MYSQL_TEST_CONTAINER_NAME,
		storage: process.env.MYSQL_TEST_STORAGE,
		logging: false,
	},
	production: {
		username: process.env.MYSQL_PROD_USER,
		password: process.env.MYSQL_PROD_PASSWORD,
		database: process.env.MYSQL_PROD_SCHEME,
		host: process.env.MYSQL_PROD_HOST,
		dialect: process.env.MYSQL_PROD_DIALECT,
		port: process.env.MYSQL_PROD_PORT,
		containerName: process.env.MYSQL_PROD_CONTAINER_NAME,
		logging: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
};
