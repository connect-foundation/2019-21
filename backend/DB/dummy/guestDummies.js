import faker from "faker";
import config from "./initialConfig";

const {INIT_SEED, EVENT_NUM, GUEST_NUM} = config;

faker.seed(INIT_SEED);

export default function makeGuestDummy(number = GUEST_NUM) {
	const bulkGuest = [];

	for (let i = 0; i < number; ++i) {
		const name = faker.name.firstName();
		const guestSid = faker.random.uuid();
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const EventId = faker.random.number({min: 1, max: EVENT_NUM});
		const isAnonymous = false;

		bulkGuest.push({
			name,
			createdAt,
			updatedAt,
			EventId,
			guestSid,
			isAnonymous,
		});
	}
	return bulkGuest;
}
