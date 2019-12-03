import faker from "faker";
import config from "./initialConfig";

const { INIT_SEED, EVENT_NUM, GUEST_NUM, POLL_NUM } = config;
faker.seed(INIT_SEED);

export default function makeLikeDummy(number = 100) {
	const bulkLike = [];

	for (let i = 0; i < number; ++i) {
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const feeling = faker.random.number({ min: 0, max: 1 });
		const GuestId = faker.random.number({ min: 1, max: GUEST_NUM });
		const QuestionId = faker.random.number({ min: 1, max: 100 });

		bulkLike.push({ createdAt, updatedAt, feeling, GuestId, QuestionId });
	}
	return bulkLike;
}
