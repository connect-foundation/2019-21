import { GraphQLClient } from "graphql-request";

describe("graphql api", () => {
	const endpoint = "http://localhost:8000/graphql";
	const client = new GraphQLClient(endpoint, { headers: {} });

	it("able query hello", async () => {
		const query = `
		query {
			hello {
				name
				value
			}
		}`;
		const variables = undefined;
		const res = await client.request(query, variables);
		console.log(res);
	});

	it("able query questions", async () => {
		const queryQuestions = `
		query getQuestions(
			$eventCode: ID!
			$GuestId: ID! 
		){
			questions(eventCode: $eventCode, GuestId: $GuestId) {
				content
				id
				likeCount
				didILiked
				GuestId
				createdAt
				guestName
				Emojis {
				 	EmojiName
				}
				isStared
				state
				isAnonymous
				replies {
					id
					content
				}		
			}
		}
		`;

		const variables = {
			GuestId: 148,
			eventCode: "u0xn",
		};
		const res = await client.request(queryQuestions, variables);
		console.log(res);
	});
});
