import { config } from "dotenv";
import express from "express";
import EventQuery from "../DB/queries/event";
import io from "socket.io";
import http from "http";

config();

const morgan = require("morgan");
// 로그 모듈
const app = express();
const loggingFormat =
	":method :url :status :res[content-length] - :response-time ms";

app.use(morgan(loggingFormat));
app.use("/host-app", express.static("express/public/host-app"));
app.use("/guest-app", express.static("express/public/guest-app"));
app.use("/main-app", express.static("express/public/main-app"));

app.get("/", async (req, res) => {
	res.send("ok");
});
app.get("/test/:code", async (req, res, next) => {
	try {
		const eventQuery = new EventQuery();
		const questions = await eventQuery.getQuestionsInEvent(req.params.code);

		return res.json(questions);
	} catch (e) {
		return next(e);
	}
});

const httpServer = http.createServer(app).listen(3000, () => {
	console.log(`start server at 3000 with ${process.env.NODE_ENV} mode`);
});
const socketServer = io(httpServer);
socketServer.on("connection", socket => {
	console.log("소켓 IO 연결");
	socket.on("EMIT", req => {
		console.log("sdfsdfsdf");
		console.log(req);
		socketServer.emit("EMIT", req);
	});
});

const nameSpaceServer = socketServer.of("/nameSpace");
nameSpaceServer.on("connect", function(socket) {
	console.log("네임스페이스 접속");
	socket.on("ROOM", req => {
		// client 에서 받은 data에 있는 room id를 받아옴
		const room = (socket.room = req.data);
		// 해당 id Room 에 들어감
		socket.join(room);
		// room 에 있는 모든 client 에게 메세지 전송
		nameSpaceServer.to(room).emit("room_msg", "this is room msg");
		//이제 최초 room 버튼을 눌러 room 에 입장한 이후에는 다른 client가 room 버튼을
		//누를때 마다 그 방에 있는 모든 client의 콘솔이 출력된다.
	});
});

export default app;
