import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined.js";
import React from "react";

function EmojiInsertButton(props) {
	const {onClick} = props;

	return (
		<IconButton size="small" onClick={onClick}>
			<InsertEmoticonOutlinedIcon />
		</IconButton>
	);
}

export default EmojiInsertButton;
