import faker from "faker";
import config from "./initialConfig";

const {INIT_SEED, EVENT_NUM} = config;

faker.seed(INIT_SEED);

export default function makeHashTagDummy(number = 100) {
	const bulkHashTag = [];

	for (let i = 0; i < number; ++i) {
		const name = faker.hacker.ingverb();
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const EventId = faker.random.number({min: 1, max: EVENT_NUM});

		bulkHashTag.push({name, createdAt, updatedAt, EventId});
	}
	return bulkHashTag;
}
