import {before, describe, it} from "mocha";
import {
	createLike,
	deleteLikeById,
	getDidILikes,
	getLikeCountByQuestion,
	getLikesByGuestId,
	getLikesByQuestionId,
} from "../../../DB/queries/like.js";
import models from "../../../DB/models";

describe("like query api", () => {
	let newId = null;

	before(async () => {
		await models.sequelize.sync();
	});

	it("should able to create Like", async () => {
		const eventId = null;
		const res = await createLike(eventId);

		newId = res.dataValues.id;
		// todo add assertion
	});

	it("should able to delete Like", async () => {
		await deleteLikeById(newId);
		// todo add assertion
	});

	it("should able to get likes by guest id", async () => {
		const guestId = null;

		await getLikesByGuestId(guestId);
		// todo add assertion
	});

	it("should able to get likes question id", async () => {
		const questionId = null;

		await getLikesByQuestionId(questionId);
		// todo add assertion
	});

	it("should able to get like count By Question", async () => {
		const questionId = null;

		await getLikeCountByQuestion(questionId);
		// todo add assertion
	});

	it("should able to get didILiked", async () => {
		const QuestionId = null;
		const GuestId = null;

		await getDidILikes({
			QuestionId,
			GuestId,
		});
		// todo add assertion
	});
});
