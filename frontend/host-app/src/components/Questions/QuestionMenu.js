import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Icon} from "@material-ui/core";
import useStyles from "./useStyles";
import Tooltip from "@material-ui/core/Tooltip";

const ITEM_HEIGHT = 48;

export default function QuestionMenu({id, type, handler}) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		handler(id, type, "deleted");
		handleClose();
	};

	return (
		<>
			<Tooltip title="메뉴">
				<Icon className={classes.moreButton} onClick={handleClick}>more_vert</Icon>
			</Tooltip>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: 100,
					},
				}}
			>
				<MenuItem key={"삭제"} onClick={() => { handleDelete(); } }>
					{"삭제"}
				</MenuItem>
			</Menu>
		</>
	);
}
