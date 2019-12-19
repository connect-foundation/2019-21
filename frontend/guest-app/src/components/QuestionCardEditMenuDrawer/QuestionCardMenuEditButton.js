import React from "react";
import EditIcon from "@material-ui/icons/Edit.js";
import SideMenuItem from "../SideMenu/SideMenuItem.js";

function EditQuestionCardMenuButton({onClick}) {
	return (
		<SideMenuItem
			icon={<EditIcon />}
			itemText={"질문 수정"}
			onClick={onClick}
		/>
	);
}

export default EditQuestionCardMenuButton;
