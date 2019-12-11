import {updateQuestionById} from "../../../DB/queries/question";

const toggleStarSocketHandler = async (data, emit) => {
	try {
		const id = data.id;
		const isStared = data.isStared;

		await updateQuestionById({id, isStared});
		emit(data);
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
