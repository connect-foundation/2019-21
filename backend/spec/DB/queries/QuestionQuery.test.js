import assert from "assert";
import {afterEach, before, beforeEach, describe, it} from "mocha";
import {
	createQuestion,
	deleteQuestionById,
	getQuestionByGuestId,
	getQuestionById,
	getQuestionReplyByEventId,
	getQuestionsByEventId,
	updateQuestionById,
	updateQuestionIsStared,
} from "../../../DB/queries/question.js";
import models from "../../../DB/models";

describe("questions query api", () => {
	before(async () => {
		await models.sequelize.sync();
	});

	beforeEach(async () => {
		await models.Question.destroy({where: {}, truncate: true});
	});

	afterEach(async () => {
		await models.Question.destroy({where: {}, truncate: true});
	});

	it("should able to create question", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		// when
		const res = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// than
		assert(typeof res === "object");
		assert.equal(res.EventId, EventId);
		assert.equal(res.GuestId, GuestId);
		assert.equal(res.content, content);
		assert.equal(res.state, "active");
		assert(typeof res.createdAt !== "undefined");
		assert(typeof res.updatedAt !== "undefined");
	});

	it("should able to get by event id", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// when
		const res = await getQuestionsByEventId(EventId);

		// than
		assert(res.length > 0);
		assert.deepStrictEqual(res[0], question);
	});

	it("should able to get question reply by event id", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		const reply1 = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId: question.id,
		});

		// when
		const res = await getQuestionReplyByEventId(EventId);

		// than
		assert(res.length > 0);
		assert.deepStrictEqual(res[0], reply1);
	});

	it("should able to get by guest id", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// when
		const res = await getQuestionByGuestId(GuestId);

		// than
		assert(res.length > 0);
		assert.deepStrictEqual(res[0], question);
	});

	it("should able to delete questionById", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// when
		const res = await deleteQuestionById(question.id);

		assert(res > 0);

		const ret = await models.Question.findOne({where: {id: question.id}});

		assert.equal(ret, null);
	});

	it("should able to update question by id", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId,
		});
		const newContent = "new new content";

		// when
		const res = await updateQuestionById({
			content: newContent,
			id: question.id,
		});

		assert(res > 0);

		const ret = (
			await models.Question.findOne({where: {id: question.id}})
		).get({plain: true});

		assert.equal(ret.content, newContent);
	});

	it("should able to updateQuestionIsStared", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question1 = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		const question2 = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// when
		await updateQuestionIsStared({
			from: question1.id,
			to: question2.id,
		});

		// than
		const q1 = await getQuestionById(question1.id);
		const q2 = await getQuestionById(question2.id);

		assert.equal(q1.isStared, false);
		assert.equal(q2.isStared, true);
	});

	it("should able to getQuestionById", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const createdQuestion = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// when
		const question = await getQuestionById(createdQuestion.id);

		// than
		assert.deepStrictEqual(createdQuestion, question);
	});

	it("should able to updateEveryState", async () => {
		// todo implement me
		assert(false);
	});
});
