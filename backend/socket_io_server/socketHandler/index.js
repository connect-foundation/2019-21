import * as path from "path";
import glob from "glob";

// socket handler 구현모듈을 동적으로 로딩하게 한다
// 하위디렉토리에서 *.socketHandler.js에 해당하는 모든 파일을 로딩한다
// *.socketHandler.js export default 로 eventName과 핸들러 함수를 익스포트 해야한다.
// Hello.socketHandler.js 참조
function fileLoader(filePath) {
	const files = glob.sync(filePath);

	return files.map(
		file =>
			// eslint-disable-next-line import/no-dynamic-require
			require(file).default,
	);
}

const socketHandlers = fileLoader(
	path.join(__dirname, "./**/*.socketHandler.js"),
);

export default socketHandlers;
