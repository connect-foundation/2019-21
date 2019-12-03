import express from "express";
import passport from "passport";
import { generateAccessToken } from "../authentication/token";

const router = express.Router();
const hostPage = "http://localhost:5001/";
const guestPage = "http://localhost:5002";

router.get(
	"/login",
	passport.authenticate("google", {
		session: false,
		scope: ["email", "profile"],
		prompt: "select_account",
	})
);

router.get("/guest/:eventCode", (req, res, next) => {
	console.log(req.params);
	res.send("ok");
});

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
		const accessToken = generateAccessToken(req.user.oauthId);
		var farFuture = new Date(
			new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
		);
		res.cookie("vaagle", accessToken, { expires: farFuture });
		res.redirect(hostPage);
	}
);
module.exports = router;
