import React from "react";
import {Modal} from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import {Picker} from "emoji-mart";
import customEmojis from "./CustomEmojis";

function EmojiPickerModal({open, onClose, onSelect}) {
	return <Modal open={open} onClose={onClose}>
		<Picker
			style={{position: "absolute", bottom: "20px", right: "20px"}}
			onSelect={onSelect}
			title="Pick your emoji…"
			custom={customEmojis}
		/>
	</Modal>;
}


export default EmojiPickerModal;
