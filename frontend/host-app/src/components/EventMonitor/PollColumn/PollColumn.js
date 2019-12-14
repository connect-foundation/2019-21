import React from "react";
import {filterQuestion} from "../../../libs/utils.js";
import PollColumnTitle from "./PollColumnTitle.js";
import PollApollo from "../../Poll/PollApollo.js";
import AdjustAbleColumn from "../AdjustAbleColumn/AdjustAbleColumn.js";

function PollColumn({state, stateHandler, data}) {
	return (
		<AdjustAbleColumn>
			<PollColumnTitle
				type={"poll"}
				state={state}
				stateHandler={stateHandler}
				data={filterQuestion("active", data).questions}
				dataHandler={undefined}
			/>
			<PollApollo />
		</AdjustAbleColumn>
	);
}

export default PollColumn;
