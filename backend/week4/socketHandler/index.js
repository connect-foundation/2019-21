import * as path from "path";
import glob from "glob";

function fileLoader(path) {
	const files = glob.sync(path);

	const handlers = files.map(file => {
		// eslint-disable-next-line import/no-dynamic-require
		return require(file).default;
	});

	return handlers;
}

const socketHandlers = fileLoader(path.join(__dirname, "./**/*.socketHandler.js"));

export default socketHandlers;
