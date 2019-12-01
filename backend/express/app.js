import {config} from "dotenv";
import express from "express";
import passport from "passport";
import loadConfig from "./config/configLoader.js";
import applyStaticAppServing from "./middleware/applyStaticAppServing.js";
import morgan from "morgan";
import { getEventsByHost } from "../DB/queries/event";
import * as google from "./authentication/google";
import * as jwt from "./authentication/jwt";
import authRouter from "./routes/auth";
import cors from "cors";

config();

const { port, publicPath } = loadConfig();
const app = express();
applyStaticAppServing(app, publicPath);

app.use(passport.initialize());
app.use(morgan("dev"));
app.use(cors());

app.use("/auth", authRouter);

app.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		let result = await getEventsByHost(req.user.id);
		result = { events: result, host: req.user };
		console.log(result);
		res.json({ ...result });
	}
);

app.listen(port, () => {
	console.log(
		`start express server at ${port} with ${process.env.NODE_ENV} mode`
	);
	console.log(`public path = ${publicPath}`);
});

export default app;
