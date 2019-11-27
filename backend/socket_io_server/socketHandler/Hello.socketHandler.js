import {delay_DB_job} from "../util.js";

const helloHandler = async (data, emit) => {
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

const eventName = "hello";

export default {
	eventName,
	handler: helloHandler,
};
