import Switch from "@material-ui/core/Switch";
import React from "react";
import moderationEventEmit from "../../EventEmiter/moderationEventEmiter";

function ModerationButton({state, eventId}) {
	return (
		<Switch
			checked={state}
			onClick={() => moderationEventEmit(eventId, state)}
		/>
	);
}

export default ModerationButton;
