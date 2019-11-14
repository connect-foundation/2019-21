import express from "express";
import {config} from "dotenv";

config();

const morgan = require("morgan"); // 로그 모듈

const app = express();

const loggingFormat =
	":method :url :status :res[content-length] - :response-time ms";

app.use(morgan(loggingFormat));

app.use("/host-app", express.static("express/public/host-app"));
app.use("/guest-app", express.static("express/public/guest-app"));
app.use("/main-app", express.static("express/public/main-app"));

app.get("/", (req, res) => {
	res.send("hello");
});

app.listen(3000, () => {
	console.log(`start server at localhost:${3000}`);
});

export default app;
