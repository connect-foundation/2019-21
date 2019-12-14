import React from "react";
import ModerationColumnTitle from "./ModerationColumnTitle.js";
import {filterQuestion} from "../../libs/utils.js";
import CompleteQuestionColumnTitle from "./CompleteQuestionColumnTitle.js";
import NewQuestionColumnTitle from "./NewQuestionColumnTitle.js";
import PopularQuestionColumnTitle from "./PopularQuestionColumnTitle.js";

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
