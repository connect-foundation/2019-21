import faker from "faker";
import config from "./initialConfig";

const {INIT_SEED, EVENT_NUM, POLL_NUM} = config;

faker.seed(INIT_SEED);

export default function makePollDummy(number = POLL_NUM) {
	const bulkPoll = [];

	for (let i = 1; i <= number; ++i) {
		const pollName = faker.lorem.sentence();
		// 0: N지선다(text), 1: N지선다(date), 2: 별점매기기
		const type = i % 3;
		let pollType;
		let selectionType;

		if (type === 0) {
			pollType = "nItems";
			selectionType = "text";
		} else if (type === 1) {
			pollType = "nItems";
			selectionType = "date";
		} else {
			pollType = "rating";
			selectionType = Number(10).toString();
		}

		const allowDuplication = faker.random.boolean();
		const state = "closed";
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const pollDate = createdAt;
		const EventId = faker.random.number({min: 1, max: EVENT_NUM});

		bulkPoll.push({
			pollName,
			pollType,
			selectionType,
			allowDuplication,
			state,
			createdAt,
			updatedAt,
			EventId,
			pollDate,
		});
	}

	return bulkPoll;
}
