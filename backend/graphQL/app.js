import jwt from "jsonwebtoken";
import cors from "cors";
import {GraphQLServer} from "graphql-yoga";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import config from "./config.js";
import {findHostByAuthId} from "../DB/queries/host";
import logger from "./logger.js";

const authenticate = async (resolve, root, args, context, info) => {
	const audience = context.payload && context.payload.aud;
	let authority = {sub: null, info: null};

	switch (audience) {
		case "host": {
			const hostInfo = await findHostByAuthId(context.payload.sub);

			authority = {sub: "host", info: hostInfo};
			break;
		}
		case "guest": {
			const guestInfo = context.payload.sub;

			authority = {sub: "guest", info: guestInfo};
			break;
		}
		default: {
			logger.error(`unexpected type of audience ${audience}`);
		}
	}

	return resolve(root, args, authority, info);
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	middlewares: [authenticate],
	context: ({request}) => {
		let payload;
		const token = request.headers.authorization || "";

		try {
			payload = token === "" ? undefined : jwt.verify(token.split(" ")[1], process.env.AUTH_TOKEN_SECRET);
		} catch (e) {
			payload = undefined;
		} finally {
			return {payload};
		}
	},
});

server.express.use(cors());
server.express.use(morgan("dev"));
server.express.use(cookieParser());

server.start(config, ({port}) => {
	logger.info(`graphQL yoga Server is running on localhost:${port}`);
});
