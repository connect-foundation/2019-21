import React, {useState} from "react";
import Title from "./Title.js";
import QuestionContainer from "../Questions/QuestionContainer.js";
import ColumnFooter from "./ColumnFooter.js";
import {QuestionStyle, ModerationStyle} from "../StyledComponent/ComponentsStyle.js";
import {filterStared} from "../../libs/utils.js";

function Column({type, state, stateHandler, data, dataHandler, handleStar}) {
	const [heightWeight, setHeightWeight] = useState(0);
	const ColumnStyle = ((type === "moderation") ? ModerationStyle : QuestionStyle);

	return (
		<ColumnStyle height={`${100 + (heightWeight * 50)}%`} state={state}>
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
			<ColumnFooter data={heightWeight} handler={setHeightWeight}/>
		</ColumnStyle>
	);
}

export default Column;
