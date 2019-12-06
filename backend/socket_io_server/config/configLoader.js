import dotenv from "dotenv";
import devConfig from "./socket.dev.config.js";
import prodConfig from "./socket.prod.config.js";
import testConfig from "./socket.test.config.js";

dotenv.config();

function loadConfig() {
	let config = {};

	if (process.env.NODE_ENV === "production") {
		config = prodConfig;
	} else if (process.env.NODE_ENV === "test") {
		config = testConfig;
	} else {
		config = devConfig;
	}
	return config;
}

export default loadConfig;
