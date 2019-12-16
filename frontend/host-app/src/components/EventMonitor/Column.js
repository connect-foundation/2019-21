import React from "react";
import Title from "./Title/Title";
import QuestionContainer from "../Questions/QuestionContainer";
import {QuestionStyle, ModerationStyle} from "./ComponentsStyle";
import {filterStared} from "../../libs/utils";

function Column({type, state, stateHandler, data, dataHandler, handleStar}) {
	const ColumnStyle = ((type === "moderation") ? ModerationStyle : QuestionStyle);

	return (
		<ColumnStyle state={state}>
			<Title
				type={type}
				state={state}
				stateHandler={stateHandler}
				data={data}
				dataHandler={dataHandler}
			/>
			<QuestionContainer
				type={type}
				datas={filterStared(true, data)}
				dataHandler={dataHandler}
				handleStar={handleStar}
				containerType={"focus"}
			/>
			<QuestionContainer
				type={type}
				datas={filterStared(false, data)}
				dataHandler={dataHandler}
				handleStar={handleStar}
				containerType={"unFocus"}
			/>
		</ColumnStyle>
	);
}

export default Column;