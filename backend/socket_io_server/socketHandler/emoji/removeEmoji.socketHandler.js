import {deleteEmojiBy} from "../../../DB/queries/emoji.js";

const removeEmojiSocketHandler = async (data, emit) => {
	const {GuestId, name, EventId, QuestionId} = data;

	await deleteEmojiBy({GuestId, name, EventId, QuestionId});

	emit(data);
};

const eventName = "questionEmoji/remove";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: removeEmojiSocketHandler,
};
