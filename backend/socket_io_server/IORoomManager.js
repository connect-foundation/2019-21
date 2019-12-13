import logger from "./logger.js";

const IORoomManager = ({socket, afterJoinRoom, afterLeaveRoom, room}) => {
	const id = socket.id;
	let currentRoom = room;

	const joinRoom = async room => {
		try {
			await socket.join(room);
			currentRoom = room;
		} catch (e) {
			logger.error(`error raised while join room ${e}`);
		}
	};

	const leaveRoom = async () => {
		try {
			socket.leave(currentRoom);
			currentRoom = null;
		} catch (e) {
			logger.error(`error raised while leave room ${e}`);
		}
	};

	const onJoinRoom = async req => {
		if (currentRoom) {
			logger.error(`id: ${id} already join in room`);
			return;
		}

		await joinRoom(req.room);
		socket.emit("joinRoom");
		afterJoinRoom(req.room, socket);
	};

	const onLeaveRoom = async req => {
		if (currentRoom === null) {
			logger.error(`id: ${id} is not in room`);
			return;
		}

		const lastRoom = currentRoom;

		await leaveRoom();
		socket.emit("leaveRoom");
		afterLeaveRoom(lastRoom, socket);
	};

	const onChangeRoom = async req => {
		await onLeaveRoom(req);
		await onJoinRoom(req);
	};

	socket.on("joinRoom", onJoinRoom);
	socket.on("leaveRoom", onLeaveRoom);
	socket.on("changeRoom", onChangeRoom);
};

export default IORoomManager;
