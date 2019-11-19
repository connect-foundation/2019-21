import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles.js";

const useSideMenuStyles = makeStyles({
	list: {
		width: 250,
	},
});

function MenuItem({icon, itemText}) {
	return (
		<ListItem button key={"edit my profile"}>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={itemText} />
		</ListItem>
	);
}

function MenuList({classes, toggleNavMenu}) {
	return (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleNavMenu}
			onKeyDown={toggleNavMenu}
		>
			<List>
				<Divider />
				<MenuItem
					icon={<i className="fas fa-user" />}
					itemText={"edit my profile"}
				/>
				<MenuItem
					icon={<i className="fas fa-comment-dots" />}
					itemText={"my questions"}
				/>
				<MenuItem
					icon={<i className="fas fa-sign-out-alt" />}
					itemText={"logout"}
				/>
			</List>
			<Divider />
		</div>
	);
}

export function LeftSideNavMenu({state, toggleNavMenu}) {
	const classes = useSideMenuStyles();

	return (
		<Drawer open={state} onClose={toggleNavMenu}>
			<MenuList {...{classes, toggleNavMenu}} />
		</Drawer>
	);
}

export function useLeftMenuBarState() {
	const [state, setState] = React.useState(false);
	const toggleNavMenu = () => {
		setState(!state);
	};

	return {
		state,
		toggleNavMenu,
	};
}
