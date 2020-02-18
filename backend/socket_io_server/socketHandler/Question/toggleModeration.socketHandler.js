import {updateEventById} from "../../../DB/queries/event";
import eventCache from "../../EventCache";
import logger from "../../logger.js";

const toggleModerationSocketHandler = async (data, emit) => {
	try {
		const currentState = data.state;
		const currentOption = await eventCache.get(data.eventId);

		await updateEventById({
			id: data.eventId,
			moderationOption: currentState,
		});
		currentOption.moderationOption = currentState;
		await eventCache.set(data.eventId, currentOption);
		emit({eventId: data.eventId, state: currentState});
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "moderation/toggle";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: toggleModerationSocketHandler,
};
