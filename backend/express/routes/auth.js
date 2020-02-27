import express from "express";
import passport from "passport";
import {getTokenExpired} from "../../libs/utils";
import generateAccessToken from "../authentication/token";
import config from "../config";
import CookieKeys from "../CookieKeys.js";

const EXPIRE_TIME = 2;
const {routePage} = config;
const router = express.Router();

router.get(
	"/login",
	passport.authenticate("google", {
		session: false,
		scope: ["email", "profile"],
		prompt: "select_account",
	}),
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		session: false,
	}),
	(req, res) => {
		const {user} = req;
		const accessToken = generateAccessToken(user.oauthId, "host");

		res.cookie(CookieKeys.HOST_APP, accessToken, {
			expires: getTokenExpired(EXPIRE_TIME),
		});
		res.redirect(routePage.host);
	},
);

export default router;
