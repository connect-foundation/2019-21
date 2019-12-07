import {getEventOptionByEventId} from "../../../DB/queries/event";
import globalOption from "../../globalOption";

const initOptionSocketHandler = async (data, emit) => {
	try {
		const currentState = await getEventOptionByEventId(data); // dummy event Id

		globalOption.setOption(data, currentState.get({plain: true}));
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
