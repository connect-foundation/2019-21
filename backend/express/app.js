import express from "express";

require("dotenv").config();
const logger = require("morgan"); // 로그 모듈

const app = express();

app.use(logger("dev"));
app.get("/", (req, res) => {
	res.send("hello");
});

app.listen(3000, () => {
	console.log(`start server at localhost:${3000}`);
});

export default app;
