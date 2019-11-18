import React from "react";
import SwitchTitle from "./SwitchTitle";
import RadioTitle from "./RadioTitle";

function Title({type}) {
	switch (type) {
		case "moderation" : return <SwitchTitle titleName="질문 검열"/>;
		case "newQuestion": return <RadioTitle titleName="최신 질문"/>;
		case "popularQuestion": return <RadioTitle titleName="인기 질문"/>;
		case "completeQuestion": return <RadioTitle titleName="완료 질문"/>;
		case "poll": return <React.Fragment>{type}</React.Fragment>;
		default: return <React.Fragment>{"wrongInput"}</React.Fragment>;
	}
}

export default Title;
