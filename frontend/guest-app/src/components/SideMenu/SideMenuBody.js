import React from "react";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import EditProfileModal from "../Modals/EditProfileModal.js";
import useSideMenuStyles from "./UseSideMenuStyles.js";
import EditProfileButton from "./EditProfileButton.js";
import MyQuestionButton from "./MyQuestionButton.js";
import LogoutButton from "./LogoutButton.js";

function SideMenuBody(props) {
	const classes = useSideMenuStyles;

	return (
		<div className={classes.body} role="presentation">
			<Divider />
			<List>
				<EditProfileButton />
				<MyQuestionButton />
				<LogoutButton />
			</List>


			<EditProfileModal />
		</div>
	);
}

export default SideMenuBody;
