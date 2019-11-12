import express from "express";
const models = require("../DB/models");

require("dotenv").config();

const app = express();

app.get("/", async (req, res) => {
    const host = await models.Guest.findAll({
        include: [models.Event],
    });
    res.json(host);
});

app.listen(3000, () => {
    console.log(`start server at localhost:${3000}`);
});

export default app;
