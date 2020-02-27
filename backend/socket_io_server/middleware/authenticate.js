import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader";
import logger from "../logger";
import {isExistHostOAuthId} from "../../DB/queries/host";
import {isExistGuest} from "../../DB/queries/guest";

const {tokenArgs} = loadConfig();

const audienceVerify = {guest: isExistGuest, host: isExistHostOAuthId};

const isValidAud = aud => aud !== "guest" && aud !== "host";

const isValidIss = iss => iss !== tokenArgs.issuer;

async function payloadVerify(payload) {
	const {aud, iss, sub} = payload;

	if (isValidIss(iss)) {
		throw new Error("Authentication Error: invalid iss");
	}

	if (isValidAud(aud)) {
		throw new Error("Authentication Error: invalid aud");
	}

	const userInfo = await audienceVerify[aud](sub);

	if (!userInfo) {
		throw new Error("Authentication Error: invalid userInfo");
	}

	return null;
}

function authenticate() {
	// eslint-disable-next-line consistent-return
	return async (socket, next) => {
		try {
			const token = socket.handshake.query.token;
			const payload = jwt.verify(token, tokenArgs.secret);

			await payloadVerify(payload);

			return next();
		} catch (e) {
			logger.debug(e);
			next(new Error("Authentication Error"));
		}
	};
}

export default authenticate;
