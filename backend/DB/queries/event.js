import models from "../models";

export async function getAllEvents() {
	return models.Event.findAll();
}

export async function createEvent({
	eventName,
	eventCode,
	HostId,
	moderationOption = false,
	replyOption = false,
	startAt = new Date(),
	endAt = new Date(),
}) {
	return models.Event.findOrCreate({
		where: {eventCode},
		defaults: {
			eventName,
			HostId,
			moderationOption,
			replyOption,
			startAt,
			endAt,
		},
	});
}

export async function updateEventById({
	id,
	eventName,
	moderationOption,
	replyOption,
	startAt,
	endAt,
}) {
	return models.Event.update(
		{eventName, moderationOption, replyOption, startAt, endAt},
		{where: {id}},
	);
}

export async function getEventsByHostId(hostId) {
	return models.Event.findAll({
		where: {HostId: hostId},
	});
}

export async function getEventByEventCode(eventCode) {
	return models.Event.findOne({
		where: {
			eventCode,
		},
	});
}

export async function getEventById(EventId) {
	return models.Event.findOne({
		where: {
			id: EventId,
		},
	});
}

export async function getEventOptionByEventId(id) {
	return models.Event.findOne({
		where: {
			id,
		},
		attributes: ["moderationOption", "replyOption"],
	});
}
