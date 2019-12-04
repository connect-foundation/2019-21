import faker from "faker";
import config from "./initialConfig";

const { INIT_SEED, GUEST_NUM, VOTE_NUM, CANDIDATE_NUM } = config;

faker.seed(INIT_SEED);

export default function makeVoteDummy(number = VOTE_NUM) {
	const bulkVoter = [];

	for (let i = 0; i < number; ++i) {
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const GuestId = faker.random.number({ min: 1, max: GUEST_NUM });
		const CandidateId = faker.random.number({ min: 1, max: CANDIDATE_NUM });

		bulkVoter.push({ createdAt, updatedAt, GuestId, CandidateId });
	}

	return bulkVoter;
}
