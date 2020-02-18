import {describe, it} from "mocha";
import data from "./testcase.js";

function toMapped(data, attr) {
	const mappped = {};

	data.map(x => {
		mappped[x[attr]] = x;
	});


	return mappped;
}

function fromMapped(data) {
	return Object.values(data);
}

function joinGuest(data, guests) {
	const questionsMapped = toMapped(data, "GuestId");

	guests.forEach(x => {
		if (x.id in questionsMapped) {
			questionsMapped[x.id].guestname = x.name;
			questionsMapped[x.id].isAnonymous = x.isAnonymous;
			// console.log(questionsMapped[x.id]);
		}
	});


	return fromMapped(data);
}

function joinDidILikes(data, didILikes) {
	const res = data.map(x => {
		x.didILikes = false;
		return x;
	});

	const mapped = toMapped(res, "id");

	// console.log(mapped)
	didILikes.map(x => {
		// console.log(x)
		mapped[x.QuestionId].didILikes = true;
	});

	return fromMapped(mapped);
}

function joinEmojiAndEmojiPicks(emojis, emojiPicks) {
	emojis = emojis.map(x => {
		x.id = `${x.name}_${x.QuestionId}`;
		x.didIPick = false;
		return x;
	});

	emojiPicks = emojiPicks.map(x => {
		x.id = `${x.name}_${x.QuestionId}`;
		return x;
	});

	const mapped = toMapped(emojis, "id");

	emojiPicks.map(x => {
		mapped[x.id].didIPick = true;
		return x;
	});

	return fromMapped(mapped);
}

function joinQuestionAndEmoji(questions, emojis) {
	questions = questions.map(x => {
		x.emojis = [];
		return x;
	});

	const mapped = toMapped(questions, "id");

	// console.log(mapped)
	emojis.map(x => {
		mapped[x.QuestionId].emojis.push(x);
	});

	return fromMapped(mapped);
}

function buildQuestions(data) {
	let {questions, emojis, emojiPicks, guests, didILikes} = data;

	questions = joinGuest(questions, guests);
	questions = joinDidILikes(questions, didILikes);
	emojis = joinEmojiAndEmojiPicks(emojis, emojiPicks);

	return joinQuestionAndEmoji(questions, emojis);
}

describe("graphql data assemble", () => {
	it("should assemble questions", () => {
		buildQuestions(data);
	});
});
