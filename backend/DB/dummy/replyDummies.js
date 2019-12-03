import faker from "faker";
import config from "./initialConfig";

const {INIT_SEED, EVENT_NUM, GUEST_NUM} = config;

faker.seed(INIT_SEED);

export default function makeReplyDummy(number = 200) {
	const bulkQuestion = [];

	for (let i = 0; i < number; ++i) {
		const content = faker.lorem.sentence();
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const state = "active";
		const EventId = faker.random.number({min: 1, max: EVENT_NUM});
		const GuestId = faker.random.number({min: 1, max: GUEST_NUM});
		const QuestionId = faker.random.number({min: 1, max: 100});

		bulkQuestion.push({
			content,
			createdAt,
			state,
			updatedAt,
			EventId,
			GuestId,
			QuestionId,
		});
	}
	return bulkQuestion;
}
