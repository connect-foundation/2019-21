import * as path from "path";
import glob from "glob";

function fileLoader(filePath) {
	const files = glob.sync(filePath);

	const handlers = files.map(file =>
		// eslint-disable-next-line import/no-dynamic-require
		require(file).default,
	);

	return handlers;
}

const socketHandlers = fileLoader(path.join(__dirname, "./**/*.socketHandler.js"));

export default socketHandlers;
