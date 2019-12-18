import jwt from "jsonwebtoken";
import config from "../config";

const {tokenArgs} = config;
const expiresIn = "24 hour";

export default function generateAccessToken(sub, aud) {
	return jwt.sign({}, tokenArgs.secret, {
		expiresIn,
		issuer: tokenArgs.issuer,
		audience: aud,
		subject: sub,
	});
}
