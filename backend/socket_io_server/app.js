import dotenv from "dotenv";
import express from "express";
import http from "http";
import io from "socket.io";
import configLoader from "./config/configLoader.js";
const queries = require("../DB/queries/event");

dotenv.config();
const { port } = configLoader();

const app = express();

const httpServer = http.createServer(app).listen(port, () => {
	console.log(`start server at ${port} with ${process.env.NODE_ENV} mode`);
});

const socketServer = io(httpServer);

function delay_DB_job() {
	return new Promise(resolve =>
		setTimeout(() => {
			resolve();
		}, 1000)
	);
}

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

const handler = async (data, emit) => {
	try {
		console.log(data);

		await delay_DB_job();

		console.log("delayed");
		data.recvDate = new Date();
		// data.n += 1;
		emit(data);
	} catch (e) {
		console.log(e);
		emit({status: "error", e});
	}
};

const questionCreateHandler = async (data, emit) => {
	try {
		console.log(data);

		await delay_DB_job();

		console.log("delayed");

		emit(data);
	} catch (e) {
		console.log(e);
		emit({status: "error", e});
	}
};


socketServer.on("connection", socket => {
	console.log("소켓 IO 연결");
	const addSocketListener = BindSocketListener(socket, socketServer);

	addSocketListener("EMIT", handler);
	addSocketListener("question/create", questionCreateHandler);
});


const nameSpaceServer = socketServer.of("/nameSpace");

nameSpaceServer.on("connection", socket => {
	console.log("네임스페이스 접속");

	const addSocketListener = BindSocketListener(socket, nameSpaceServer);

	addSocketListener("ROOM", (data, emit) => {
		console.log(data);
		emit(data);
	});
});

export default app;
