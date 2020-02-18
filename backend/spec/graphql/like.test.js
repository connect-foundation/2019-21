import {describe, it} from "mocha";
import GQLClient from "./graphqlTestClient.js";

describe("graphql yoga like model", () => {
	it("able query didILike", async () => {
		const query = `
		query get_didILikes(
			$GuestId: ID!
		){
			didILikes(GuestId: $GuestId) {
				QuestionId  
			}
		}
		`;

		const variables = {
			GuestId: 2,
		};

		await GQLClient.request(query, variables);
		// todo add assertion
	});
});
