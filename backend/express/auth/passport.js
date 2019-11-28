const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

export default (function() {
	function extractProfile(profile) {
		let imageUrl = "";
		if (profile.photos && profile.photos.length) {
			imageUrl = profile.photos[0].value;
		}
		return {
			id: profile.id,
			displayName: profile.displayName,
			image: imageUrl,
		};
	}

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.OAUTH2_CLIENT_ID,
				clientSecret: process.env.OAUTH2_CLIENT_SECRET,
				callbackURL: process.env.OAUTH2_CALLBACK,
				accessType: "offline",
			},
			(accessToken, refreshToken, profile, cb) => {
				// Extract the minimal profile information we need from the profile object
				// provided by Google
				cb(null, extractProfile(profile));
			}
		)
	);

	passport.serializeUser((user, cb) => {
		cb(null, user);
	});
	passport.deserializeUser((obj, cb) => {
		cb(null, obj);
	});
})();
