import express from "express";
import passport from "passport";
import { generateAccessToken } from "../authentication/token";

const router = express.Router();

router.get(
	"/login",
	passport.authenticate("google", {
		session: false,
		scope: ["email", "profile"],
		prompt: "select_account",
	})
);

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
		res.redirect("http://localhost:3002/");
	}
);
module.exports = router;
