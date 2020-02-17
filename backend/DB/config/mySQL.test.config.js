require("dotenv").config();

const host = process.env.MYSQL_TEST_HOST;
const user = process.env.MYSQL_TEST_USER;
const password = process.env.MYSQL_TEST_PASSWORD;
const scheme = process.env.MYSQL_TEST_SCHEME;
const dialect = process.env.MYSQL_TEST_DIALECT;
const port = process.env.MYSQL_TEST_PORT;
const containerName = process.env.MYSQL_TEST_CONTAINER_NAME;
const storage = process.env.MYSQL_TEST_STORAGE;
const pool = {
	max: 5,
	min: 0,
	acquire: 30000,
	idle: 10000,
};

export const config = {
	host,
	user,
	password,
	scheme,
	dialect,
	port,
	pool,
	containerName,
	storage,
};
