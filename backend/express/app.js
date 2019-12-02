import {config} from "dotenv";
import express from "express";
import EventQuery from "../DB/queries/event";
import loadConfig from "./config/configLoader.js";
import applyStaticAppServing from "./middleware/applyStaticAppServing.js";
import morgan from "morgan";
import io from "socket.io";

import http from "http";
import getSequelizeData from "./utils";


config();

const {port, publicPath} = loadConfig();

const app = express();

app.use(morgan("dev"));

applyStaticAppServing(app, publicPath);

app.get("/", async (req, res) => {
	res.send("ok");
});
app.get("/test/:code", async (req, res, next) => {
	try {
		const eventQuery = new EventQuery();
		const questions = await eventQuery.getQuestionsInEvent(req.params.code);

		console.log(getSequelizeData(questions)[0].Questions);
		return res.json(questions);
	} catch (e) {
		return next(e);
	}
});

app.listen(port, () => {
	console.log(`start express server at ${port} with ${process.env.NODE_ENV} mode`);
	console.log(`public path = ${publicPath}`);
});

export default app;
