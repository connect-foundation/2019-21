import React from "react";
import RadioTitle from "./RadioTitle.js";

// todo: proptypes 및 default prop추가
function NewQuestionColumnTitle({type, state, stateHandler, data, dataHandler}) {
	return <RadioTitle
		titleName={"최신 질문"}
		idx={0}
		state={state}
		stateHandler={stateHandler}
		data={data}
		dataHandler={dataHandler}
		type={type}
	/>;
}

export default NewQuestionColumnTitle;
