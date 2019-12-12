function recursiveHOCChaining(chains) {
	if (chains.length === 1) {
		return chains[0];
	}

	return chains[0](HOCChaining(chains.slice(1)));
}

function HOCChaining(chains) {
	try {
		return recursiveHOCChaining(chains);
	} catch (e) {
		throw Error(`while chaining HOC error raised ${e}\n${e.stack}`);
	}
}

export default HOCChaining;
