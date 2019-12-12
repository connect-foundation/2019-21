import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader";
import logger from "../logger";
import {findHostByAuthId} from "../../DB/queries/host";
import {findGuestBySid} from "../../DB/queries/guest";

const {tokenArgs} = loadConfig();

async function payloadVerify(payload) {
	const {aud, iss, sub} = payload;
	const audienceVerify = {guest: findGuestBySid, host: findHostByAuthId};
	if (iss !== tokenArgs.issuer) {
		return new Error("Authentication Error");
	}
	if (aud !== "guest" && aud !== "host") {
		return new Error("Authentication Error");
	}
	const audience = aud === "guest" ? "guest" : "host";
	const userInfo = await audienceVerify[audience](sub);
	if (!userInfo) {
		return new Error("Authentication Error");
	}
	return userInfo;
}

function authenticate() {
	return async (socket, next) => {
		try {
			const token = socket.handshake.query.token;
			const payload = jwt.verify(token, tokenArgs.secret);
			const userInfo = await payloadVerify(payload);
			if (!userInfo) {
				throw Error("Authentication Error");
			}
			return next();
		} catch (e) {
			logger.debug(e);
			next(new Error("Authentication Error"));
		}
	};
}

export default authenticate;
