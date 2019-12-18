import _ from "lodash";

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

function JSONNestJoin(parents, children, parentKey, childKey, func) {
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

function JSONNestJoin2(parents, children, parentKey, childKey, func) {
	const mapped = mappingByKey(children, childKey);

	parents.forEach(parent => {
		const joinValue = parent[parentKey];

		if (mapped[joinValue]) {
			const childElement = mapped[joinValue];

			// eslint-disable-next-line no-param-reassign
			parent = func(parent, childElement);
		}
	});

	return parents;
}

function buildQuestions(object) {
	const copyData = _.cloneDeep(object);
	const {guests, didILikes} = copyData;
	let {questions, emojis, emojiPicks} = copyData;

	questions = JSONNestJoin2(questions, guests, "GuestId", "id", (a, b) => {
		a.guestName = b.name;
		a.isAnonymous = b.isAnonymous;

		return a;
	});

	questions = questions.map(x => {
		x.didILike = false;
		return x;
	});

	questions = JSONNestJoin(
		questions,
		didILikes,
		"id",
		"QuestionId",
		(x, y) => {
			x.didILike = true;
			return x;
		},
	);

	emojis = emojis.map(x => {
		x.key = `${x.QuestionId}_${x.name}`;
		x.didIPick = false;
		return x;
	});
	emojiPicks = emojiPicks.map(x => {
		x.key = `${x.QuestionId}_${x.name}`;
		return x;
	});
	emojis = JSONNestJoin(emojis, emojiPicks, "key", "key", (a, b) => {
		a.didIPick = true;
		return a;
	});

	questions.map(x => {
		x.emojis = [];
		return x;
	});
	questions = JSONNestJoin(questions, emojis, "id", "QuestionId", (a, b) => {
		a.emojis.push(b);
		return a;
	});

	return questions;
}

export default buildQuestions;
