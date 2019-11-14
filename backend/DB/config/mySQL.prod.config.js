require("dotenv").config();

const user = process.env.MYSQL_PROD_USER;
const password = process.env.MYSQL_PROD_PASSWORD;
const scheme = process.env.MYSQL_PROD_SCHEME;
const dialect = process.env.MYSQL_PROD_DIALECT;
const port = process.env.MYSQL_PROD_PORT;
const containerName = process.env.MYSQL_PROD_CONTAINER_NAME;
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
