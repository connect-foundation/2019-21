import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete.js";
import useCommonModal from "../CommonModal/useCommonModal.js";
import SideMenuItem from "../SideMenu/SideMenuItem.js";
import DeleteQuestionCardModal from "./DeleteQuestionCardModal.js";

function DeleteQuestionCardMenuButton(props) {
	const {onDelete} = props;
	const {isOpened, openModal, closeModal} = useCommonModal();

	return (
		<>
			<SideMenuItem
				icon={<DeleteIcon/>}
				itemText={"질문 삭제"}
				onClick={openModal}
			/>
			<DeleteQuestionCardModal
				isOpened={isOpened}
				closeModal={closeModal}
				onDelete={onDelete}
			/>
		</>
	);
}

DeleteQuestionCardMenuButton.propTypes = {
	onDelete: PropTypes.func,
};

export default DeleteQuestionCardMenuButton;
