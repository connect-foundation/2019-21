import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import QuestionCardMenuDeleteButton from "./QuestionCardMenuDeleteButton.js";
import EditQuestionCardMenuButton from "./QuestionCardMenuEditButton.js";

function QuestionCardEditMenuDrawer(props) {
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
				<QuestionCardMenuDeleteButton
					onClick={onClose}
					onDelete={onDelete}
				/>
			</List>
		</Drawer>
	);
}

QuestionCardEditMenuDrawer.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
};

QuestionCardEditMenuDrawer.defaultProps = {
	isOpen: false,
	onClose: () => {},
	onEdit: () => {},
	onDelete: () => {},
};

export default QuestionCardEditMenuDrawer;
