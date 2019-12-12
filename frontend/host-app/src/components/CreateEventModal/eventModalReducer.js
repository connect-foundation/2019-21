const eventModalReducer = (state, action) => {
	switch (action.type) {
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

export {eventModalReducer};
