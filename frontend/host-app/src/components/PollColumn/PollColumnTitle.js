import React from "react";
import RadioTitle from "../EventMonitor/RadioTitle.js";

function PollColumnTitle({type, state, stateHandler, data, dataHandler}) {
	return (
		<RadioTitle
			titleName={"투표"}
			idx={3}
			state={state}
			stateHandler={stateHandler}
			data={data}
			dataHandler={dataHandler}
			type={type}
		/>
	);
}

export default PollColumnTitle;
