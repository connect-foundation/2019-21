import {createLike} from "../../../DB/queries/like.js";

const handler = async (data, emit) => {
	const {GuestId, QuestionId} = data;
	const result = await createLike(GuestId, QuestionId);

	const res = result.get({plain: true});

	emit(res);
};

const eventName = "questionLike/create";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler,
};
