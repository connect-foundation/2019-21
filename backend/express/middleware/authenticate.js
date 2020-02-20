import jwt from "jsonwebtoken";
import config from "../config";
import {isExistGuest} from "../../DB/queries/guest";
import {convertPathToEventId} from "../utils";
import logger from "../logger.js";
import CookieKeys from "../CookieKeys.js";
import {isExistHostOAuthId} from "../../DB/queries/host.js";

const {tokenArgs, routePage} = config;

export function guestAuthenticate() {
	return async function(req, res, next) {
		const path = req.params.path;

		try {
			const payload = jwt.verify(
				req.cookies[CookieKeys.GUEST_APP],
				tokenArgs.secret,
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
				tokenArgs.secret,
			);
			const isExist = await isExistHostOAuthId(payload.sub);

			if (isExist) {
				res.redirect(routePage.host);
			}

			return next();
		} catch (e) {
			logger.error(e);
			return next();
		}
	};
}
