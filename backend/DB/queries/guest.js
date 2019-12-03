import models from "../models";
import uuidv1 from "uuid/v1";

async function findGuestBySid(guestSid) {
	const guest = await models.Guest.findOne({ where: { guestSid: guestSid } });
	const result = guest ? guest.dataValues : false;

	return result;
}

async function createGuest(name, eventId) {
	const guest = await models.Guest.create({
		name,
		EventId: eventId,
		guestSid: uuidv1(),
		isAnonymous: 1,
	});

	const result = guest ? guest.dataValues : false;
	return result;
}

export { createGuest, findGuestBySid };
