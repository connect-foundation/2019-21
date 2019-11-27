async function queryHello(root, args) {
	return {name: "world", value: 123};
}

async function queryWorld() {
	return {name: "hello", value: 12313, size: 3333};
}

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		hello: queryHello,
		world: queryWorld,
	},
};
