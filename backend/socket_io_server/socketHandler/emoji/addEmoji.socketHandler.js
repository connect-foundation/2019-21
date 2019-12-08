import {updateQuestionById} from "../../../DB/queries/question";

const moveQuestionSocketHandler = async (data, emit) => {
	try {
		const id = data.id;
		const status = data.to;

		await updateQuestionById({id, status});

		console.log(data);
		emit(data);
	} catch (e) {
		console.log(e);
		emit({status: "error", e});
	}
};

const eventName = "question/move";

export default {
	eventName,
	handler: moveQuestionSocketHandler,
};
