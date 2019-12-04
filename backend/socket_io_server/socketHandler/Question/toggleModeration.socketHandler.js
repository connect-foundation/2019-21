import {updateEventById} from "../../../DB/queries/event";

const toggleModerationSocketHandler = async (data, emit) => {
	try {
		const currentState = data.state;
		const updatedEvent = await updateEventById(data.eventId, {moderationOption: currentState});

		console.log(currentState);
		console.log(updatedEvent[0]);

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
