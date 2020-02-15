import {createEmoji} from "../../../DB/queries/emoji.js";

const moveQuestionSocketHandler = async (data, emit) => {
	const {GuestId, name, EventId, QuestionId} = data;
	const res = await createEmoji({GuestId, name, EventId, QuestionId});

	emit(res.get({plain: true}));
};

const eventName = "questionEmoji/create";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: moveQuestionSocketHandler,
};
