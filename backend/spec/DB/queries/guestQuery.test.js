import {describe, it} from "mocha";
import {
	createGuest,
	getGuestByEventId,
	getGuestById,
	updateGuestById,
} from "../../../DB/queries/guest.js";

describe("guest query api", () => {
	const newId = null;

	it("should able to create guest", async () => {
		const EventId = 3;
		const name = "name";

		await createGuest(name, EventId);

		// todo add assertion
	});

	it("should able to update guest", async () => {
		const name = "name";

		await updateGuestById({id: newId, name});
		// todo add assertion
	});

	it("should able to get guest by Id", async () => {
		await getGuestById(newId);
		// todo add assertion
	});

	it("should able to get guest by EventId", async () => {
		const EventId = 3;

		await getGuestByEventId(EventId);
		// todo add assertion
	});
});
