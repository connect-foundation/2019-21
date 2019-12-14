import React from "react";
import RadioTitle from "./RadioTitle.js";

function PopularQuestionColumnTitle({
	type,
	state,
	stateHandler,
	data,
	dataHandler,
}) {
	return (
		<RadioTitle
			titleName={"인기 질문"}
			idx={1}
			state={state}
			stateHandler={stateHandler}
			data={data}
			dataHandler={dataHandler}
			type={type}
		/>
	);
}

export default PopularQuestionColumnTitle;