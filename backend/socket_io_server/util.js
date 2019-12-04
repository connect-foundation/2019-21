export default function verySlowJob() {
	return new Promise(resolve =>
		setTimeout(() => {
			resolve();
		}, 1000),
	);
}
