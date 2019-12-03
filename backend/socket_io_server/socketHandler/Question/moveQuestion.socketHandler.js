const moveQuestionSocketHandler = async (data, emit) => {
	try {
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
