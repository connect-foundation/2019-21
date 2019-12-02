import {getQuestionsByEventId} from "../../../DB/queries/question.js";
import {getEventIdByEventCode} from "../../../DB/queries/event.js";

const addLikeCount = data => {
	data.forEach(x => {
		x.likeCount = x.Likes.length;
	});

	return data;
};

const addIsLike = (data, guestId) => {
	data.forEach(x => {
		x.isLike = x.Likes.filter(b => b.GuestId === guestId) > 0;
	});

	return data;
};

const removeLikes = data => {
	data.forEach(x => {
		x.Likes = undefined;
	});

	return data;
};

const addGuestName = data => {
	data.forEach(x => {
		x.guestName = x.Guest.name;
	});

	return data;
};

const addDidIPicked = (data, guestId) => {
	data.forEach(x => {
		x.Emojis.forEach(emoji => {
			emoji.didIPicked = emoji.GuestId === guestId;
		});
	});

	return data;
};

async function questionResolver(eventCode, guestId) {
	const event = await getEventIdByEventCode(eventCode);
	let res = await getQuestionsByEventId(event.id, guestId);

	res = res.map(x => x.get({plain: true}));
	res = addLikeCount(res);
	res = addIsLike(res, guestId);
	res = removeLikes(res);
	res = addGuestName(res);
	res = addDidIPicked(res, guestId);

	return res;
}

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		questions: (_, {eventCode}, {guestId}) =>
			questionResolver(eventCode, guestId),
	},
};
