import {
	createEvent,
	getEventIdByEventCode,
	getEventsByHostId,
	getQuestionsByEventCodeAndGuestId,
	updateEventById,
} from "../DB/queries/event.js";

describe("event query api", () => {
	it("be able to createQuestion", async () => {
		const eventCode = "new code";
		const content = "test content";
		const GuestId = 1;

		await createEvent({eventCode, content, GuestId});
	});

	it("be able to getEventIdByEventCode", async () => {
		const eventCode = "k9me";

		await getEventIdByEventCode(eventCode);
	});

	it("be able to getEventsByHostId", async () => {
		const hostId = 1;

		await getEventsByHostId(hostId);
	});

	it("be able to getQuestionsByEventCodeAndGuestId", async () => {
		const eventCode = "1cfs";
		const guestId = 1;

		await getQuestionsByEventCodeAndGuestId(eventCode, guestId);
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

		await updateEventById(EventId, newValue);
	});
});
