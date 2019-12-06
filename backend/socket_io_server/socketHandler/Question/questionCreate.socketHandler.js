import {createQuestion} from "../../../DB/queries/question";
import {updateGuestById} from "../../../DB/queries/guest";
import eventCache from "../../EventCache.js";
import logger from "../../logger.js";

const questionCreateSocketHandler = async (data, emit) => {
	try {
		const {EventId, content, GuestId, guestName} = data;

		logger.debug(data);

		const event = await eventCache.get(EventId);
		const currentModerationOption = event.moderationOption;
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

		await updateGuestById({
			id: GuestId,
			name: guestName,
			isAnonymous: false,
		});
		reqData.id = newData.get({plain: true}).id;
		emit(reqData);
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "question/create";

export default {
	eventName,
	handler: questionCreateSocketHandler,
};
