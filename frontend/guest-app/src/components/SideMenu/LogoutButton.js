import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp.js";
import useCommonModal from "../CommonModal/useCommonModal.js";
import SideMenuItem from "./SideMenuItem.js";
import LogOutModal from "./LogoutModal.js";
import config from "../../config";

function LogoutButton() {
	const modalState = useCommonModal();

	return (
		<>
			<SideMenuItem
				icon={<ExitToAppIcon/>}
				itemText={"로그아웃"}
				onClick={modalState.openModal}
			/>
			<LogOutModal
				isOpened={modalState.isOpened}
				onCancelClick={modalState.closeModal}
				onLogout={() =>
					(window.location.href = config.logoutRedirectURL)
				}
			/>
		</>
	);
}

export default LogoutButton;
