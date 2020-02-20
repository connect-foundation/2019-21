import assert from "assert";
import {before, describe, it} from "mocha";
import {
	createHashtag,
	deleteHashTagById,
	getHashtagByEventId,
	getHashtagByEventIds,
	updateHashtagById,
} from "../../../DB/queries/hashtag.js";
import models from "../../../DB/models";
import {createEvent} from "../../../DB/queries/event.js";

describe("hashtag query api", () => {
	before(async () => {
		await models.sequelize.sync();
	});

	it("should able to create hashtag", async () => {
		// given
		const EventId = null;
		const name = "name";

		// when
		const hashtag = await createHashtag({EventId, name});

		// than
		assert(hashtag.id > 0);
		assert.equal(hashtag.name, name);
		assert.equal(hashtag.EventId, EventId);
	});

	it("should able to update hashtag by id", async () => {
		// given
		const EventId = null;
		const name = "name";
		const hashtag = await createHashtag({EventId, name});

		// when
		const res = await updateHashtagById({id: hashtag.id, name: "newName"});

		// than
		assert(res > 0);
	});

	it("should able to delete hashtag by id", async () => {
		// given
		const EventId = null;
		const name = "name";
		const hashtag = await createHashtag({EventId, name});

		// when
		const res = await deleteHashTagById(hashtag.id);

		// than
		assert(res > 0);
	});

	it("should able to get hashtag by event id", async () => {
		// given
		const EventId = null;
		const name = "name";

		await createHashtag({EventId, name});

		// when
		const res = await getHashtagByEventId(EventId);

		// than
		assert(res.length > 0);
	});

	it("should able to get hashtag by event ids", async () => {
		// given
		const oldData = {
			eventName: "event name2",
			eventCode: "event code2",
			HostId: null,
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};
		const oldEvent = await createEvent(oldData);
		const EventId = oldEvent.id;
		const name = "name";

		await createHashtag({EventId, name});
		await createHashtag({EventId, name});

		// when
		const res = await getHashtagByEventIds([EventId]);

		// than
		assert(res.length > 0);
	});
});
