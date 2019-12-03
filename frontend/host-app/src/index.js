import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import { ApolloProvider } from "@apollo/react-hooks";
import "./index.css";
import App from "./App/App.js";
import * as serviceWorker from "./libs/serviceWorker.js";
import { initSocketIoClientWrapper } from "./libs/socket.io-Client-wrapper.js";
import configLoader from "./config/configLoader.js";

import creaetApolloClient from "./libs/createApolloClient";

const config = configLoader();

const webSocketNameSpace = "defaultRoom";

initSocketIoClientWrapper(
	config.websocketHost,
	config.websocketPort,
	webSocketNameSpace,
);

const cookieName = "vaagle";
const uri = "http://127.0.0.1:8000/graphql";
const token =
	Cookies.get(cookieName) ||
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzUyOTQxMTUsImV4cCI6MTU3Nzg4NjExNSwiYXVkIjoiaG9zdCIsImlzcyI6IlZhYWdsZSIsInN1YiI6Ikl2YS5BZGFtczk3In0.eD78CdyqQ6NEsfuJtVtJjVhK4tDvkZq9oQBFSgWDKXo";

console.log(token);

const client = creaetApolloClient(uri, token);

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
