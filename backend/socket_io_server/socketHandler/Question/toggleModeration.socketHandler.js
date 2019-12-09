import { updateEventById } from "../../../DB/queries/event";
import eventCache from "../../EventCache";

const toggleModerationSocketHandler = async (data, emit) => {
	try {
		const currentState = data.state;
		const currentOption = await eventCache.get(data.eventId);

		await updateEventById(data.eventId, {moderationOption: currentState});
		currentOption.moderationOption = currentState;
		await eventCache.set(data.eventId, currentOption);
		emit({eventId: data.eventId, state: currentState});
	} catch (e) {
		console.log(e);
		emit({status: "error", e});
	}
};

const eventName = "moderation/toggle";

export default {
	eventName,
	handler: toggleModerationSocketHandler,
};
