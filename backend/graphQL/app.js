import {GraphQLServer} from "graphql-yoga";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import config from "./config.js";

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	// middlewares,
	// context: contextParser,
});

server.express.use(morgan("dev"));
server.express.use(cookieParser());

server.start(config, ({port}) => {
	console.log(`graphQL yoga Server is running on localhost:${port}`);
});
