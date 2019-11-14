import express from "express";
import EventQuery from "../DB/queries/event";

require("dotenv").config();

const app = express();

app.get("/", async (req, res) => {
    res.send("ok");
});

app.get("/test/:code", async (req, res, next) => {
    try {
        const eventQuery = new EventQuery();
        const questions = await eventQuery.getQuestionsInEvent(req.params.code);
        return res.json(questions);
    } catch (e) {
        return next(e);
    }
});

app.listen(3000, () => {
    console.log(`start server at localhost:${3000}`);
});

export default app;
