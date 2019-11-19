import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles.js";

import {Grid} from "@material-ui/core";

const useSideMenuStyles = makeStyles({
	list: {
		width: 250,
	},
	header: {
		minHeight: 150,
		paddingLeft: "1rem",
		paddingRight: "1rem",
	},
	headerWrappedText: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		width: 200,
	},
	headerSpace: {
		height: 100,
	},
});

function MenuHeader({
	classes,
	eventName = "event name ",
	eventTerm = "event term ",
	eventCode = "event code ",
}) {
	return (
		<Grid
			container
			className={classes.header}
			direction="column"
			justify="flex-end"
		>
			<div className={classes.headerSpace} />
			<div className={classes.headerWrappedText}>
				<Typography>{eventName}</Typography>
			</div>
			<div className={classes.headerWrappedText}>
				<Typography color={"textSecondary"} variant={"body1"}>
					{eventTerm}
				</Typography>
			</div>
			<div className={classes.headerWrappedText}>
				<Typography color={"textSecondary"} variant={"body1"}>
					{eventCode}
				</Typography>
			</div>
		</Grid>
	);
}

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

export function LeftSideNavMenu({isOpen, toggleNavMenu}) {
	const classes = useSideMenuStyles();

	return (
		<Drawer open={isOpen} onClose={toggleNavMenu}>
			<MenuHeader {...{classes}} />
			<MenuList {...{classes, toggleNavMenu}} />
		</Drawer>
	);
}

export function useLeftMenuBarState() {
	const [isOpen, setState] = React.useState(false);
	const toggleNavMenu = () => {
		setState(!isOpen);
	};

	return {
		isOpen,
		toggleNavMenu,
	};
}
