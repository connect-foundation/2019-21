import {findHostByOAuthId} from "../../DB/queries/host.js";
import logger from "../logger.js";

const authenticate = async (resolve, root, args, context, info) => {
	const audience = context.payload && context.payload.aud;
	let authority = {sub: null, info: null};

	switch (audience) {
		case "host": {
			const hostInfo = await findHostByOAuthId(context.payload.sub);

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

export default authenticate;
