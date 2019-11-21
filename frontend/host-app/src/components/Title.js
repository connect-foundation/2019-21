import React from "react";
import SwitchTitle from "./SwitchTitle";
import RadioTitle from "./RadioTitle";

function Title({type, state, stateHandler, badgeState, dataHandler}) {
	switch (type) {
		case "moderation" : return <SwitchTitle
			titleName="질문 검열"
			state= {state}
			stateHandler={stateHandler}
			badgeState={badgeState}
		/>;
		case "newQuestion": return <RadioTitle
			titleName="최신 질문"
			state= {state}
			stateHandler={stateHandler}
			badgeState={badgeState}
			idx={0}
			dataHandler={dataHandler}
			type={type}
		/>;
		case "popularQuestion": return <RadioTitle
			titleName="인기 질문"
			state= {state}
			stateHandler={stateHandler}
			badgeState={badgeState}
			idx={1}
			dataHandler={dataHandler}
			type={type}
		/>;
		case "completeQuestion": return <RadioTitle
			titleName="완료 질문"
			state= {state}
			stateHandler={stateHandler}
			badgeState={badgeState}
			idx={2}
		/>;
		case "poll": return <RadioTitle
			titleName="투표"
			state= {state}
			stateHandler={stateHandler}
			badgeState={badgeState}
			idx={3}
		/>;
		default: return <React.Fragment>{"wrongInput"}</React.Fragment>;
	}
}

export default Title;
