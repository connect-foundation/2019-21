const initialModalState = {
	eventName: "",
	startDate: new Date(),
	endDate: new Date(),
	hashTags: [],
};

const eventModalReducer = (state, action) => {
	switch (action.type) {
		case "reset": {
			return {...initialModalState};
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
