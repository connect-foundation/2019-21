import faker from "faker";
import config from "./initialConfig";

const { INIT_SEED, EVENT_NUM, GUEST_NUM, POLL_NUM } = config;

faker.seed(INIT_SEED);

export default function makeHostDummy(number = 100) {
	const bulkHost = [];

	for (let i = 0; i < number; ++i) {
		const oauthId = faker.internet.userName();
		const email = faker.internet.email();
		const name = faker.name.firstName();
		const image = faker.image.imageUrl();
		const emailFeedBack = faker.random.boolean();
		const createdAt = faker.date.past(10);
		const updatedAt = createdAt;

		bulkHost.push({
			oauthId,
			email,
			name,
			emailFeedBack,
			image,
			createdAt,
			updatedAt,
		});
	}
	return bulkHost;
}
