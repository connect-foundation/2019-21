import {getQuestionLikeCount} from "../../DB/queries/event.js";
import {
	createQuestion,
	deleteQuestionById,
	getQuestionByGuestId,
	getQuestionReplyByEventId,
	getQuestionsByEventId,
	updateQuestionById,
} from "../../DB/queries/question.js";

// import mocha from "mocha";
//
// mocha.setup({ timeout: 5000 });

function QueryExpectMoreThanOne(result) {
	if (result.length === 0) {
		throw Error("result expect more than one but not");
	}
}

describe("questions query api", () => {
	let newId = null;

	it("should able to get by event id", async () => {
		const eventId = 1;
		const res = await getQuestionsByEventId(eventId);

		QueryExpectMoreThanOne(res);
	}).timeout(1000);

	it("should able to get question reply by event id", async () => {
		const eventId = 1;
		const res = await getQuestionReplyByEventId(eventId);

		QueryExpectMoreThanOne(res);
	}).timeout(1000);

	it("should able to get question EventCodeAndGuestId", async () => {
		let res = await getQuestionsByEventId("u959", 22);

		QueryExpectMoreThanOne(res);
		res = res.map(x => x.get({plain: true}));

		// console.log(res.slice(0, 2));
		// console.log(res.length);
	});

	it("should able to get question likeCount", async () => {
		const eventId = 2;
		const res = await getQuestionLikeCount(eventId);

		QueryExpectMoreThanOne(res);
		// res = res.map(x => x.get({ plain: true }));
		// console.log(res.slice(0, 2));
		// console.log(res.length);
	});

	it("should able to get by event id", async () => {
		const eventId = 2;
		const res = await getQuestionsByEventId(eventId);

		QueryExpectMoreThanOne(res);
	});

	it("should able to get by guest id", async () => {
		const eventId = 17;
		const res = await getQuestionByGuestId(eventId);

		QueryExpectMoreThanOne(res);
	});

	it("should able to create question", async () => {
		const eventId = 2;
		const guestId = 17;
		const content = "soirglsdfhgslkjdfhglksdjfhgk";
		const res = await createQuestion(eventId, content, guestId);

		newId = res.dataValues.id;
		QueryExpectMoreThanOne(res);
	});

	it("should able to delete questionById", async () => {
		const res = await deleteQuestionById(newId);

		QueryExpectMoreThanOne(res);
	});

	it("should able to update question by id", async () => {
		const res = await updateQuestionById({
			content: "sdjfhsldhflskdhfklsajdf",
			id: newId,
		});

		QueryExpectMoreThanOne(res);
	});
});
