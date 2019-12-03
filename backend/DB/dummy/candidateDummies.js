import faker from "faker";
import config from "./initialConfig";

const { INIT_SEED, EVENT_NUM, GUEST_NUM, POLL_NUM } = config;
faker.seed(INIT_SEED);

export default function makeCandidateDummy(number = POLL_NUM) {
	// const dummy = require("./dummy");
	const bulkCandidate = [];
	const numberOfCandidates = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // index: 0 ~ 9

	for (let index = 1; index <= POLL_NUM; index++) {
		// 0: N지선다(text), 1: N지선다(date), 2: 별점매기기
		if (index % 3 === 0) {
			const LIMIT =
				numberOfCandidates[faker.random.number({ min: 0, max: 9 })];

			for (
				let candadateNumber = 1;
				candadateNumber <= LIMIT;
				candadateNumber++
			) {
				const number = candadateNumber;
				const content = faker.lorem.sentence();
				const createdAt = faker.date.past(1);
				const updatedAt = createdAt;
				const PollId = index;

				bulkCandidate.push({
					number,
					content,
					createdAt,
					updatedAt,
					PollId,
				});
			}
		} else if (index % 3 === 1) {
			const LIMIT =
				numberOfCandidates[faker.random.number({ min: 0, max: 9 })];

			for (
				let candadateNumber = 1;
				candadateNumber <= LIMIT;
				candadateNumber++
			) {
				const number = candadateNumber;
				const content = faker.date.between("1900-01-01", "2999-12-31");
				const createdAt = faker.date.past(1);
				const updatedAt = createdAt;
				const PollId = index;

				bulkCandidate.push({
					number,
					content,
					createdAt,
					updatedAt,
					PollId,
				});
			}
		} else {
			const LIMIT = faker.random.number({ min: 2, max: 10 });

			for (
				let candadateNumber = 1;
				candadateNumber <= LIMIT;
				candadateNumber++
			) {
				const number = candadateNumber;
				const content = candadateNumber.toString();
				const createdAt = faker.date.past(1);
				const updatedAt = createdAt;
				const PollId = index;

				bulkCandidate.push({
					number,
					content,
					createdAt,
					updatedAt,
					PollId,
				});
			}
		}
	}
	return bulkCandidate;
}
