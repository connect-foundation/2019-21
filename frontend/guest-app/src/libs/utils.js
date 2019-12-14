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

export function JSONNestJoin(parents, children, parentKey, childKey, func) {
	const mapped = mappingByKey(parents, parentKey);

	children.forEach(child => {
		const joinValue = child[childKey];

		if (mapped[joinValue]) {
			const parentElement = mapped[joinValue];

			mapped[joinValue] = func(parentElement, child);
		}
	});

	return unMappingByKey(mapped);
}

export function JSONNestJoin2(parents, children, parentKey, childKey, func) {
	const mapped = mappingByKey(children, childKey);
	parents.forEach(parent => {
		const joinValue = parent[parentKey];
		if (mapped[joinValue]) {
			const childElement = mapped[joinValue];
			parent = func(parent, childElement);
		}
	});

	return parents;
}
