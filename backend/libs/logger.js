import chalk from "chalk";
import winston from "winston";

require("winston-daily-rotate-file");
require("date-utils");

function getRand() {
	return parseInt(Math.random() * 255, 10);
}

const randomRGB = [getRand(), getRand(), getRand()];

// reference from https://mungmungdog.tistory.com/34
// add colorize https://github.com/winstonjs/winston/issues/1135

/**
 * simple logger for backend
 *
 *
 * @return {function}
 */
export default (header = "") => {
	const format = winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		// winston.format.align(),
		winston.format.printf(info => {
			const {timestamp, level, message, ...args} = info;

			const ts = timestamp.slice(0, 19).replace("T", " ");

			const head = chalk.rgb(...randomRGB)(`${ts} | ${header}`);
			const msg = chalk.rgb(...randomRGB)(
				`${message} ${
					Object.keys(args).length ?
						JSON.stringify(args, null, 2) :
						""
				}`,
			);

			return `${head} | [${level}]: ${msg} `;
		}),
	);

	return winston.createLogger({
		level: "info", // 최소 레벨
		transports: [
			new winston.transports.DailyRotateFile({
				filename: "log/system.log", // log 폴더에 system.log 이름으로 저장
				zippedArchive: true, // 압축여부
				format,
			}), new winston.transports.Console({
				format,
			}),
		],
	});
};
