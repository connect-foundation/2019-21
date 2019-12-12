import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader.js";
import {findHostByAuthId} from "../../DB/queries/host";
import {findGuestBySid} from "../../DB/queries/guest";
import {getEventIdByEventCode} from "../../DB/queries/event";

const {tokenArgs, routePage} = loadConfig();

async function comparePathToCookie(path, guest) {
	const eventCode = Buffer.from(path, "base64").toString();
	const EventId = await getEventIdByEventCode(eventCode);
	if (guest.EventId !== EventId.dataValues.id) {
		return true;
	}
	return false;
}

export function guestAuthenticate() {
	const cookieName = "vaagle-guest";

	return async function(req, res, next) {
		const path = req.params.path;
		try {
			const payload = jwt.verify(
				req.cookies[cookieName],
				tokenArgs.secret
			);
			const guest = await findGuestBySid(payload.sub);
			const isAnotherPath = await comparePathToCookie(path, guest);
			if (isAnotherPath) {
				return next();
			}
			if (!guest) {
				throw Error("token is invalid");
			}
			res.redirect(routePage.guest);
		} catch (e) {
			return next();
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
			return next();
		}
	};
}
