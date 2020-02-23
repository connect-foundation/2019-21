import uuidv1 from "uuid/v1";
import models from "../models";
import getRandomGuestName from "../dummy/RandomGuestName";

// todo fix lint of line
// noinspection JSUnresolvedVariable
const Guest = models.Guest;

/**
 *
 * @param guestSid {string}
 * @returns {Promise<object|null>}
 */
export async function getGuestByGuestSid(guestSid) {
	let res = await Guest.findOne({where: {guestSid}});

	if (res !== null) {
		res = res.get({plain: true});
	}

	return res;
}

// todo refactoring
/**
 *
 * @param guestSid {string}
 * @returns {Promise<boolean>}
 */
export async function isExistGuest(guestSid) {
	return !!(await getGuestByGuestSid(guestSid));
}

/**
 *
 * @param eventId {number|null}
 * @returns {Promise<object>}
 */
export async function createGuest(eventId) {
	const guest = await Guest.create({
		name: getRandomGuestName(),
		EventId: eventId,
		guestSid: uuidv1(),
		isAnonymous: 1,
	});

	return guest.get({plain: true});
}

/**
 *
 * @param id {number}
 * @returns {Promise<object|null>}
 */
export async function getGuestById(id) {
	let res = await Guest.findOne({
		where: {id},
	});

	if (res !== null) {
		res = res.get({plain: true});
	}

	return res;
}

/**
 *
 * @param id {number}
 * @param name {string|undefined}
 * @param isAnonymous {boolean|undefined}
 * @param company {string|undefined}
 * @param email {string|undefined}
 * @returns {Promise<number>}
 */
export async function updateGuestById({id, name, isAnonymous, company, email}) {
	const res = await Guest.update(
		{name, company, isAnonymous, email},
		{where: {id}},
	);

	return res[0];
}

/**
 *
 * @param EventId {number}
 * @returns {Promise<Model[]|any[]>}
 */
export async function getGuestByEventId(EventId) {
	const res = Guest.findAll({where: {EventId}});

	return res.map(x => x.get({plain: true}));
}
