import {
	createQuestion,
	deleteQuestionById,
	getQuestionByGuestId,
	getQuestionsByEventId,
	updateQuestionById,
} from "../DB/queries/question.js";

describe("questions query api", () => {
	let newId = null;
	it("should able to get by event id", async () => {
		const eventId = 2;
		let res = await getQuestionsByEventId(eventId);
		// console.log(res.length);
	});

	it("should able to get by guest id", async () => {
		const eventId = 17;
		let res = await getQuestionByGuestId(eventId);
		// console.log(res.length);
	});

	it("should able to create question", async () => {
		const eventId = 2;
		const guestId = 17;
		const content = "soirglsdfhgslkjdfhglksdjfhgk";
		let res = await createQuestion(eventId, content, guestId);

		newId = res.dataValues.id;
		// console.log(newId)
	});

	it("should able to delete questionById", async () => {
		let res = await deleteQuestionById(newId);
		// console.log(res);
	});

	it("should able to update question by id", async () => {
		let res = await updateQuestionById({
			content: "sdjfhsldhflskdhfklsajdf",
			id: newId,
		});
		// console.log(res);
	});
});
