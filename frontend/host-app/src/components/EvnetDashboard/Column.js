import React from "react";
import TitleContainer from "./Title/TitleContainer";
import QuestionContainer from "../Questions/QuestionContainer";
import {QuestionStyle, ModerationStyle} from "./ComponentsStyle";
import {filterStared} from "../../libs/utils";

function Column({type, state, data}) {
	const ColumnStyle = ((type === "moderation") ? ModerationStyle : QuestionStyle);

	return (
		<ColumnStyle state={state}>
			<TitleContainer
				type={type}
				state={state}
				data={data}
			/>
			<QuestionContainer
				type={type}
				datas={filterStared(true, data)}
				containerType={"focus"}
			/>
			<QuestionContainer
				type={type}
				datas={filterStared(false, data)}
				containerType={"unFocus"}
			/>
		</ColumnStyle>
	);
}

export default Column;
