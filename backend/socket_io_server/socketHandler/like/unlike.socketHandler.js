import {deleteLikeBy} from "../../../DB/queries/like.js";

const handler = async (data, emit, socket, server) => {
	const {GuestId, QuestionId} = data;

	const res = await deleteLikeBy({GuestId, QuestionId});

	emit(data);
};

const eventName = "questionLike/remove";

export default {
	eventName,
	handler,
};
