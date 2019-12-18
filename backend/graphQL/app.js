import jwt from "jsonwebtoken";
import cors from "cors";
import {GraphQLServer} from "graphql-yoga";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import config from "./config.js";
import logger from "./logger.js";
import authenticate from "./middlewares/authenticate.js";

function parserJWT(data) {
	return data.split(" ")[1];
}

const context = ({request}) => {
	const authorization = request.headers.authorization;

	if (!authorization) {
		return {payload: undefined};
	}

	let payload;

	try {
		payload = jwt.verify(
			parserJWT(authorization),
			process.env.AUTH_TOKEN_SECRET,
		);
	} catch (e) {
		logger.error(e);
		payload = undefined;
	}

	return {payload};
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	middlewares: [authenticate],
	context,
});

server.express.use(cors());
server.express.use(morgan("dev"));
server.express.use(cookieParser());

server.start(config, ({port}) => {
	logger.info(`graphQL yoga Server is running on localhost:${port}`);
});
