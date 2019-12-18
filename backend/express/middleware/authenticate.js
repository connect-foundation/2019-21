import jwt from "jsonwebtoken";
import config from "../config";
import {findHostByAuthId} from "../../DB/queries/host";
import {isExistGuest} from "../../DB/queries/guest";
import {convertPathToEventId} from "../utils";
import logger from "../logger.js";
import CookieKeys from "../CookieKeys.js";

const {tokenArgs, routePage} = config;

export function guestAuthenticate() {
	return async function(req, res, next) {
		const path = req.params.path;

		try {
			const payload = jwt.verify(
				req.cookies[CookieKeys.GUEST_APP],
				tokenArgs.secret
			);

			const guest = await isExistGuest(payload.sub);
			const eventId = await convertPathToEventId(path);
			const isGuestBelongToEvent = guest.EventId === eventId;

			if (isGuestBelongToEvent) {
				return res.redirect(routePage.guest);
			}

			return next();
		} catch (e) {
			logger.error(e);
			return next();
		}
	};
}

export function hostAuthenticate() {
	return async function(req, res, next) {
		try {
			const payload = jwt.verify(
				req.cookies[CookieKeys.HOST_APP],
				tokenArgs.secret
			);
			const host = await findHostByAuthId(payload.sub);

			if (host) {
				res.redirect(routePage.host);
			}

			return next();
		} catch (e) {
			logger.error(e);
			return next();
		}
	};
}
