import React, {useState} from "react";
import Title from "./Title";
import QuestionContainer from "./Questions/QuestionContainer";
import ColumnFooter from "./ColumnFooter";
import {QuestionStyle, ModerationStyle} from "./ComponentsStyle";
import {filterStared} from "../libs/utils";

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
