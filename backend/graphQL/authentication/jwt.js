import passport from "passport";
import passportJwt from "passport-jwt";
import { findHostById } from "../../DB/queries/host";

export default (function() {
	const tokenArgs = {
		secret: process.env.AUTH_TOKEN_SECRET,
		issuer: process.env.AUTH_TOKEN_ISSUER,
		audience: process.env.AUTH_TOKEN_AUDIENCE,
	};
	const jwtOptions = {
		jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: tokenArgs.secret,
		issuer: tokenArgs.issuer,
		audience: tokenArgs.audience,
	};
	passport.use(
		new passportJwt.Strategy(jwtOptions, async (payload, cb) => {
			try {
				const host = await findHostById(payload.sub);
				if (host) {
					return cb(null, host, payload);
				}
				return cb();
			} catch (error) {}
		})
	);
})();
