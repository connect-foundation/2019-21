import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader";

export default function generateAccessToken(sub, aud) {
	const {tokenArgs} = loadConfig();
	const expiresIn = "24 hour";
	const token = jwt.sign({}, tokenArgs.secret, {
		expiresIn,
		issuer: tokenArgs.issuer,
		audience: aud,
		subject: sub,
	});

	return token;
}
