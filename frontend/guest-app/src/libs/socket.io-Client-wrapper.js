import io from "socket.io-client";
import {useEffect} from "react";


export function initSocketIoClientWrapper(
	host = "http://127.0.0.1",
	port = 4001,
	nameSpace = ""
) {
	function getSocket(url, nameSpace) {
		const fullPath = nameSpace === "" ? `${url}` : `${url}/${nameSpace}`;
		const socket = io(fullPath);

		socket.on("connect", () => {
			console.log(
				`socket.io client connect to ${fullPath} as ${process.env.NODE_ENV} mode`
			);
		});

		return socket;
	}

	socketClient = getSocket(URL, nameSpace);

	emitSocketEvent = (eventName, func) => () => {
		socketClient.emit(eventName, func());
	};

	useSocket = (eventName = "EMIT", handler = () => {
	}, deps = []) => {
		useEffect(() => {
			socketClient.on(eventName, handler);
		}, deps);
	};


}

export let socketClient = () => {
};
export let emitSocketEvent = () => {
};
export let useSocket = () => {
};

