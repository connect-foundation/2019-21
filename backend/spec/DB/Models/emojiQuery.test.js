import {after, afterEach, before, beforeEach, describe, it} from "mocha";
import {
	createEmoji,
	deleteEmojiBy,
	deleteEmojiById,
	getDidIPicked,
	getEmojiCountBy,
	getEmojiGroupByQuestionId,
} from "../../../DB/queries/emoji.js";

describe("emoji query api", () => {
	before(() => {
		console.log("before");
	});

	after(() => {
	});
	beforeEach(() => {
	});
	afterEach(() => {
	});

	//

	it("should able to create emoji", async () => {
		const GuestId = 1;
		const QuestionId = 40;
		const name = "234234";
		const res = await createEmoji({GuestId, name, QuestionId});

		let newId = res.dataValues.id;
	});

	it("should able to delete emoji by  GuestId, name, QuestionId ", async () => {
		const GuestId = 1;
		const QuestionId = 40;
		const name = "234234";
		const res = await deleteEmojiBy({GuestId, name, QuestionId});
	});

	it("should able to get emoji by QuestionId", async () => {
		const GuestId = 1;
		const QuestionId = 49;
		const name = "234234";
		let res = null;

		res = await createEmoji({GuestId, name, QuestionId});
		res = await deleteEmojiById(res.dataValues.id);
	});

	it("should able to get  did i picked emoji", async () => {
		const GuestId = 34;
		const name = "point_up";
		const QuestionId = 33;
		const res = await getDidIPicked({name, GuestId, QuestionId});
	});

	it("should able to get emojiCount By question, name", async () => {
		const QuestionId = 34;
		const name = "point_up";
		const res = await getEmojiCountBy({name, QuestionId});
	});

	it("should able to get emoji group name and questionId by EventId", async () => {
		const QuestionId = 34;
		const name = "point_up";
		const EventId = 2;
		let res = await getEmojiGroupByQuestionId({EventId});

		res = res.map(x => x.get({plain: true}));
	});
});
