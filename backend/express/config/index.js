import dotenv from "dotenv";
import devConfig from "./express.dev.config.js";
import prodConfig from "./express.prod.config.js";
import testConfig from "./express.test.config.js";

dotenv.config();

function loadConfig() {
	let configs = {};

	if (process.env.NODE_ENV === "production") {
		configs = prodConfig;
	} else if (process.env.NODE_ENV === "test") {
		configs = testConfig;
	} else {
		configs = devConfig;
	}

	return configs;
}

const config = loadConfig();

export default config;
