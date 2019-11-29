import io from "socket.io-client";

function getSocket(URL) {
	const socket = io(URL);

	socket.on("connect", () => {
		console.log(
			`socket.io client connect to ${URL} as ${process.env.NODE_ENV} mode`
		);
	});

	return socket;
}

function combineURL(host, port, nameSpace) {
	return nameSpace ? `${host}:${port}/${nameSpace}` : `${host}:${port}`;
}

export function initSocketIoClientWrapper(
	host = "http://127.0.0.1",
	port = 4001,
	nameSpace = undefined
) {
	const url = combineURL(host, port, nameSpace);

	socketClient = getSocket(url);

	emitSocketEvent = (eventName, func) => () => {
		socketClient.emit(eventName, func());
	};

	useSocket = (eventName = "EMIT", handler = () => {
	},) => {
		socketClient.off(eventName)
		socketClient.on(eventName, handler);
	};
}

export let socketClient = () => {
};
export let emitSocketEvent = () => {
};
export let useSocket = () => {
};

