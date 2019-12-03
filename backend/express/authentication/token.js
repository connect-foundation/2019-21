import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader";

function generateAccessToken(hostOauthId) {
	const {tokenArgs} = loadConfig();
	const expiresIn = "1 hour";
	const token = jwt.sign({}, tokenArgs.secret, {
		expiresIn,
		issuer: tokenArgs.issuer,
		audience: tokenArgs.audience,
		subject: hostOauthId,
	});

	return token;
}

export {generateAccessToken};
