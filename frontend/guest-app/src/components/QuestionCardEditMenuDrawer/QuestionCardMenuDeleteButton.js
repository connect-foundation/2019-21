import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete.js";
import useCommonModal from "../CommonComponent/CommonModal/useCommonModal.js";
import SideMenuItem from "../SideMenu/SideMenuItem.js";
import QuestionCardDeleteModal from "./QuestionCardDeleteModal.js";

function QuestionCardMenuDeleteButton(props) {
	const {onDelete} = props;
	const {isOpened, openModal, closeModal} = useCommonModal();

	return (
		<>
			<SideMenuItem
				icon={<DeleteIcon/>}
				itemText={"질문 삭제"}
				onClick={openModal}
			/>
			<QuestionCardDeleteModal
				isOpened={isOpened}
				closeModal={closeModal}
				onDelete={onDelete}
			/>
		</>
	);
}

QuestionCardMenuDeleteButton.propTypes = {
	onDelete: PropTypes.func,
};

export default QuestionCardMenuDeleteButton;
