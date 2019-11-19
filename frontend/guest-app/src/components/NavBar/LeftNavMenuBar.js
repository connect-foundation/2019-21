import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles.js";

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
});

export function LeftSideNavMenu({state, toggleNavMenu}) {
	const classes = useStyles();

	return (
		<Drawer open={state} onClose={toggleNavMenu}>
			{
				<div
					className={classes.list}
					role="presentation"
					onClick={toggleNavMenu}
					onKeyDown={toggleNavMenu}
				>
					<List>
						<Divider />
						<ListItem button key={"edit my profile"}>
							<ListItemIcon>
								<i className="fas fa-user" />
							</ListItemIcon>
							<ListItemText primary={"edit my profile"} />
						</ListItem>

						<ListItem button key={"my questions"}>
							<ListItemIcon>
								<i className="fas fa-comment-dots" />
							</ListItemIcon>
							<ListItemText primary={"my questions"} />
						</ListItem>

						<ListItem button key={"logout"}>
							<ListItemIcon>
								<i className="fas fa-sign-out-alt" />
							</ListItemIcon>
							<ListItemText primary={"logout"} />
						</ListItem>
					</List>
					<Divider />
				</div>
			}
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
