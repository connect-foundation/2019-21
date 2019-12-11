import devConfig from "./env.dev.config.js";
import prodConfig from "./env.prod.config.js";

function configLoader() {
	if (process.env.NODE_ENV === "development") {
		return devConfig;
	} else {
		return prodConfig;
	}
}

const config = configLoader();

export default config;
