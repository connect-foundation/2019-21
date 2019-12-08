import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader.js";
import { findHostByAuthId } from "../../DB/queries/host";
import { findGuestBySid } from "../../DB/queries/guest";

const { tokenArgs, routePage } = loadConfig();

export function guestAuthenticate() {
	const cookieName = "vaagle-guest";

	return async function(req, res, next) {
		try {
			const payload = jwt.verify(
				req.cookies[cookieName],
				tokenArgs.secret
			);
			const guest = await findGuestBySid(payload.sub);
			if (!guest) {
				throw Error("token is invalid");
			}
			res.redirect(routePage.guest);
		} catch (e) {
			next();
		}
	};
}

export function hostAuthenticate() {
	const cookieName = "vaagle-host";

	return async function(req, res, next) {
		try {
			const payload = jwt.verify(
				req.cookies[cookieName],
				tokenArgs.secret
			);
			const host = await findHostByAuthId(payload.sub);
			if (!host) {
				throw Error("token is invalid");
			}
			res.redirect(routePage.host);
		} catch (e) {
			next();
		}
	};
}
