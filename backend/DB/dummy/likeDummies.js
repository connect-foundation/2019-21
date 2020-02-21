import faker from "faker";
import config from "./initialConfig";
import {getQuestionById} from "../queries/question.js";
import {getGuestByEventId} from "../queries/guest.js";

const {INIT_SEED} = config;

faker.seed(INIT_SEED);

export default async function makeLikeDummy(number = 100) {
	const bulkLike = [];

	for (let i = 0; i < number; ++i) {
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const QuestionId = faker.random.number({min: 1, max: 100});
		// eslint-disable-next-line no-await-in-loop
		const EventId = (await getQuestionById(QuestionId)).EventId;
		// eslint-disable-next-line no-await-in-loop
		const candidate = await getGuestByEventId(EventId);
		const candidateIdx = faker.random.number({
			min: 0,
			max: candidate.length - 1,
		});

		const GuestId = candidate[candidateIdx].id;

		bulkLike.push({createdAt, updatedAt, GuestId, QuestionId});
	}
	return bulkLike;
}
