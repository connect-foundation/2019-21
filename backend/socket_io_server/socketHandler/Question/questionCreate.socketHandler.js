import { delay_DB_job } from "../../util.js";
import { createQuestion } from "../../../DB/queries/question";

const questionCreateSocketHandler = async (data, emit) => {
	try {
		const { eventId, question, guestId } = data;

		await createQuestion(eventId, question, guestId);

		console.log("delayed");

		emit(data);
	} catch (e) {
		console.log(e);
		emit({ status: "error", e });
	}
};

const eventName = "question/create";

export default {
	eventName,
	handler: questionCreateSocketHandler,
};
