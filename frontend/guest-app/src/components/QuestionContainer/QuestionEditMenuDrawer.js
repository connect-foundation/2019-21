import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import EditIcon from "@material-ui/icons/Edit.js";
import SideMenuItem from "../SideMenu/SideMenuItem.js";
import DeleteQuestionCardMenuButton from "../DeleteQuestionCardMenu/DeleteQuestionCardMenuButton.js";

function QuestionEditMenuDrawer(props) {
	const {isOpen, onClose, onEdit, onDelete} = props;

	// todo 컴포넌트 쪼개기
	return (
		<Drawer open={isOpen} anchor={"bottom"} onClose={onClose}>
			<List>
				<SideMenuItem
					icon={<EditIcon />}
					itemText={"질문 수정"}
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
