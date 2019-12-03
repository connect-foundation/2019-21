import { getQuestionsByEventId } from "../../../DB/queries/question.js";
import { getEventIdByEventCode } from "../../../DB/queries/event.js";
import { getGuestById } from "../../../DB/queries/guest.js";

const addLikeCount = data => {
	data.forEach(x => {
		x.likeCount = x.Likes.length;
	});

	return data;
};

const addDidILiked = (data, guestId) => {
	data.forEach(x => {
		x.didILiked = x.Likes.filter(b => b.GuestId === guestId) > 0;
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

const addIsAnonymous = data => {
	return data.map(x => {
		x.isAnonymous = x.Guest.isAnonymous;
		return x;
	});
};

const addDidIPicked = (data, guestId) => {
	data.forEach(x => {
		x.Emojis.forEach(emoji => {
			emoji.didIPicked = emoji.GuestId === guestId;
		});
	});

	return data;
};

const addReplies = (data, guestId) => {
	return data.map(x => {
		x.replies = x.Questions.map(r => {
			let reply = r;
			console.log(r);
			reply = addLikeCount(reply);
			reply = addDidILiked(reply, guestId);
			reply = removeLikes(reply);
			reply = addGuestName(reply);
			reply = addDidIPicked(reply, guestId);
			reply = addIsAnonymous(reply);
			return reply;
		});

		return x;
	});
};

async function questionResolver(eventCode, guestId) {
	const event = await getEventIdByEventCode(eventCode);
	// const guest = await getGuestById(guestId);
	let res = await getQuestionsByEventId(event.id, guestId);

	res = res.map(x => x.get({ plain: true }));
	res = addLikeCount(res);
	res = addDidILiked(res, guestId);
	res = removeLikes(res);
	res = addGuestName(res);
	res = addDidIPicked(res, guestId);
	res = addIsAnonymous(res);

	res = addReplies(res, guestId);

	console.log(res[0]);

	return res;
}

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		questions: (_, { eventCode }, { guestId }) =>
			questionResolver(eventCode, guestId),
	},
};
