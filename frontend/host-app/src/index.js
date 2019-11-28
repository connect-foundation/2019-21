import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App.js";
import * as serviceWorker from "./libs/serviceWorker.js";
import {initSocketIoClientWrapper} from "./libs/socket.io-Client-wrapper.js";
import configLoader from "./config/configLoader.js";

const config = configLoader();

const webSocketNameSpace = "defaultRoom";

initSocketIoClientWrapper(
	config.websocketHost,
	config.websocketPort,
	webSocketNameSpace,
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
