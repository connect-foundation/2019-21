import {
	createHashtag,
	deleteHashTagById,
	updateHashtagById,
	getHashtagByEventId,
} from "./hashtag.js";

async function TestHashTagDBQuery() {
	let res = null;
	const EventId = 3;
	const name = "sdfsdf";

	console.log("herhe")
	res = await createHashtag({ EventId, name });
	console.log(res);

	const id = res.dataValues.id;

	res = await updateHashtagById(id);
	console.log(res);

	res = await deleteHashTagById(id);
	console.log(res);

	res = await getHashtagByEventId(EventId);
	res = await res.map(x => x.get({ plain: true }));
	console.log(res);
}
