import {updateQuestionById} from "../../../DB/queries/question.js";
import {updateGuestById} from "../../../DB/queries/guest.js";

const moveQuestionSocketHandler = async (data, emit) => {
	await updateQuestionById(data);
	await updateGuestById({
		id: data.GuestId,
		name: data.guestName,
		isAnonymous: data.isAnonymous,
	});

	emit(data);
};

const eventName = "question/update";

export default {
	eventName,
	handler: moveQuestionSocketHandler,
};
