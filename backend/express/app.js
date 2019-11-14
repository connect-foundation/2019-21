import express from "express";

const models = require("../DB/models");

require("dotenv").config();

const app = express();

app.get("/", async (req, res) => {
    const host = await models.Question.findAll({
        include: [
            {
                model: models.Question,
                // include: [
                //     {
                //         model: models.Question,
                //         through: {},
                //     },
                // ],
            },
        ],
    });

    res.json(host);
});

app.listen(3000, () => {
    console.log(`start server at localhost:${3000}`);
});

export default app;
