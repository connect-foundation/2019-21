import passport from "passport";
import {Strategy} from "passport-google-oauth20";
import loadConfig from "../config/configLoader";
import {createHost, findHostById} from "../../DB/queries/host";

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

export default (function() {
	const {oAuthArgs} = loadConfig();

	passport.use(
		new GoogleStrategy(
			{...oAuthArgs},
			async (accessToken, refreshToken, profile, cb) => {
				try {
					const {id, displayName, image, email} = extractProfile(
						profile,
					);
					let host = await findHostById(id);

					if (!host) { host = await createHost(id, displayName, image, email); }
					return cb(null, host);
				} catch (error) {
					console.error(error);
				}
			},
		),
	);
})();
