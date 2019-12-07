export function makeNewData(req) {
	const newData = {
		Emojis: [],
		GuestId: req.GuestId,
		content: req.content,
		createdAt: req.createdAt,
		guestName: req.guestName,
		id: req.id,
		isLike: req.didILike,
		likeCount: req.likeCount,
		state: req.status,
	};
	return newData;
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
