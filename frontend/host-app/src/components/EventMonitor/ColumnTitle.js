import React from "react";
import ModerationColumnTitle from "./ModerationColumnTitle.js";
import {filterQuestion} from "../../libs/utils.js";
import CompleteQuestionColumnTitle from "./CompleteQuestionColumnTitle.js";
import NewQuestionColumnTitle from "./NewQuestionColumnTitle.js";
import PopularQuestionColumnTitle from "./PopularQuestionColumnTitle.js";

// todo: propType, defalut prop 추가
// todo: 이 컴포넌트에서 분기를 거치지 않고 각 컬럼 컴포넌트에서 직접 사용하도록 수정
function ColumnTitle({type, state, dataHandler, data, stateHandler}) {
	if (type === "moderation") {
		return (
			<ModerationColumnTitle
				state={state}
				stateHandler={stateHandler}
				data={filterQuestion(type, data).questions}
			/>
		);
	} else if (type === "completeQuestion") {
		return (
			<CompleteQuestionColumnTitle
				state={state}
				stateHandler={stateHandler}
				data={filterQuestion(type, data).questions}
				dataHandler={dataHandler}
				type={type}
			/>
		);
	} else if (type === "newQuestion") {
		return (
			<NewQuestionColumnTitle
				state={state}
				stateHandler={stateHandler}
				data={filterQuestion("active", data).questions}
				dataHandler={dataHandler}
				type={type}
			/>
		);
	} else if (type === "popularQuestion") {
		return (
			<PopularQuestionColumnTitle
				state={state}
				stateHandler={stateHandler}
				data={filterQuestion("active", data).questions}
				dataHandler={dataHandler}
				type={type}
			/>
		);
	}
}

export default ColumnTitle;
