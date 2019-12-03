// createGuest, getGuestById, updateGuestById
import {
	createGuest,
	getGuestByEventId,
	getGuestById,
	updateGuestById,
} from "../DB/queries/guest.js";

describe("hashtag query api", () => {
	let newId = null;
	let res = null;

	it("should able to create guest", async () => {
		const EventId = 3;
		const name = "sdfsdf";

		res = await createGuest({EventId, name});

		newId = res.dataValues.id;
	});

	it("should able to update guest", async () => {
		const name = "sdfsdf";

		res = await updateGuestById({id: newId, name});
	});

	it("should able to get guest by Id", async () => {
		res = await getGuestById(newId);
	});

	it("should able to get guest by EventId", async () => {
		const EventId = 3;

		res = await getGuestByEventId(EventId);
	});
});
