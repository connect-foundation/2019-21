export function timeFormatter(timeString) {
	const timetoken = timeString.split(":");
	return `${timetoken[0].slice(-2)}시${timetoken[1]}분${timetoken[2].slice(0,2)}초 `
}