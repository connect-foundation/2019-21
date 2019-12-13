import devConfig from "./env.dev.config.js";
import prodConfig from "./env.prod.config.js";

function index() {
	if (process.env.NODE_ENV === "development") {
		return devConfig;
	} else {
		return prodConfig;
	}
}

const config = index();

export default config;
