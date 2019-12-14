import React from "react";
import SwitchTitle from "./SwitchTitle.js";

function ModerationColumnTitle({state, stateHandler, data}) {
	return (
		<SwitchTitle
			titleName={"질문 검열"}
			state={state}
			stateHandler={stateHandler}
			data={data}
		/>
	);
}

export default ModerationColumnTitle;
