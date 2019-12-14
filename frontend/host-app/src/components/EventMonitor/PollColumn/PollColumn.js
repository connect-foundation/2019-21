import React from "react";
import Column from "../Column.js";

function PollColumn({state, stateHandler, badgeHandler, data}) {
	return (
		<Column
			type="poll"
			state={state}
			stateHandler={stateHandler}
			badgeState={badgeHandler}
			data={data}
		/>
	);
}

export default PollColumn;
