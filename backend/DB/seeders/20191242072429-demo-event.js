import faker from "faker";
import moment from "moment";
import config from "../dummy/initialConfig.js";

const {INIT_SEED} = config;

faker.seed(INIT_SEED);

module.exports = {
	up: queryInterface => {
		const createdAt = faker.date.past(10);
		const startAt = createdAt;
		const updatedAt = createdAt;
		const endAt = moment(createdAt)
			.add(faker.random.number({min: 1, max: 24}), "h")
			.toDate();
		const HostId = faker.random.number({min: 1, max: 100});
		const dummy = [
			{
				eventCode: "nikki",
				eventName: "nikki is back",
				moderationOption: false,
				replyOption: false,
				createdAt,
				updatedAt,
				endAt,
				HostId,
				startAt,
			},
		];

		return queryInterface.bulkInsert("Events", dummy, {});
	},

	down: queryInterface =>
		queryInterface.bulkDelete("Events", null, {}),
};
