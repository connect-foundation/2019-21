const initialGeneralState = {
	// 데이터베이스에서 데이터를 불러와서 초기화함
	eventName: "안녕하세요 ㅋㅋㅋㅋㅋ",
	startDate: new Date(),
	endDate: new Date(),
	hashTags: [{key: "sadfsadf", label: "부스트캠프"}, {key: "asdfuuu", label: "자바스크립트"}],
	eventLink: "https://github.com/connect-foundation/2019-21",
	eventCode: "A87E",
};

const generalSettingReducer = (state, action) => {
	switch (action.type) {
		case "reset": {
			return {...initialGeneralState};
		}
		case "updateEventName": {
			return {...state, eventName: action.eventName};
		}
		case "updateStartDate": {
			return {...state, startDate: action.startDate};
		}
		case "updateEndDate": {
			return {...state, endDate: action.endDate};
		}
		case "updateHashTags": {
			return {...state, hashTags: action.hashTags};
		}
		case "updateEventCode": {
			return {...state, eventCode: action.eventCode};
		}
		default: {
			throw new Error(`unexpected action.type: ${action.type}`);
		}
	}
};

export {initialGeneralState, generalSettingReducer};
