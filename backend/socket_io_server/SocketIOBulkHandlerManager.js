import logger from "./logger.js";

const bindAddSocketListener = (socket, server, room) => (
	eventName,
	handler,
) => {
	const wrappedHandler = data => {
		const emit = res => {
			server.to(room).emit(eventName, res);
		};

		try {
			handler(data, emit, {socket, server});
		} catch (e) {
			logger.error(
				`while handing ${eventName} error raise,\n ${e.toString()}\n${
					e.stack
				}`,
			);
			socket.send({status: "error", error: e});
		}
	};

	socket.on(eventName, wrappedHandler);

	return () => {
		socket.off(eventName, wrappedHandler);
	};
};

export const addBulkSocketIOHandlers = ({handlers, socket, server, room}) => {
	const addSocketListener = bindAddSocketListener(socket, server, room);

	const AttachedHandlers = handlers.map(({eventName, handler}) => {
		addSocketListener(eventName, handler);
	});

	return () => AttachedHandlers.map(removeHandler => removeHandler());
};
