import {createQuestion} from "../../../DB/queries/question";
import globalOption from "../../globalOption";

const questionCreateSocketHandler = async (data, emit) => {
	try {
		const {EventId, content, GuestId} = data;

		// Dummy Event Id:2
		const currentModerationOption = globalOption.getOption(2).moderationOption;

		if (currentModerationOption) {
			const moderationData = data;
			const EventId = 2;
			const GuestId = 127;

			moderationData.status = "moderation";
			await createQuestion(EventId, content, GuestId, "moderation");
			emit(moderationData);
		} else {
			await createQuestion(EventId , content, GuestId);
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
