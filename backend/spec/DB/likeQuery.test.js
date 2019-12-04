import {
	createLike,
	deleteLikeById,
	getDidILiked,
	getLikeCountByQuestion,
	getLikesByGuestId,
	getLikesByQuestionId,
} from "../../DB/queries/like.js";

describe("like query api", () => {
	let newId = null;

	it("should able to create Like", async () => {
		const eventId = 2;
		const res = await createLike(eventId);

		newId = res.dataValues.id;
		// console.log(res.length);
	});

	it("should able to delete Like", async () => {
		const id = newId;
		const res = await deleteLikeById(id);
		// console.log(res.length);
	});

	it("should able to get likes by guest id", async () => {
		const guestId = 17;
		const res = await getLikesByGuestId(guestId);
		// console.log(newId)
	});

	it("should able to get likes question id", async () => {
		const questionId = 34;
		const res = await getLikesByQuestionId(questionId);
		// console.log(res);
	});

	it("should able to get like count By Question", async () => {
		const questionId = 34;
		const res = await getLikeCountByQuestion(questionId);
		// console.log(res);
	});

	it("should able to get didILiked", async () => {
		const QuestionId = 11;
		const GuestId = 58;
		const res = await getDidILiked({
			QuestionId,
			GuestId,
		});
		// console.log(res);
	});
});
