import passport from "passport";
import {Strategy} from "passport-google-oauth20";
import config from "../config";
import {createHost, findHostByAuthId} from "../../DB/queries/host";
import logger from "../logger.js";

const GoogleStrategy = Strategy;

function extractProfile(profile) {
	let imageUrl = "";

	if (profile.photos && profile.photos.length) {
		imageUrl = profile.photos[0].value;
	}

	return {
		id: profile.id,
		displayName: profile.displayName,
		image: imageUrl,
		email: profile.emails[0].value,
	};
}

const {oAuthArgs} = config;

export default (function() {
	const verify = async (accessToken, refreshToken, profile, cb) => {
		try {
			const {id, displayName, image, email} = extractProfile(profile);
			let host = await findHostByAuthId(id);

			if (!host) {
				host = await createHost(id, displayName, image, email);
			}

			return cb(null, host);
		} catch (error) {
			logger.error(error);

			return null;
		}
	};

	const googleStrategy = new GoogleStrategy({...oAuthArgs}, verify);

	passport.use(googleStrategy);
})();
