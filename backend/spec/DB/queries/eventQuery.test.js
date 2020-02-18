import {before, describe, it} from "mocha";
import {
	createEvent,
	getEventByEventCode,
	getEventsByHostId,
	updateEventById,
} from "../../../DB/queries/event.js";
import models from "../../../DB/models";

describe("event query api", () => {
	before(async () => {
		await models.sequelize.sync();
	});

	it("be able to createQuestion", async () => {
		const eventCode = "new code";
		const content = "test content";
		const GuestId = 1;

		await createEvent({eventCode, content, GuestId});
		// todo add assertion
	});

	it("be able to getEventByEventCode", async () => {
		const eventCode = "k9me";

		await getEventByEventCode(eventCode);
		// todo add assertion
	});

	it("be able to getEventsByHostId", async () => {
		const hostId = 1;

		await getEventsByHostId(hostId);
		// todo add assertion
	});

	it("be able to updateEventById", async () => {
		const EventId = 1;
		const newValue = {
			eventCode: "15125",
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};

		await updateEventById({EventId, newValue});
		// todo add assertion
	});
});