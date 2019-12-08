import express from "express";
import { getTokenExpired } from "../utils";
import generateAccessToken from "../authentication/token";
import loadConfig from "../config/configLoader";
import { guestAuthenticate } from "../middleware/authenticate";
import { createGuest } from "../../DB/queries/guest";
import { getEventIdByEventCode } from "../../DB/queries/event";

const { routePage } = loadConfig();
const router = express.Router();
const cookieName = "vaagle-guest";

async function pathToCode(path) {
	const eventCode = Buffer.from(path, "base64").toString();
	let eventId = await getEventIdByEventCode(eventCode);

	return eventId.dataValues.id;
}

router.get("/logout", (req, res, next) => {
	res.clearCookie(cookieName).redirect(routePage.main);
});

router.get("/:path", guestAuthenticate(), async (req, res, next) => {
	try {
		const path = req.params.path;
		const eventId = await pathToCode(path);
		const guest = await createGuest("Anonymous", eventId);
		const accessToken = generateAccessToken(guest.guestSid, "guest");
		res.cookie(cookieName, accessToken, {
			expires: getTokenExpired(1),
		});
		res.redirect(routePage.guest);
	} catch (e) {
		res.redirect(routePage.main);
	}
});

module.exports = router;
