import React from "react";
import TitleContainer from "./Title/TitleContainer";
import QuestionContainer from "../Questions/QuestionContainer";
import {QuestionStyle, ModerationStyle} from "./ComponentsStyle";
import {filterStared} from "../../libs/utils";

function Column({type, state, data, dataHandler, handleStar}) {
	const ColumnStyle = ((type === "moderation") ? ModerationStyle : QuestionStyle);

	return (
		<ColumnStyle state={state}>
			<TitleContainer
				type={type}
				state={state}
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
