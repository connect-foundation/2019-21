import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Icon} from "@material-ui/core";
import useStyle from "./useButtonStyles";

const ITEM_HEIGHT = 48;

export default function QuestionMenuButton({id, type, handler}) {
	const classes = useStyle();
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
				<Icon className={classes.menuButton} onClick={handleClick}>more_vert</Icon>
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
