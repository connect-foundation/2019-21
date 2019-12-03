import {
	createHashtag,
	deleteHashTagById,
	updateHashtagById,
	getHashtagByEventId,
} from "../DB/queries/hashtag.js";

describe("hashtag query api", () => {
	let newId = null;
	it("should able to create hashtag", async () => {
		let res = null;
		const EventId = 3;
		const name = "sdfsdf";
		res = await createHashtag({ EventId, name });

		newId = res.dataValues.id;
	});

	it("should able to update hashtag by id", async () => {
		let res = null;
		const EventId = 3;

		res = await updateHashtagById(newId);
		// console.log(res);
	});

	it("should able to delete hashtag by id", async () => {
		let res = null;
		const EventId = 3;

		res = await deleteHashTagById(newId);
		// console.log(res);
	});

	it("should able to get hashtag by event id", async () => {
		let res = null;
		const EventId = 3;

		res = await getHashtagByEventId(EventId);
		res = await res.map(x => x.get({ plain: true }));
		// console.log(res);
	});
});
