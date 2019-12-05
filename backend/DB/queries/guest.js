import uuidv1 from "uuid/v1";
import models from "../models";

const Guest = models.Guest;

async function findGuestBySid(guestSid) {
	const guest = await Guest.findOne({where: {guestSid}});
	const result = guest ? guest.dataValues : false;

	return result;
}

async function createGuest(name, eventId) {
	const guest = await Guest.create({
		name,
		EventId: eventId,
		guestSid: uuidv1(),
		isAnonymous: 1,
	});

	const result = guest ? guest.dataValues : false;

	return result;
}

async function getGuestById(id) {
	return Guest.findOne({
		where: {id},
	});
}

async function updateGuestById({id, name, isAnonymous, company, email}) {
	return Guest.update(
		{name, company, isAnonymous, email},
		{where: {id}},
	);
}

async function getGuestByEventId(EventId) {
	return Guest.findAll({where: {EventId}});
}

export {
	createGuest,
	getGuestById,
	updateGuestById,
	getGuestByEventId,
	findGuestBySid,
};
