import React from "react";
import DeleteIcon from "@material-ui/icons/Delete.js";
import useCommonModal from "../../CommonComponent/CommonModal/useCommonModal.js";
import SideMenuItem from "../../SideMenu/SideMenuItem.js";
import DeleteQuestionCardModal from "./DeleteQuestionCardModal.js";

function DeleteQuestionCardMenuButton() {
	const {isOpened, openModal, closeModal} = useCommonModal();

	return (
		<>
			<SideMenuItem
				icon={<DeleteIcon />}
				itemText={"질문 삭제"}
				onClick={openModal}
			/>
			<DeleteQuestionCardModal
				isOpened={isOpened}
				closeModal={closeModal}
			/>
		</>
	);
}

export default DeleteQuestionCardMenuButton;
