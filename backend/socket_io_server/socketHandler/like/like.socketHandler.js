import {createLike} from "../../../DB/queries/like.js";

const handler = async (data, emit) => {
	const {GuestId, QuestionId} = data;
	const result = await createLike({GuestId, QuestionId});

	emit(result);
};

const eventName = "questionLike/create";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler,
};
