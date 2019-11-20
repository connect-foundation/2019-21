const makeEventCode = () => {
	const codeLen = 4;
	const characterCode =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ0123456789";
	let code = "";

	for (let i = 0; i < codeLen; ++i) {
		code += characterCode.charAt(
			Math.floor(Math.random() * characterCode.length),
		);
	}
	/* if uuid.substring(0,4) 존재하면 다시 돌리기 */
	return code;
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
			Object.assign(initialModalState, {eventCode: makeEventCode()});
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
