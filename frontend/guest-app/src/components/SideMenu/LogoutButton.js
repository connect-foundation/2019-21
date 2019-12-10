import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp.js";
import useCommonModal from "../CommonComponent/CommonModal/useCommonModal.js";
import SideMenuItem from "./SideMenuItem.js";
import LogOutModal from "../Modals/LogoutModal.js";
import config from "../../config";

function LogoutButton(props) {
	const modalState = useCommonModal();

	return (
		<div>
			<SideMenuItem
				icon={<ExitToAppIcon />}
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
		</div>
	);
}

export default LogoutButton;
