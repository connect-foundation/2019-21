import React from "react";
import RadioTitle from "./RadioTitle.js";

function CompleteQuestionColumnTitle({
	type,
	state,
	stateHandler,
	data,
	dataHandler,
}) {
	return (
		<RadioTitle
			titleName={"완료 질문"}
			state={state}
			stateHandler={stateHandler}
			data={data}
			idx={2}
			dataHandler={dataHandler}
			type={type}
		/>
	);
}

export default CompleteQuestionColumnTitle;
