import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CommonModal from "../CommonComponent/CommonModal/CommonModal.js";

function DeleteQuestionCardModal(props) {
	const {isOpened, closeModal, onCancel, onDelete} = props;

	return (
		<CommonModal isOpened={isOpened} onCancelClick={closeModal}>
			<p>질문을 삭제하겠습니까?</p>
			<Grid container direction={"row"} justify="flex-end">
				<Button onClick={onCancel || closeModal}>취소</Button>
				<Button color="secondary" onClick={onDelete}>
					삭제
				</Button>
			</Grid>
		</CommonModal>
	);
}

DeleteQuestionCardModal.propTypes = {
	isOpened: PropTypes.bool,
	closeModal: PropTypes.func,
	onCancel: PropTypes.func,
	onDelete: PropTypes.func,
};

DeleteQuestionCardModal.defaultProps = {
	isOpened: PropTypes.bool,
};

export default DeleteQuestionCardModal;
