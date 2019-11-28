export function delay_DB_job() {
	return new Promise(resolve =>
		setTimeout(() => {
			resolve();
		}, 1000),
	);
}
