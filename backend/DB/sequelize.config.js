const path = require("path");

const envPath = path.resolve(__dirname, "../.env");

require("dotenv").config({path: envPath});

module.exports = {
	development: {
		username: "root",
		password: "todn12",
		database: "bagle",
		host: "127.0.0.1",
		dialect: "mysql",
		port: 3306,
		logging: false,
	},
	test: {
		username: process.env.MYSQL_TEST_USER,
		password: process.env.MYSQL_TEST_PASSWORD,
		database: process.env.MYSQL_TEST_SCHEME,
		host: process.env.MYSQL_TEST_HOST,
		dialect: process.env.MYSQL_TEST_DIALECT,
		port: process.env.MYSQL_TEST_PORT,
		logging: false,
	},
	production: {
		username: process.env.MYSQL_PROD_USER,
		password: process.env.MYSQL_PROD_PASSWORD,
		database: process.env.MYSQL_PROD_SCHEME,
		host: process.env.MYSQL_PROD_HOST,
		dialect: process.env.MYSQL_PROD_DIALECT,
		port: process.env.MYSQL_PROD_PORT,
		logging: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
};
