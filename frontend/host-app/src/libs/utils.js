import moment from "moment";

export function makeNewData(req) {
	return {
		Emojis: [],
		GuestId: req.GuestId,
		content: req.content,
		createdAt: req.createdAt,
		guestName: req.guestName,
		id: req.id,
		likeCount: req.likeCount,
		state: req.state,
		QuestionId: req.QuestionId,
		isStared: false,
	};
}

export function filterQuestion(option, data) {
	return {
		questions: data.questions.filter(
			e => e.state === option && e.QuestionId === null,
		),
	};
}

export function filterStared(option, data) {
	return {
		questions: data.questions.filter(e => {
			if (e.QuestionId !== null) return true;
			return e.isStared === option;
		}),
	};
}

export function filterReplies(id, data) {
	return {questions: data.questions.filter(e => e.QuestionId === id)};
}

function mappingByKey(object, key) {
	const mapped = {};

	object.forEach(x => {
		mapped[x[key]] = x;
	});

	return mapped;
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

export const compareCurrentDateToTarget = baseDate => {
	const endAt = moment(baseDate);
	const current = moment();
	return endAt.diff(current, "minute");
};
