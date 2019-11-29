import { config } from "dotenv";
import devConfig from "./express.dev.config.js";
import prodConfig from "./express.prod.config.js";
import testConfig from "./express.test.config.js";

config();

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
