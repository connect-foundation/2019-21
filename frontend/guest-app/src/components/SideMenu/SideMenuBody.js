import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import SideMenuItem from "./SideMenuItem.js";
import EditProfileModal from "../Modals/EditPriofileModal/EditProfileModal.js";
import useSideMenuStyles from "./UseSideMenuStyles.js";
import {LogoutIcon, QuestionIcon, UserIcon} from "../FontAwesomeIcons.js";
import useCommonModal from "../useCommonModal.js";
import LogOutModal from "../Modals/LogoutModal.js";
import MyQuestionModal from "../Modals/MyQuestionModal.js";

function EditProfileButton() {
	const modalState = useCommonModal();

	return (
		<div>
			<SideMenuItem
				icon={<UserIcon />}
				itemText={"edit my profile"}
				onClick={modalState.openModal}
			/>
			<EditProfileModal
				isOpened={modalState.isOpened}
				onCancelClick={modalState.closeModal}
			/>
		</div>
	);
}

function MyQuestionButton() {
	const modalState = useCommonModal();

	return (
		<div>
			<SideMenuItem
				icon={<QuestionIcon />}
				itemText={"my questions"}
				onClick={modalState.openModal}
			/>
			<MyQuestionModal
				isOpened={modalState.isOpened}
				onCancelClick={modalState.closeModal}
			/>
		</div>
	);
}

function LogoutButton() {
	const modalState = useCommonModal();

	return (
		<div>
			<SideMenuItem
				icon={<LogoutIcon />}
				itemText={"logout"}
				onClick={modalState.openModal}
			/>
			<LogOutModal
				isOpened={modalState.isOpened}
				onCancelClick={modalState.closeModal}
			/>
		</div>
	);
}

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
			<Divider />

			<EditProfileModal />
		</div>
	);
}

export default SideMenuBody;
