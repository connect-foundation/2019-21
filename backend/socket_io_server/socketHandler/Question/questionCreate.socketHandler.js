import {createQuestion} from "../../../DB/queries/question";

const questionCreateSocketHandler = async (data, emit) => {
	try {
		console.log(data);
		const {EventId, content, GuestId} = data;

		await createQuestion(EventId, content, GuestId);

		console.log("delayed");

		emit(data);
	} catch (e) {
		console.log(e);
		emit({status: "error", e});
	}
};

const eventName = "question/create";

export default {
	eventName,
	handler: questionCreateSocketHandler,
};
