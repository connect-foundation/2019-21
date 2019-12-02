import { GraphQLServer } from "graphql-yoga";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import config from "./config.js";
import passport from "passport";
import * as jwt from "./authentication/jwt";
import cors from "cors";

const saveContext = async (resolve, root, args, context, info) => {
	context.user = context.request.user;
	context.auth = context.request.authInfo;
	const result = await resolve(root, args, context, info);
	return result;
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	middlewares: [saveContext],
	context: req => {
		return { ...req };
	},
});

server.express.use(cors());
server.express.use(morgan("dev"));
server.express.use(cookieParser());
server.express.use(passport.initialize());
server.express.use(
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		next();
	}
);

server.start(config, ({ port }) => {
	console.log(`graphQL yoga Server is running on localhost:${port}`);
});
