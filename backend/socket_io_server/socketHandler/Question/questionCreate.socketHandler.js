import { createQuestion } from "../../../DB/queries/question";
import globalOption from "../../globalOption";
import {updateGuestById} from "../../../DB/queries/guest";

const questionCreateSocketHandler = async (data, emit) => {
	try {
		const {EventId, content, GuestId, guestName} = data;
		console.log(data);
		const currentModerationOption = globalOption.getOption(EventId)
			.moderationOption;
		const reqData = data;
		let newData;

		if (currentModerationOption) {
			reqData.status = "moderation";
			newData = await createQuestion(
				EventId,
				content,
				GuestId,
				"moderation",
			);
		} else {
			newData = await createQuestion(EventId, content, GuestId);
		}

		await updateGuestById({id: GuestId, name: guestName, isAnonymous: false});
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
