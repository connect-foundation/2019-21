import { config } from "dotenv";
import express from "express";
import EventQuery from "../DB/queries/event";
import http from "http";
import getSequelizeData from "./utils";

config();

const morgan = require("morgan");
// 로그 모듈
const app = express();
const loggingFormat =
	":method :url :status :res[content-length] - :response-time ms";

app.use(morgan(loggingFormat));
app.use("/host-app", express.static("express/public/host-app"));
app.use("/guest-app", express.static("express/public/guest-app"));
app.use("/main-app", express.static("express/public/main-app"));

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

const httpServer = http.createServer(app).listen(3000, () => {
	console.log(`start server at 3000 with ${process.env.NODE_ENV} mode`);
});


export default app;
