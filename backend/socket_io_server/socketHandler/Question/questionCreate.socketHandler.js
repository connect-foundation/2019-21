import { createQuestion } from "../../../DB/queries/question";
import globalOption from "../../globalOption";

const questionCreateSocketHandler = async (data, emit) => {
	try {
		const { EventId, content, GuestId } = data;

		// Dummy Event Id:2
		// const currentModerationOption = globalOption.getOption(2)
		// 	.moderationOption;
		const currentModerationOption = false;
		const eventId = EventId; // EventId
		const guestId = GuestId; // GuestId
		const reqData = data;
		let newData;

		if (currentModerationOption) {
			reqData.status = "moderation";
			newData = await createQuestion(
				eventId,
				content,
				guestId,
				"moderation"
			);
		} else {
			newData = await createQuestion(eventId, content, guestId);
		}

		reqData.id = newData.get({ plain: true }).id;
		emit(reqData);
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
