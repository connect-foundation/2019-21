import passport from "passport";
import passportJwt from "passport-jwt";
import loadConfig from "../config/configLoader";
import { findHostById } from "../../DB/queries/host";

export default (function() {
	const { tokenArgs } = loadConfig();
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
