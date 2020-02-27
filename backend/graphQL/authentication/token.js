import jwt from "jsonwebtoken";

const expiresIn = "1 hour";
const tokenArgs = {
	secret: process.env.AUTH_TOKEN_SECRET,
	issuer: process.env.AUTH_TOKEN_ISSUER,
	audience: process.env.AUTH_TOKEN_AUDIENCE,
};

// noinspection JSUnusedGlobalSymbols
export default function generateAccessToken(hostOauthId) {
	return jwt.sign({}, tokenArgs.secret, {
		expiresIn,
		issuer: tokenArgs.issuer,
		audience: tokenArgs.audience,
		subject: hostOauthId,
	});
}
