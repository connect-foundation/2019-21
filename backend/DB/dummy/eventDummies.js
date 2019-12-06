import faker from "faker";
import moment from "moment";
import config from "./initialConfig";

const {INIT_SEED, EVENT_NUM} = config;

faker.seed(INIT_SEED);

export default function makeEventDummy(number = EVENT_NUM) {
	const bulkEvent = [];
	const filter = {};

	for (let i = 0; i < number; ++i) {
		let alphaNum = faker.random.alphaNumeric(4);

		while (filter[alphaNum]) {
			alphaNum = faker.random.alphaNumeric(4);
		}
		const eventCode = alphaNum;

		filter[eventCode] = 1;
		const moderationOption = faker.random.boolean();
		const replyOption = faker.random.boolean();
		const createdAt = faker.date.past(10);
		const updatedAt = createdAt;
		const startAt = createdAt;
		const endAt = moment(createdAt)
			.add(faker.random.number({min: 1, max: 24}), "h")
			.toDate();
		const HostId = faker.random.number({min: 1, max: 100});
		const eventName = faker.address.city();

		bulkEvent.push({
			eventCode,
			moderationOption,
			replyOption,
			createdAt,
			updatedAt,
			endAt,
			HostId,
			startAt,
			eventName,
		});
	}
	return bulkEvent;
}
