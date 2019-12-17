import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import DeleteQuestionCardMenuButton from "./DeleteQuestionCardMenuButton.js";
import EditQuestionCardMenuButton from "./EditQuestoinCardMenuButton.js";

function QuestionEditMenuDrawer(props) {
	const {isOpen, onClose, onEdit, onDelete} = props;

	return (
		<Drawer open={isOpen} anchor={"bottom"} onClose={onClose}>
			<List>
				<EditQuestionCardMenuButton
					onClick={() => {
						onEdit();
						onClose();
					}}
				/>
				<DeleteQuestionCardMenuButton
					onClick={onClose}
					onDelete={onDelete}
				/>
			</List>
		</Drawer>
	);
}

QuestionEditMenuDrawer.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
};

QuestionEditMenuDrawer.defaultProps = {
	isOpen: false,
	onClose: () => {},
	onEdit: () => {},
	onDelete: () => {},
};

export default QuestionEditMenuDrawer;
