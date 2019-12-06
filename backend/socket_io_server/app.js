import dotenv from "dotenv";
import express from "express";
import http from "http";
import io from "socket.io";
import configLoader from "./config/configLoader.js";
import socketHandlers from "./socketHandler";
import getLogger from "../libs/logger.js";

dotenv.config();

const {port} = configLoader();
const logger = getLogger("socket.io");
const app = express();
const httpServer = http.createServer(app).listen(port, () => {
	logger.info(
		`start socket.io server at ${port} with ${process.env.NODE_ENV} mode`,
	);
});

const socketServer = io(httpServer);

function BindSocketListener(socket, server) {
	return (eventName, handler) => {
		socket.on(eventName, data => {
			const emit = res => {
				server.emit(eventName, res);
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

nameSpaceServer.on("connection", socket => {
	const nameSpace = socket.nsp.name;
	const id = socket.id;

	logger.info(`id ${id} connected to nameSpace ${nameSpace}`);

	const addSocketListener = BindSocketListener(socket, nameSpaceServer);

	socketHandlers.forEach(({eventName, handler}) => {
		addSocketListener(eventName, handler);
	});
});

export default app;
