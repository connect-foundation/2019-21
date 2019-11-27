import {delay_DB_job} from "../../util.js";

const questionCreateSocketHandler = async (data, emit) => {
	try {
		console.log(data);

		await delay_DB_job();

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
