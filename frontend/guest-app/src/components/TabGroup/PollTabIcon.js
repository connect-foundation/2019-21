import React from "react";
import Badge from "@material-ui/core/Badge/Badge.js";
import PollIcon from "@material-ui/icons/Poll.js";

const style = {marginRight: "8px"};

function PollTabIcon({showBadge}) {
	const props = showBadge ? {color: "error", variant: "dot"} : {};

	return (
		<Badge {...props}>
			<PollIcon style={style} />
			투표
		</Badge>
	);
}

export default PollTabIcon;
