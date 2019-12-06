import {updateEventById} from "../../../DB/queries/event";
import globalOption from "../../globalOption";

const toggleModerationSocketHandler = async (data, emit) => {
	try {
		const currentState = data.state;
		const currentOption = globalOption.getOption(2); // dummy event Id

		await updateEventById(data.eventId, {moderationOption: currentState});
		currentOption.moderationOption = currentState;
		globalOption.setOption(2, currentOption);
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
