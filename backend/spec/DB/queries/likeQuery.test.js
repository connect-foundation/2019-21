import {describe, it} from "mocha";
import {
	createLike,
	deleteLikeById,
	getDidILikes,
	getLikeCountByQuestion,
	getLikesByGuestId,
	getLikesByQuestionId,
} from "../../../DB/queries/like.js";

describe("like query api", () => {
	let newId = null;

	it("should able to create Like", async () => {
		const eventId = 2;
		const res = await createLike(eventId);

		newId = res.dataValues.id;
		// todo add assertion
	});

	it("should able to delete Like", async () => {
		await deleteLikeById(newId);
		// todo add assertion
	});

	it("should able to get likes by guest id", async () => {
		const guestId = 17;

		await getLikesByGuestId(guestId);
		// todo add assertion
	});

	it("should able to get likes question id", async () => {
		const questionId = 34;

		await getLikesByQuestionId(questionId);
		// todo add assertion
	});

	it("should able to get like count By Question", async () => {
		const questionId = 34;

		await getLikeCountByQuestion(questionId);
		// todo add assertion
	});

	it("should able to get didILiked", async () => {
		const QuestionId = 11;
		const GuestId = 58;

		await getDidILikes({
			QuestionId,
			GuestId,
		});
		// todo add assertion
	});
});
