import React from "react";
import {Modal} from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import {Picker} from "emoji-mart";

function EmojiPickerModal({onClose, onSelect}) {
	return (
		<Modal open autoFocus onClose={onClose}>
			<Picker style={{position: "absolute", bottom: "20px", right: "20px"}} onSelect={onSelect} />
		</Modal>
	);
}

export default EmojiPickerModal;
