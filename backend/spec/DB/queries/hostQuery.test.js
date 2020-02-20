import {before, describe, it} from "mocha";
import assert from "assert";
import {findOrCreateHostByOAuth} from "../../../DB/queries/host.js";
import models from "../../../DB/models";

describe("host query api", () => {
	before(async () => {
		await models.sequelize.sync();
	});

	it("be able to find or create host by oauthId", async () => {
		const oauthId = "1234";
		const image = "image";
		const name = "name";
		const email = "email";
		const host = await findOrCreateHostByOAuth({
			oauthId,
			image,
			email,
			name,
		});

		assert(host.id > 0);
		assert.equal(host.email, email);
		assert.equal(host.name, name);
		assert.equal(host.image, image);
		assert.equal(host.oauthId, oauthId);
	});
});
