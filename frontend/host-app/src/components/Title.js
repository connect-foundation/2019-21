import React from "react";
import SwitchTitle from "./SwitchTitle";

function Title({type}) {
	switch (type) {
		case "moderation": return <SwitchTitle titleName="질문 검열"/>;
		case "newQuestion": return <React.Fragment>{type}</React.Fragment>;
		case "popularQuestion": return <React.Fragment>{type}</React.Fragment>;
		case "completeQuestion": return <React.Fragment>{type}</React.Fragment>;
		case "poll": return <React.Fragment>{type}</React.Fragment>;
		default: return <React.Fragment>{"wrongInput"}</React.Fragment>;
	}
}

export default Title;
