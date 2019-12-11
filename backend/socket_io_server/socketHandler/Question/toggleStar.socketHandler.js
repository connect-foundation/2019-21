import {updateQuestionById} from "../../../DB/queries/question";

const toggleStarSocketHandler = async (data, emit) => {
	try {
		const from = data.from[0];
		const to = data.to[0];

		if (from) { await updateQuestionById({id: from.id, isStared: from.isStared}); }
		await updateQuestionById({id: to.id, isStared: to.isStared});

		emit(to);
	} catch (e) {
		console.log(e);
		emit({status: "error", e});
	}
};

const eventName = "question/toggleStar";

export default {
	eventName,
	handler: toggleStarSocketHandler,
};
