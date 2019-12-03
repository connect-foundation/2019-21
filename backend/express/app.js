import { config } from "dotenv";
import express from "express";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import loadConfig from "./config/configLoader.js";
import applyStaticAppServing from "./middleware/applyStaticAppServing.js";
import authenticate from "./middleware/authenticate";
import * as google from "./authentication/google";
import authRouter from "./routes/auth";

config();

const { port, publicPath } = loadConfig();
const app = express();

applyStaticAppServing(app, publicPath);

app.use(passport.initialize());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);

app.get("/", authenticate());

app.listen(port, () => {
	console.log(
		`start express server at ${port} with ${process.env.NODE_ENV} mode`
	);
	console.log(`public path = ${publicPath}`);
});

export default app;
