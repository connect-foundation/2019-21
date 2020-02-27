import {createLike} from "../../../DB/queries/like.js";

const handler = async (data, emit, socket, server) => {
	const {GuestId, QuestionId} = data;
	const result = await createLike(GuestId, QuestionId);

	const res = result.get({plain: true});

	emit(res);
};

const eventName = "questionLike/create";

export default {
	eventName,
	handler,
};
