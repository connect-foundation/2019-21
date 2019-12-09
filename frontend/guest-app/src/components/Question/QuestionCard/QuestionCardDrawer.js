import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import EditIcon from "@material-ui/icons/Edit.js";
import SideMenuItem from "../../SideMenu/SideMenuItem.js";
import DeleteQuestionCardMenuButton from "./DeleteQuestionCardMenuButton.js";

function QuestionCardDrawer(props) {
	const {isOpen, toggleDrawer} = props;

	return (
		<Drawer open={isOpen} anchor={"bottom"} onClose={toggleDrawer}>
			<List>
				<SideMenuItem
					icon={<EditIcon />}
					itemText={"질문 수정"}
					onClick={toggleDrawer}
				/>
				<DeleteQuestionCardMenuButton onClick={toggleDrawer} />
			</List>
		</Drawer>
	);
}

export default QuestionCardDrawer;
