import io from "socket.io-client";
import React, {createContext} from "react";

function combineURL(host, port, nameSpace) {
	return nameSpace ? `${host}:${port}/${nameSpace}` : `${host}:${port}`;
}

export function createSocketIOClient({host, port, nameSpace}) {
	const URL = combineURL(host, port, nameSpace);
	const socket = io(URL);

	socket.on("connect", () => {
		console.log(
			`socket.io client connect to ${URL} as ${process.env.NODE_ENV} mode`,
		);
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


