import io from "socket.io-client";
import { useEffect } from "react";

export function initSocketIo(nameSpace = "") {
	const PORT = 4000;
	let URL = `http://127.0.0.1:${PORT}`;

	function getSocket(url = URL, nameSpace = "") {
		const fullPath = nameSpace === "" ? `${url}` : `${url}/${nameSpace}`;
		const socket = io(fullPath);

		socket.on("connect", () => {
			console.log(`socket.io client connect to ${fullPath}`);
		});

		return socket;
	}

	socketClient = getSocket(URL);
	socketClientAtNameSpace = getSocket(URL, nameSpace);


	emitSocketEvent = (eventName, func) => {
		return () => {
			socketClient.emit(eventName, func());
		};
	};

	useSocket = (eventName = "EMIT", handler = () => {}, deps = []) => {
		useEffect(() => {
			socketClient.on(eventName, handler);
		}, deps);
	};
}

export let socketClient = () => {};
export let socketClientAtNameSpace = () => {};
export let emitSocketEvent = () => {};
export let useSocket = () => {};
