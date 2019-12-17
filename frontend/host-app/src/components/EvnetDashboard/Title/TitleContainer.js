import React from "react";
import Title from "./Title";
import {filterQuestion} from "../../../libs/utils";

function TitleContainer({type, state, data, dataHandler}) {
	if (type === "moderation") {
		return <Title
			state={state}
			data={filterQuestion(type, data).questions}
			type={type}
		/>;
	} else if (type === "completeQuestion") {
		return <Title
			data={filterQuestion(type, data).questions}
			dataHandler={dataHandler}
			type={type}
		/>;
	} else {
		return <Title
			data={filterQuestion("active", data).questions}
			dataHandler={dataHandler}
			type={type}
		/>;
	}
}

export default TitleContainer;
