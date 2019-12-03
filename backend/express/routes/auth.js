import express from "express";
import passport from "passport";
import { getTokenExpired } from "../utils";
import { generateAccessToken } from "../authentication/token";
import loadConfig from "../config/configLoader";

const { routePage } = loadConfig();

const router = express.Router();

router.get(
	"/login",
	passport.authenticate("google", {
		session: false,
		scope: ["email", "profile"],
		prompt: "select_account",
	})
);

router.get("/logout", (req, res, next) => {
	req.logOut();
	res.redirect("/");
});

router.get(
	"/google/callback",
	passport.authenticate("google", {
		session: false,
	}),
	(req, res) => {
		const accessToken = generateAccessToken(req.user.oauthId, "host");
		res.cookie("vaagle", accessToken, { expires: getTokenExpired(1) });
		res.redirect(routePage.host);
	}
);
module.exports = router;
