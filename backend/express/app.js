import {config} from "dotenv";
import express from "express";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import loadConfig from "./config/configLoader.js";
import applyStaticAppServing from "./middleware/applyStaticAppServing.js";
import authenticate from "./middleware/authenticate";
import generateAccessToken from "./authentication/token";
import {createGuest} from "../DB/queries/guest";
import {getEventIdByEventCode} from "../DB/queries/event";
import {getTokenExpired} from "./utils";
import "./authentication/google.js";
import authRouter from "./routes/auth";

config();

const {port, publicPath, routePage} = loadConfig();
const app = express();

applyStaticAppServing(app, publicPath);

app.use(passport.initialize());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);

app.get("/", authenticate(), (req, res, next) => {
	res.redirect(routePage.main);
});
app.get("/:path", authenticate(), async (req, res, next) => {
	try {
		const path = req.params.path;
		const eventCode = Buffer.from(path, "base64").toString();
		let eventId = await getEventIdByEventCode(eventCode);

		eventId = eventId.dataValues.id;
		const guest = await createGuest("Anonymous", eventId);
		const accessToken = generateAccessToken(guest.guestSid, "guest");

		res.cookie("vaagle", accessToken, {expires: getTokenExpired(1)});
		res.redirect(routePage.guest);
	} catch (e) {
		res.redirect(routePage.main);
	}
});

app.listen(port, () => {
	console.log(
		`start express server at ${port} with ${process.env.NODE_ENV} mode`,
	);
	console.log(`public path = ${publicPath}`);
});

export default app;
