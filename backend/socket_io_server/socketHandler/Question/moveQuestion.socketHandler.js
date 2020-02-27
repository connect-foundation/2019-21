import {updateEveryState, updateQuestionById} from "../../../DB/queries/question";

const moveQuestionSocketHandler = async (data, emit) => {
	try {
		const id = data.id;
		const state = data.to;

		if (id === "all") await updateEveryState("active", {state});
		else await updateQuestionById({id, state});

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
