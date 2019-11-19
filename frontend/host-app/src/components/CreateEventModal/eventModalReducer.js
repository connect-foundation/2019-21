const initialModalState = {
	eventName: "",
	startDate: null,
	endDate: null,
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
		default: {
			throw new Error(`unexpected action.type: ${action.type}`);
		}
	}
};

export {eventModalReducer, initialModalState};
