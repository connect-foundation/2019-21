import express from "express";

require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(3000, () => {
    console.log(`start server at localhost:${3000}`);
});

export default app;
