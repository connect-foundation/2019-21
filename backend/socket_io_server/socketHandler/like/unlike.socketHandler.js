import {deleteLikeBy} from "../../../DB/queries/like.js";

const handler = async (data, emit) => {
	const {GuestId, QuestionId} = data;

	await deleteLikeBy({GuestId, QuestionId});

	emit(data);
};

const eventName = "questionLike/remove";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler,
};
