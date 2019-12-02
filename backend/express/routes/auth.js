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

router.get("/guest/:eventCode", function(req, res, next) {
	console.log(req.params);
	res.send("ok");
});

router.get("/logout", function(req, res, next) {
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
		res.cookie("vaagle", accessToken);
		res.redirect(hostPage);
	}
);
module.exports = router;
