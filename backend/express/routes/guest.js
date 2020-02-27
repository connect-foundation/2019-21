import express from "express";
import jwt from "jsonwebtoken";
import {getTokenExpired} from "../../libs/utils";
import generateAccessToken from "../authentication/token";
import config from "../config";
import {guestAuthenticate} from "../middleware/authenticate";
import {createGuest, isExistGuest} from "../../DB/queries/guest";
import {convertPathToEventId} from "../utils";
import CookieKeys from "../CookieKeys.js";
import logger from "../logger.js";

const {routePage, tokenArgs} = config;
const router = express.Router();
const cookieExpireTime = 2;

router.get("/", async (req, res) => {
	try {
		const payload = jwt.verify(
			req.cookies[CookieKeys.GUEST_APP],
			tokenArgs.secret,
		);

		const guest = await isExistGuest(payload.sub);

		if (!guest) {
			// todo fix this line of lint
			// noinspection ExceptionCaughtLocallyJS
			throw Error("Guest is not found");
		}

		res.redirect(routePage.guest);
	} catch (e) {
		logger.error([e, e.stack]);
		res.redirect(routePage.main);
	}
});

router.get("/logout", (req, res) => {
	res.clearCookie(CookieKeys.GUEST_APP).redirect(routePage.main);
});

router.get("/:path", guestAuthenticate(), async (req, res) => {
	try {
		const path = req.params.path;
		const eventId = await convertPathToEventId(path);
		const guest = await createGuest(eventId);
		const accessToken = generateAccessToken(guest.guestSid, "guest");

		res.cookie(CookieKeys.GUEST_APP, accessToken, {
			expires: getTokenExpired(cookieExpireTime),
		});
		res.redirect(routePage.guest);
	} catch (e) {
		logger.error([e, e.stack]);
		res.redirect(routePage.main);
	}
});

module.exports = router;
