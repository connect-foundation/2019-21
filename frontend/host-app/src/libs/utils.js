export function timeFormatter(timeString) {
	const timetoken = timeString.split(":");
	return `${timetoken[0].slice(-2)}시${timetoken[1]}분${timetoken[2].slice(0, 2)}초 `
}

function mappingByKey(object, key) {
	const mappped = {};

	object.forEach(x => {
		mappped[x[key]] = x;
	});

	return mappped;
}

function unMappingByKey(object) {
	return Object.values(object);
}

export function JSONNestJoin(parents, childs, parentKey, childKey, func) {
	const mapped = mappingByKey(parents, parentKey);

	childs.forEach(child => {
		const joinValue = child[childKey];

		if (mapped[joinValue]) {
			const parentElement = mapped[joinValue];

			mapped[joinValue] = func(parentElement, child);
		}
	});

	return unMappingByKey(mapped);
}

export function JSONNestJoin2(parents, childs, parentKey, childKey, func) {
	const mapped = mappingByKey(childs, childKey);
	parents.forEach(parent => {
		const joinValue = parent[parentKey];
		if (mapped[joinValue]) {
			const childElement = mapped[joinValue];
			parent = func(parent, childElement);
		}
	});
	return parents;
}
