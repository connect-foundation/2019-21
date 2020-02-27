import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import config from "./config";
import applyStaticAppServing from "./middleware/applyStaticAppServing.js";
import "./authentication/google.js";
import authRouter from "./routes/auth";
import guestRouter from "./routes/guest";
import hostRouter from "./routes/host";
import logger from "./logger.js";

dotenv.config();

const {port, publicPath, routePage} = config;
const app = express();

applyStaticAppServing(app, publicPath);

app.use(passport.initialize());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/guest", guestRouter);
app.use("/host", hostRouter);

app.get("/", (req, res) => {
	res.redirect(routePage.main);
});

app.listen(port, () => {
	logger.info(
		`start express server at ${port} with ${process.env.NODE_ENV} mode at public path = ${publicPath}`,
	);
});

// noinspection JSUnusedGlobalSymbols
export default app;
