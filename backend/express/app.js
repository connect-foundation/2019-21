import { config } from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import loadConfig from "./config/configLoader.js";
import applyStaticAppServing from "./middleware/applyStaticAppServing.js";
import morgan from "morgan";
import * as auth from "./auth/passport";
import connect_memjs from "connect-memjs";
import authRouter from "./routes/auth";

config();

const { port, publicPath, mechacheArgs } = loadConfig();
const MemcachedStore = connect_memjs(session);
const sessionConfig = {
	resave: false,
	saveUninitialized: false,
	secret: "SECRTET",
	signed: true,
	store: new MemcachedStore({
		mechacheArgs,
	}),
};

const app = express();

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
app.use("/auth", authRouter);

applyStaticAppServing(app, publicPath);

app.get("/", async (req, res) => {
	console.log(req.session);
	res.send("ok");
});

app.listen(port, () => {
	console.log(
		`start express server at ${port} with ${process.env.NODE_ENV} mode`
	);
	console.log(`public path = ${publicPath}`);
});

export default app;
