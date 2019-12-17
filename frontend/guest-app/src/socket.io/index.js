import io from "socket.io-client";
import React, {createContext} from "react";
import Cookie from "js-cookie";

function combineURL(host, port, nameSpace) {
	return nameSpace ? `${host}:${port}/${nameSpace}` : `${host}:${port}`;
}

function addBoilerplateSocketListener({socket, URL, room}) {
	socket.on("connect", async () => {
		// eslint-disable-next-line no-console
		console.log(
			`socket.io client connect to ${URL} as ${process.env.NODE_ENV} mode`,
		);
	});

	socket.on("joinRoom", () => {
		// eslint-disable-next-line no-console
		console.log(`join room success at ${room}`);
	});

	socket.on("leaveRoom", () => {
		// eslint-disable-next-line no-console
		console.log(`leave room success at ${room}`);
	});

	socket.on("disconnect", reason => {
		// eslint-disable-next-line no-console
		console.log(`io client disconnected by ${reason}`);
	});

	socket.on("reconnect", attemptNumber => {
		// eslint-disable-next-line no-console
		console.log(`io reconnect attempt ${attemptNumber}`);
	});

	socket.on("error", error => {
		// eslint-disable-next-line no-console
		console.log(`io error raise ${error}`);
	});
}

export function createSocketIOClient({host, port, namespace, room}) {
	const cookieName = "vaagle-guest";
	const token = Cookie.get(cookieName);

	const URL = combineURL(host, port, namespace);
	const socket = io(URL, {query: {token}});

	if (process.env.NODE_ENV === "development") {
		addBoilerplateSocketListener({socket, URL, room});
	}

	return socket;
}

export let socketClient = null;

export let useSocket = null;

export function SocketClientProvider(props) {
	const {client, children} = props;

	socketClient = client;
	useSocket = (eventName = "EMIT", handler = () => {}) => {
		socketClient.off(eventName);
		socketClient.on(eventName, handler);
	};
	const context = createContext([]);
	const emit = socketClient.emit;

	return (
		<context.Provider value={{socketClient, emit}}>
			${children}
		</context.Provider>
	);
}
