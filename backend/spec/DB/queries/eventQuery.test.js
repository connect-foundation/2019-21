import assert from "assert";
import {before, describe, it} from "mocha";
import {
	createEvent,
	getAllEvents,
	getEventByEventCode,
	getEventById,
	getEventOptionByEventId,
	getEventsByHostId,
	updateEventById,
} from "../../../DB/queries/event.js";
import models from "../../../DB/models";

describe("event query api", () => {
	before(async () => {
		await models.sequelize.sync();
	});

	it("should be able to find all events", async () => {
		const eventCode = "event code";
		const eventName = "event name";
		const HostId = null;

		await createEvent({eventCode, HostId, eventName});

		const res = await getAllEvents();

		assert(Array.isArray(res));
		assert(res.length > 0);
	});

	it("should be able to create event", async () => {
		const eventCode = "event code";
		const eventName = "event name";
		const HostId = null;

		const res = await createEvent({eventCode, HostId, eventName});

		assert(typeof res === "object");
		assert(res.id > 0);
		assert.equal(res.eventCode, eventCode);
		assert.equal(res.eventName, eventName);
		assert.equal(res.HostId, HostId);
		assert(res.isLive !== undefined);
		assert(res.moderationOption !== undefined);
		assert(res.startAt !== undefined);
		assert(res.endAt !== undefined);
		assert(res.createdAt !== undefined);
		assert(res.updatedAt !== undefined);
	});

	it("should be able to find event by id", async () => {
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
		const id = oldEvent.id;

		const event = await getEventById(id);

		assert.equal(event.id, id);
		assert.equal(event.eventName, oldData.eventName);
		assert.equal(event.eventCode, oldData.eventCode);
		assert(event.isLive !== undefined);
		assert(event.moderationOption !== undefined);
		assert(event.startAt !== undefined);
		assert(event.endAt !== undefined);
		assert(event.createdAt !== undefined);
		assert(event.updatedAt !== undefined);
	});

	it("should be able to return null when can not find event by id", async () => {
		const event = await getEventById(4444);

		assert(event === null);
	});

	it("should be able to updateEventById", async () => {
		const id = 1;
		const newValue = {
			eventCode: "15125",
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};

		const res = await updateEventById({id, ...newValue});

		assert(typeof res === "number");
		assert(res > 0);
	});

	it("should be able to getEventByEventCode", async () => {
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
		const id = oldEvent.id;

		const event = await getEventByEventCode(oldData.eventCode);

		assert.equal(event.id, id);
		assert.equal(event.eventName, oldData.eventName);
		assert.equal(event.eventCode, oldData.eventCode);
		assert(event.isLive !== undefined);
		assert(event.moderationOption !== undefined);
		assert(event.startAt !== undefined);
		assert(event.endAt !== undefined);
		assert(event.createdAt !== undefined);
		assert(event.updatedAt !== undefined);
	});

	it("should be able to return null when can not getEventByEventCode", async () => {
		const eventCode = "0000";

		const res = await getEventByEventCode(eventCode);

		assert(res === null);
	});

	it("should be able to getEventsByHostId", async () => {
		const oldData = {
			eventName: "event name3",
			eventCode: "event code3",
			HostId: null,
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};

		await createEvent(oldData);

		const events = await getEventsByHostId(oldData.HostId);

		assert(events.length > 0);
	});

	it("should be able to getEventOptionByEventId", async () => {
		const oldData = {
			eventName: "event name3",
			eventCode: "event code3",
			HostId: null,
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};
		const oldEvent = await createEvent(oldData);
		const id = oldEvent.id;

		const event = await getEventOptionByEventId(id);

		assert.equal(event.moderationOption, oldEvent.moderationOption);
		assert.equal(event.replyOption, oldEvent.replyOption);
	});

	it("should be able to return null when can not getEventOptionByEventId", async () => {
		const oldData = {
			eventName: "event name3",
			eventCode: "event code3",
			HostId: null,
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};

		await createEvent(oldData);
		const id = 7777;

		const event = await getEventOptionByEventId(id);

		assert.equal(event, null);
	});
});
