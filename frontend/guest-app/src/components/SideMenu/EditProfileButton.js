import React from "react";
import PersonIcon from "@material-ui/icons/Person.js";
import useCommonModal from "../CommonComponent/CommonModal/useCommonModal.js";
import SideMenuItem from "./SideMenuItem.js";
import EditProfileModal from "../Modals/EditProfileModal.js";

function EditProfileButton() {
	const modalState = useCommonModal();

	return (
		<div>
			<SideMenuItem
				icon={<PersonIcon />}
				itemText={"내 프로필 변경"}
				onClick={modalState.openModal}
			/>
			<EditProfileModal
				isOpened={modalState.isOpened}
				onCancelClick={modalState.closeModal}
			/>
		</div>
	);
}

export default EditProfileButton;
