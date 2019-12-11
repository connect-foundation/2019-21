import express from "express";
import loadConfig from "../config/configLoader";
import {hostAuthenticate} from "../middleware/authenticate";

const {routePage} = loadConfig();
const router = express.Router();
const cookieName = "vaagle-host";

router.get("/logout", (req, res, next) => {
	res.clearCookie(cookieName).redirect(routePage.main);
});

router.get("/", hostAuthenticate(), (req, res, next) => {
	res.redirect(routePage.main);
});

module.exports = router;
