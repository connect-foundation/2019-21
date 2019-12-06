import React from "react";
import SwitchTitle from "./SwitchTitle";
import RadioTitle from "./RadioTitle";

const titleMap = {
	moderation: {
		titleName: "질문 검열",
		columnIndex: null,
	},
	newQuestion: {
		titleName: "최신 질문",
		columnIndex: 0,
	},
	popularQuestion: {
		titleName: "인기 질문",
		columnIndex: 1,
	},
	completeQuestion: {
		titleName: "완료 질문",
		columnIndex: 2,
	},
	poll: {
		titleName: "투표",
		columnIndex: 3,
	},
};

function Title({type, state, stateHandler, badgeState, dataHandler}) {
	if (type === "moderation") {
		return <SwitchTitle
			titleName= {titleMap[type].titleName}
			state={state}
			stateHandler={stateHandler}
			badgeState={badgeState}
		/>;
	} else {
		return <RadioTitle
			titleName={titleMap[type].titleName}
			state= {state}
			stateHandler={stateHandler}
			badgeState={badgeState}
			idx={titleMap[type].columnIndex}
			dataHandler={dataHandler}
			type={type}
		/>;
	}
}

export default Title;
