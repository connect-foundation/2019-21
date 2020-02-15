class RoomSocket {
	constructor({socket, server, handlerEventPair}) {
		this.socket = socket;
		this.server = server;
		this.handlerPair = handlerEventPair;
		this.registeredHandler = [];
	}

	joinRoom(room) {
		this.room = room;

		this.socket.join(this.room);

		this.registeredHandler = this.handlerPair.map(({eventName, handler}) =>
			this.addListener(eventName, handler),
		);

		this.socket.emit("joinRoom");
	}

	leaveRoom() {
		this.socket.leave(this.room);

		this.registeredHandler.map(({eventName, handler}) =>
			this.socket.removeListener(eventName, handler),
		);

		this.socket.emit("leaveRoom");

		this.room = null;
		this.registeredHandler = [];
	}

	addListener(event, handler) {
		const roomEmit = res => {
			this.server.to(this.room).emit(event, res);
		};

		const wrappedSocketHandler = data => {
			handler(data, roomEmit, {socket: this.socket, server: this.server});
		};

		this.socket.on(event, wrappedSocketHandler);

		return {
			eventName: event,
			handler: wrappedSocketHandler,
		};
	}
}

export default RoomSocket;
