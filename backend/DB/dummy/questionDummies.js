import faker from "faker";
import config from "./initialConfig";

import {getGuestById} from "../queries/guest.js";

export default async function makeQuestionDummy(number = 100) {
	const {INIT_SEED, GUEST_NUM} = config;

	faker.seed(INIT_SEED);
	const bulkQuestion = [];

	for (let i = 0; i < number; ++i) {
		const content = faker.lorem.sentence();
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const state = "active";
		const GuestId = faker.random.number({min: 1, max: GUEST_NUM});
		// eslint-disable-next-line no-await-in-loop
		const res = await getGuestById(GuestId);
		const EventId = res.EventId;
		const QuestionId = null;
		const isStared = false;
		const likeCount = 0;

		bulkQuestion.push({
			content,
			createdAt,
			state,
			updatedAt,
			EventId,
			GuestId,
			QuestionId,
			isStared,
			likeCount,
		});
	}
	return bulkQuestion;
}
