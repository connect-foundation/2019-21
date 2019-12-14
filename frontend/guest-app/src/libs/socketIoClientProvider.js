import io from "socket.io-client";
import React, {createContext} from "react";
import Cookie from "js-cookie";

function combineURL(host, port, nameSpace) {
	return nameSpace ? `${host}:${port}/${nameSpace}` : `${host}:${port}`;
}

export function createSocketIOClient({host, port, namespace, room}) {
	const GUEST_COOKIE_KEY = "vaagle-guest";
	const token = Cookie.get(GUEST_COOKIE_KEY);
	const URL = combineURL(host, port, namespace);
	const socket = io(URL, {query: {token: token}});

	socket.on("connect", async () => {
		console.debug(
			`socket.io client connect to ${URL} as ${process.env.NODE_ENV} mode`,
		);
	});

	socket.on("joinRoom", () => {
		console.debug(`join room success at ${room}`);
	});

	socket.on("leaveRoom", () => {
		console.debug(`leave room success at ${room}`);
	});

	socket.on("disconnect", (reason) => {
		console.debug(`io client disconnected by ${reason}`);
	});

	socket.on("reconnect", (attemptNumber) => {
		console.debug(`io reconnect attempt ${attemptNumber}`);
	});

	socket.on("error", (error) => {
		console.debug(`io error raise ${error}`);
	});

	return socket;
}

export let socketClient = null;

export let useSocket = null;

export function SocketIoClientProvider(props) {
	const {client} = props;

	socketClient = client;
	useSocket = (eventName = "EMIT", handler = () => {
	}) => {
		socketClient.off(eventName);
		socketClient.on(eventName, handler);
	};
	const context = createContext([]);
	const emit = socketClient.emit;

	return (
		<context.Provider value={{socketClient, emit}} {...props}/>
	);
}


