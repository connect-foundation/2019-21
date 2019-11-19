import uuidv1 from "uuid/v1";

const makeEventCode = () => {
	const uuid = uuidv1();

	/* if uuid.substring(0,4) 존재하면 다시 돌리기 */
	return uuid.substring(0, 4);
};

const initialModalState = {
	eventName: "",
	startDate: new Date(),
	endDate: new Date(),
	hashTags: [],
	eventCode: makeEventCode(),
};

const eventModalReducer = (state, action) => {
	switch (action.type) {
		case "reset": {
			return initialModalState;
		}
		case "setEventName": {
			return {...state, eventName: action.eventName};
		}
		case "setStartDate": {
			return {...state, startDate: action.startDate};
		}
		case "setEndDate": {
			return {...state, endDate: action.endDate};
		}
		case "updateHashTags": {
			return {...state, hashTags: action.hashTags};
		}
		default: {
			throw new Error(`unexpected action.type: ${action.type}`);
		}
	}
};

export {eventModalReducer, initialModalState};
