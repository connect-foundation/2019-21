import { GraphQLServer } from "graphql-yoga";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import config from "./config.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import { findHostById } from "../DB/queries/host";

/*
	context = payload:
				{ 
					iat: 1575295973,
					exp: 1575299573,
					aud: 'host',
					iss: 'Vaagle',
					sub: '101530667441561687884' 
				}
*/

const authenticate = async (resolve, root, args, context, info) => {
	let audience = "anonymous";
	audience = context.payload && context.payload.aud;
	let authority = { sub: null, info: null };
	switch (audience) {
		case "host":
			const hostInfo = await findHostById(context.payload.sub);
			authority = { sub: "host", info: hostInfo };
			break;
		case "guest":
			const guestInfo = context.payload.sub;
			authority = { sub: "guest", info: guestInfo };
			break;
	}
	const result = await resolve(root, args, authority, info);
	return result;
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	middlewares: [authenticate],
	context: ({ request }) => {
		const token = request.headers.authorization || "";
		console.log(token);
		const payload =
			token === ""
				? undefined
				: jwt.verify(
						token.split(" ")[1],
						process.env.AUTH_TOKEN_SECRET
				  );
		return { payload };
	},
});

server.express.use(cors());
server.express.use(morgan("dev"));
server.express.use(cookieParser());

server.start(config, ({ port }) => {
	console.log(`graphQL yoga Server is running on localhost:${port}`);
});
