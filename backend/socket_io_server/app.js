import dotenv from "dotenv";
import express from "express";
import http from "http";
import io from "socket.io";
import configLoader from "./config/configLoader.js";
import socketHandlers from "./socketHandler";
import logger from "./logger.js";
import authenticate from "./middleware/authenticate";

dotenv.config();

const {port} = configLoader();

const app = express();
const httpServer = http.createServer(app).listen(port, () => {
	logger.info(
		`start socket.io server at ${port} with ${process.env.NODE_ENV} mode`,
	);
});

const socketServer = io(httpServer);

function BindAddSocketListener(socket, server, nameSpace) {
	return (eventName, handler) => {
		socket.on(eventName, data => {
			const emit = res => {
				server.to(nameSpace).emit(eventName, res);
			};

			try {
				handler(data, emit, {socket, server});
			} catch (e) {
				console.error(
					`while handing ${eventName} error raise,\n ${e.toString()}\n${
						e.stack
					}`,
				);
				socket.send({status: "error", error: e});
			}
		});
	};
}

const nameSpaceServer = socketServer.of(/.*/);

socketServer.use(authenticate());

nameSpaceServer.on("connection", async socket => {
	const nameSpace = socket.nsp.name;
	const id = socket.id;

	logger.info(`id ${id} connected, room at ${nameSpace}`);

	socket.join(nameSpace);

	const addSocketListener = BindAddSocketListener(
		socket,
		nameSpaceServer,
		nameSpace,
	);

	socketHandlers.forEach(({eventName, handler}) => {
		addSocketListener(eventName, handler);
	});

	socket.on("disconnect", reason => {
		logger.info(`socket id ${id} disconnected, room at ${nameSpace}, reason: ${reason}`);
	});

	socket.on("error", error =>
		logger.info(
			`error occur at socket id ${id} disconnected, room at ${nameSpace},\n ${error.toString()}\n${
				error.stack
			}`,
		),
	);
});

export default app;
