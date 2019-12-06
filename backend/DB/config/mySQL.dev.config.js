require("dotenv").config();

const host = process.env.MYSQL_DEV_HOST;
const user = process.env.MYSQL_DEV_USER;
const password = process.env.MYSQL_DEV_PASSWORD;
const scheme = process.env.MYSQL_DEV_SCHEME;
const dialect = process.env.MYSQL_DEV_DIALECT;
const port = process.env.MYSQL_DEV_PORT;
const containerName = process.env.MYSQL_DEV_CONTAINER_NAME;
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
};
