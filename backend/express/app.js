import { config } from "dotenv";
import express from "express";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import loadConfig from "./config/configLoader.js";
import applyStaticAppServing from "./middleware/applyStaticAppServing.js";
import "./authentication/google.js";
import authRouter from "./routes/auth";
import guestRouter from "./routes/guest";
import hostRouter from "./routes/host";

config();

const { port, publicPath, routePage } = loadConfig();
const app = express();

applyStaticAppServing(app, publicPath);

app.use(passport.initialize());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/guest", guestRouter);
app.use("/host", hostRouter);

app.get("/", (req, res, next) => {
	res.redirect(routePage.main);
});

app.listen(port, () => {
	console.log(
		`start express server at ${port} with ${process.env.NODE_ENV} mode`
	);
	console.log(`public path = ${publicPath}`);
});

export default app;
