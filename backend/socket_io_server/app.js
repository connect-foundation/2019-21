import dotenv from "dotenv";
import express from "express";
import http from "http";
import io from "socket.io";
import configLoader from "./config/configLoader.js";
import socketHandlers from "./socketHandler";
const queries = require("../DB/queries/event");


dotenv.config();

const { port } = configLoader();
const app = express();
const httpServer = http.createServer(app).listen(port, () => {
	console.log(`start socket.io server at ${port} with ${process.env.NODE_ENV} mode`);
});

const socketServer = io(httpServer);

function BindSocketListener(socket, server) {
	return (eventName, handler) => {
		socket.on(eventName, data => {
			const emit = () => {
				server.emit(eventName, data);
			};

			handler(data, emit);
		});
	};
}

socketServer.on("connection", socket => {
	const id = socket.id;
	console.log(`id ${id} connected `);

	const addSocketListener = BindSocketListener(socket, socketServer);

	socketHandlers.forEach(({ eventName, handler }) => {
		console.log(`apply handler at ${eventName} event`);
		addSocketListener(eventName, handler);
	});
});

const nameSpaceServer = socketServer.of(/.*/);

nameSpaceServer.on("connection", socket => {
	const nameSpace = socket.nsp.name;
	const id = socket.id;

	console.log(`id ${id} connected to nameSpace ${nameSpace}`);

	const addSocketListener = BindSocketListener(socket, nameSpaceServer);

	socketHandlers.forEach(({ eventName, handler }) => {
		console.log(`apply handler at ${eventName} event`);
		addSocketListener(eventName, handler);
	});
});

export default app;
