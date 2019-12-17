import jwt from "jsonwebtoken";
import config from "../config";
import {findHostByAuthId} from "../../DB/queries/host";
import {isExistGuest} from "../../DB/queries/guest";
import {convertePathToEvent} from "../utils";
import logger from "../logger.js";
import CookieKeys from "../CookieKeys.js";

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
			const eventId = await convertePathToEvent(path);
			const isAnotherPath = guest === eventId;

			if (isAnotherPath) {
				return next();
			}

			if (!guest) {
				throw Error("token is invalid");
			}

			res.redirect(routePage.guest);
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
			const host = await findHostByAuthId(payload.sub);

			if (!host) {
				throw Error("token is invalid");
			}

			res.redirect(routePage.host);
		} catch (e) {
			logger.error(e);
			return next();
		}
	};
}
