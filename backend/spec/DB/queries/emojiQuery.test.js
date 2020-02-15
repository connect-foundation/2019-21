import assert from "assert";
import {before, describe, it} from "mocha";
import {
	createEmoji,
	deleteEmojiBy,
	deleteEmojiById,
	getDidIPicked,
	getEmojiCountBy,
	getEmojiCountByEventIdGroupByQuestionId,
	getEmojiPick,
} from "../../../DB/queries/emoji.js";

import models from "../../../DB/models";

// noinspection JSUnresolvedVariable
const Emoji = models.Emoji;

describe("emoji query api", () => {
	before(async () => {
		await models.sequelize.sync();
	});

	after(async () => {
		Emoji.destroy({
			where: {},
			truncate: true,
		});
	});

	it("should able to use Emoji models", async () => {
		await Emoji.findAll({limit: 1});
	});

	it("should able to create emoji", async () => {
		// given
		const GuestId = 1;
		const QuestionId = 40;
		const name = "234234";

		// when
		const real = (await createEmoji({GuestId, name, QuestionId}))
			.dataValues;

		// than
		const id = real.id;
		const expect = (await Emoji.findOne({where: {id}})).dataValues;

		assert.equal(real.id, expect.id);
		assert.equal(real.name, expect.name);
		assert.equal(real.QuestionId, expect.QuestionId);
		assert.equal(real.GuestId, expect.GuestId);
	});

	it("should able to delete emoji by id", async () => {
		// given
		const GuestId = 1;
		const QuestionId = 40;
		const name = "234234";
		const EventId = undefined;

		const id = (await Emoji.create({GuestId, QuestionId, name, EventId}))
			.dataValues.id;

		// when
		const real = await deleteEmojiById(id);

		// than
		const expected = 0;

		assert(real > expected);
		// todo more assert

		const res = await Emoji.findOne({where: {id}});

		assert.equal(res, null);
	});

	it("should able to delete emoji by  GuestId, name, QuestionId ", async () => {
		// given
		const GuestId = 1;
		const QuestionId = 40;
		const name = "234234";
		const EventId = undefined;

		await Emoji.create({GuestId, QuestionId, name, EventId});

		// when
		const real = await deleteEmojiBy({name, QuestionId, GuestId});

		// than
		const expected = 0;

		assert(real > expected);
		// todo more assert

		const res = await Emoji.findOne({where: {name, QuestionId, GuestId}});

		assert.equal(res, null);
	});

	it("should able to find did i picked emoji list", async () => {
		// given
		const GuestId = 34;
		const name = "point_up";
		const QuestionId = 33;
		const EventId = undefined;

		await Emoji.create({GuestId, QuestionId, name, EventId});

		// when
		let real = await getDidIPicked({name, GuestId, QuestionId});

		real = real.map(x => x.get({plain: true}));

		// than
		assert(real.length > 0);
		// todo more assert

		await Emoji.destroy({where: {name, GuestId, QuestionId}});
	});

	it("should able to get count of emoji By question and name", async () => {
		// given
		const QuestionId = 34;
		const name = "point_up";
		const GuestId = 34;

		await Emoji.create({QuestionId, name, GuestId});

		// when
		const real = await getEmojiCountBy({name, QuestionId});

		// than

		// todo more assert
		assert(real > 0);

		await Emoji.destroy({where: {name, QuestionId, GuestId}});
	});

	it("should able to find emoji count by eventId group by QuestionId", async () => {
		// given
		const QuestionId = 34;
		const name = "point_up";
		const EventId = 2;
		const GuestId = 34;

		await Emoji.create({QuestionId, name, GuestId, EventId});

		// when
		const real = await getEmojiCountByEventIdGroupByQuestionId({EventId});

		// than
		// todo more assert
		assert(real.length > 0);

		Emoji.destroy({where: {QuestionId, name, GuestId, EventId}});
	});

	it("should able to get emoji pick", async () => {
		// given
		const QuestionId = 34;
		const name = "point_up";
		const EventId = 2;
		const GuestId = 34;

		await Emoji.create({QuestionId, name, GuestId, EventId});

		// when
		let real = await getEmojiPick({EventId, GuestId});

		real = real.map(x => x.get({plain: true}));

		// than
		assert(real.length > 0);

		// todo more assert
	});
});
