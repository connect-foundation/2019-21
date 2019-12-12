import dotenv from "dotenv";
import devConfig from "./dev.config.js";
import prodConfig from "./prod.config.js";

dotenv.config();

function loadConfig() {
	let config = {};

	if (process.env.NODE_ENV === "production") {
		config = prodConfig;
	} else if (process.env.NODE_ENV === "test") {
		config = prodConfig;
	} else {
		config = devConfig;
	}
	return config;
}

const config = loadConfig();

export default config;
