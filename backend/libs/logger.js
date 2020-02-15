import chalk from "chalk";
import winston from "winston";

require("winston-daily-rotate-file");
require("date-utils");

function getRand() {
	return parseInt(String(Math.random() * 150 + 100), 10);
}

function getRandomRGB() {
	return [getRand(), getRand(), getRand()];
}

// reference from https://mungmungdog.tistory.com/34
// add colorize https://github.com/winstonjs/winston/issues/1135

/**
 * simple logger for backend
 *
 *
 * @return {function}
 */
export default (header = "", level = "info") => {
	const RGB = getRandomRGB();

	const format = winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		// winston.format.align(),
		winston.format.printf(info => {
			// todo fix lint here
			// eslint-disable-next-line no-shadow
			const {timestamp, level, message, ...args} = info;

			const ts = timestamp.slice(0, 19).replace("T", " ");

			const head = chalk.rgb(...RGB)(`${ts} | ${header} |`);
			const msg = chalk.rgb(...RGB)(
				`${message} ${
					Object.keys(args).length ?
						JSON.stringify(args, null, 2) :
						""
				}`,
			);

			return `${head} [${level}]: ${msg} `;
		}),
	);

	return winston.createLogger({
		level, // 최소 레벨
		transports: [
			new winston.transports.Console({
				format,
			}),
		],
	});
};
