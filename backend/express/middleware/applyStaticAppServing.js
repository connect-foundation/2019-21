import express from "express";

function applyStaticAppServing(app, publicPath) {
	app.use("/host-app", express.static(`${publicPath}/host-app`));
	app.use("/guest-app", express.static(`${publicPath}/guest-app`));
	app.use("/main-app", express.static(`${publicPath}/main-app`));
}

export default applyStaticAppServing;
