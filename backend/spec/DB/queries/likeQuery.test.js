import assert from "assert";
import {before, beforeEach, describe, it} from "mocha";
import {
	createLike,
	deleteLikeBy,
	getLikesByGuestId,
} from "../../../DB/queries/like.js";
import models from "../../../DB/models";

describe("like query api", () => {
	before(async () => {
		await models.sequelize.sync();
	});

	beforeEach(async () => {
		await models.Like.destroy({where: {}, truncate: true});
	});

	it("should able to create Like", async () => {
		// given
		const QuestionId = null;
		const GuestId = null;

		// when
		const res = await createLike({QuestionId, GuestId});

		// than

		assert(res.id > 0);
		assert.equal(res.GuestId, GuestId);
		assert.equal(res.QuestionId, QuestionId);
	});

	it("should able to delete Like by ", async () => {
		// given
		const QuestionId = null;
		const GuestId = null;

		await createLike({QuestionId, GuestId});

		// when
		const res = await deleteLikeBy({QuestionId, GuestId});

		// than
		assert.equal(res, 1);
	});

	it("should able to get likes by guest id", async () => {
		// given
		const QuestionId = null;
		const GuestId = null;
		const like = await createLike({QuestionId, GuestId});

		// when
		const res = await getLikesByGuestId(GuestId);

		// than
		assert.equal(res.length, 1);
		assert.deepStrictEqual(res[0], like);
	});
});
