import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

function SideMenuItem({icon, itemText, onClick}) {
	return (
		<ListItem button key={"edit my profile"} onClick={onClick}>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={itemText} />
		</ListItem>
	);
}

export default SideMenuItem;
