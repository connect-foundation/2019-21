import {getEmojiCountByEventIdGroupByQuestionId, getEmojiPick} from "../../../DB/queries/emoji.js";

const emojiResolver = async EventId => getEmojiCountByEventIdGroupByQuestionId({EventId});

const emojiPickResolver = async (EventId, GuestId) =>
	getEmojiPick({EventId, GuestId});

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		emojis: (_, {EventId}) => emojiResolver(EventId),
		emojiPicks: (_, {EventId, GuestId}) =>
			emojiPickResolver(EventId, GuestId),
	},
};
