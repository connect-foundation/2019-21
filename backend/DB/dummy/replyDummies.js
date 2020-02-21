import faker from "faker";
import config from "./initialConfig";
import {getQuestionById} from "../queries/question.js";
import {getGuestByEventId} from "../queries/guest.js";

const {INIT_SEED} = config;

faker.seed(INIT_SEED);

export default async function makeReplyDummy(number = 200) {
	const bulkQuestion = [];

	for (let i = 0; i < number; ++i) {
		const content = faker.lorem.sentence();
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const state = "active";

		const QuestionId = faker.random.number({min: 1, max: 100});
		// eslint-disable-next-line no-await-in-loop
		const EventId = (await getQuestionById(QuestionId)).EventId;
		// eslint-disable-next-line no-await-in-loop
		const candidates = await getGuestByEventId(EventId);
		const candidateGuestIdx = faker.random.number({
			min: 0,
			max: candidates.length - 1,
		});
		const GuestId = candidates[candidateGuestIdx].id;
		const isStared = false;

		bulkQuestion.push({
			content,
			createdAt,
			state,
			updatedAt,
			EventId,
			GuestId,
			QuestionId,
			isStared,
		});
	}
	return bulkQuestion;
}
