import uuidv1 from "uuid/v1";
import models from "../models";
import getRandomGuestName from "../dummy/RandomGuestName";

const Guest = models.Guest;

async function getGuestByGuestSid(guestSid) {
	return Guest.findOne({where: {guestSid}});
}

// todo refactoring
async function isExistGuest(guestSid) {
	return !!(await getGuestByGuestSid(guestSid));
}

async function createGuest(eventId) {
	const guest = await Guest.create({
		name: getRandomGuestName(),
		EventId: eventId,
		guestSid: uuidv1(),
		isAnonymous: 1,
	});

	return guest.get({plain: true});
}

async function getGuestById(id) {
	return Guest.findOne({
		where: {id},
	});
}

async function updateGuestById({id, name, isAnonymous, company, email}) {
	return Guest.update({name, company, isAnonymous, email}, {where: {id}});
}

async function getGuestByEventId(EventId) {
	return Guest.findAll({where: {EventId}});
}

export {
	createGuest,
	getGuestById,
	updateGuestById,
	getGuestByEventId,
	isExistGuest,
	getGuestByGuestSid
};
