import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader.js";
import { findHostByAuthId } from "../../DB/queries/host";
import { findGuestBySid } from "../../DB/queries/guest";

const { tokenArgs, routePage } = loadConfig();

export default function authenticate() {
	const cookieName = "vaagle";
	return async function(req, res, next) {
		try {
			const payload = jwt.verify(
				req.cookies[cookieName],
				tokenArgs.secret
			);
			console.log(payload);
			const { aud, sub } = payload;
			switch (aud) {
				case "host":
					const host = await findHostByAuthId(sub);
					if (!host) {
						throw Error("token is invalid");
					}
					res.redirect(routePage.host);
					break;
				case "guest":
					const guest = await findGuestBySid(sub);
					if (!guest) {
						throw Error("token is invalid");
					}
					res.redirect(routePage.guest);
					break;
			}
		} catch (e) {
			next();
		}
	};
}
