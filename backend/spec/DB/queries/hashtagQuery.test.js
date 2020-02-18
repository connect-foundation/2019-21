import {before, describe, it} from "mocha";
import {
	createHashtag,
	deleteHashTagById,
	getHashtagByEventId,
	updateHashtagById,
} from "../../../DB/queries/hashtag.js";
import models from "../../../DB/models";

describe("hashtag query api", () => {
	let newId = null;

	before(async () => {
		await models.sequelize.sync();
	});

	it("should able to create hashtag", async () => {
		const EventId = null;
		const name = "name";

		const res = await createHashtag({EventId, name});

		newId = res.dataValues.id;
	});

	it("should able to update hashtag by id", async () => {
		await updateHashtagById({id: newId, name: "newName"});
	});

	it("should able to delete hashtag by id", async () => {
		await deleteHashTagById(newId);
	});

	it("should able to get hashtag by event id", async () => {
		const EventId = 3;

		const res = await getHashtagByEventId(EventId);

		await res.map(x => x.get({plain: true}));
	});
});