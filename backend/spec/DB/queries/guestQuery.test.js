import assert from "assert";
import {before, describe, it} from "mocha";
import {
	createGuest,
	getGuestByEventId,
	getGuestByGuestSid,
	getGuestById,
	isExistGuest,
	updateGuestById,
} from "../../../DB/queries/guest.js";
import models from "../../../DB/models";

describe("guest query api", () => {
	before(async () => {
		await models.sequelize.sync();
	});

	it("should be able to create guest", async () => {
		// given
		const EventId = null;

		// when
		const guest = await createGuest(EventId);

		// than
		assert(guest.id > 0);
		assert(guest.name !== null);
		assert(guest.guestSid !== null);
		assert(typeof guest.guestSid === "string");
		assert(guest.email === null);
		assert(guest.isAnonymous === true);
		assert(guest.email === null);
	});

	it("should be able to return null when can not getGuestByGuestSid", async () => {
		const res = await getGuestByGuestSid("234234");

		assert(res === null);
	});

	it("should be able to getGuestByGuestSid", async () => {
		// given
		const EventId = null;
		const guest = await createGuest(EventId);

		// when
		const res = await getGuestByGuestSid(guest.guestSid);

		// than
		assert.deepStrictEqual(guest, res);
	});

	it("should able to get guest by Id", async () => {
		// given
		const EventId = null;
		const guest = await createGuest(EventId);

		// when
		const res = await getGuestById(guest.id);

		// than
		assert.deepStrictEqual(guest, res);
	});

	it("should able to return when can not get guest by Id", async () => {
		// given
		const id = 1236123;

		// when
		const res = await getGuestById(id);

		// than
		assert(res === null);
	});

	it("should able to update guest", async () => {
		// given
		const EventId = null;
		const guest = await createGuest(EventId);
		const name = "newName";

		// when
		const res = await updateGuestById({id: guest.id, name});

		// than
		assert(res > 0);
	});

	it("should able to get guest by EventId", async () => {
		// given
		const EventId = null;

		// when
		const res = await getGuestByEventId(EventId);

		// then
		assert(res.length > 0);
	});

	it("should able to isExistGuest", async () => {
		// given
		const EventId = null;
		const guest = await createGuest(EventId);
		const guestSid = guest.guestSid;

		// when
		const res = await isExistGuest(guestSid);

		// then
		assert(typeof res === "boolean");
		assert(res === true);
	});
});
