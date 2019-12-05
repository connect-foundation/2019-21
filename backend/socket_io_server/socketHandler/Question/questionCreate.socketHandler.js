import {createQuestion} from "../../../DB/queries/question";
import globalOption from "../../globalOption";

const questionCreateSocketHandler = async (data, emit) => {
	try {
		const {EventId, content, GuestId} = data;

		// Dummy Event Id:2
		const currentModerationOption = globalOption.getOption(2).moderationOption;
		const eventId = 2; // EventId
		const guestId = 19; // GuestId
		console.log(data);

		if (currentModerationOption) {
			const moderationData = data;

			moderationData.status = "moderation";
			await createQuestion(eventId, content, guestId, "moderation");
			emit(moderationData);
		} else {
			await createQuestion(eventId , content, guestId);
			emit(data);
		}
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
