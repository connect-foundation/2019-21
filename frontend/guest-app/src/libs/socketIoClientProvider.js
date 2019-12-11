import io from "socket.io-client";
import React, {createContext} from "react";

function combineURL(host, port, nameSpace) {
	return nameSpace ? `${host}:${port}/${nameSpace}` : `${host}:${port}`;
}

export function createSocketIOClient({host, port, namespace, room}) {

	const URL = combineURL(host, port, namespace);
	const socket = io(URL);

	socket.on("connect", async () => {
		console.log(
			`socket.io client connect to ${URL} as ${process.env.NODE_ENV} mode`,
		);
	});

	socket.on("joinRoom", () => {
		console.log(`join room success at ${room}`);
	});

	socket.on("leaveRoom", () => {
		console.log(`leave room success at ${room}`);
	});

	socket.on("disconnect", (reason) => {
		console.log(`io client disconnected by ${reason}`);
	});

	socket.on("reconnect", (attemptNumber) => {
		console.log(`io reconnect attempt ${attemptNumber}`);
	});

	socket.on("error", (error) => {
		console.log(`io error raise ${error}`);
	});

	return socket;
}

export let socketClient = null;

export let useSocket = null;

export function SocketIoClientProvider(props) {
	const {client, children} = props;

	socketClient = client;
	useSocket = (eventName = "EMIT", handler = () => {
	}) => {
		socketClient.off(eventName);
		socketClient.on(eventName, handler);
	};
	const context = createContext([]);
	const emit = socketClient.emit;

	return (
		<context.Provider value={{socketClient, emit}}>${children}</context.Provider>
	);
}


