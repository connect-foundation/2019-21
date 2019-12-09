import {getEventOptionByEventId} from "../../../DB/queries/event";

import eventCache from "../../EventCache";

const initOptionSocketHandler = async (data, emit) => {
	try {
		const currentState = await getEventOptionByEventId(data); // dummy event Id

		await eventCache.set(data.eventId, currentState.get({plain: true}));
	} catch (e) {
		console.log(e);
		emit({status: "error", e});
	}
};

const eventName = "event/initOption";

export default {
	eventName,
	handler: initOptionSocketHandler,
};
