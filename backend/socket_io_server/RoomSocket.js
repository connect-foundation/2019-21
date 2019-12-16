class RoomSocket {
	constructor({socket, server, handlerEventPair}) {
		this.socket = socket;
		this.server = server;
		this.handlerPiar = handlerEventPair;
	}

	joinRoom(room) {
		this.room = room;

		this.socket.join(this.room);

		this.handlerPiar.map(({eventName, handler}) =>
			this.addListener(eventName, handler),
		);

		this.socket.emit("joinRoom");
	}

	leaveRoom() {
		this.socket.leave(this.room);

		this.handlerPiar.map(({eventName, handler}) =>
			this.removeListener(eventName, handler),
		);

		this.socket.emit("leaveRoom");

		this.room = null;
	}

	addListener(event, handler) {
		const roomEmit = res => {
			this.server.to(this.room).emit(event, res);
		};

		const wrappedSocketHandler = data => {
			handler(data, roomEmit, {socket: this.socket, server: this.server});
		};

		this.socket.on(event, wrappedSocketHandler);
	}

	removeListener(event, handler) {
		this.socket.off(event, handler);
	}
}

export default RoomSocket;
