import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import useSideMenuStyles from "./UseSideMenuStyles.js";
import MyQuestionButton from "./MyQuestionButton.js";
import LogoutButton from "./LogoutButton.js";

function SideMenuBody(props) {
	const classes = useSideMenuStyles;

	return (
		<div className={classes.body} role="presentation">
			<Divider />
			<List>
				<MyQuestionButton />
				<LogoutButton />
			</List>
		</div>
	);
}

export default SideMenuBody;
