import React, {useState} from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import {Emoji} from "emoji-mart";
import EmojiPickerModal from "./EmojiPickerModal";
import useCommonModal from "../CommonModal/useCommonModal";

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
    min-height: 2rem;
	padding: 0.5rem;
	flex-wrap: wrap;
    box-sizing: border-box;
`;

function EmojiArea() {
	const emojiPickerModal = useCommonModal();
	const initialEmojiList = ["point_up", "santa", "scream"];
	const [emojiList, setEmojiList] = useState(initialEmojiList);
	const onSelect = emoji => {
		setEmojiList(emojiList.concat(emoji));
	};

	return (
		<RowWrapper left>
			{emojiList.map(emj => <Emoji emoji={emj} size={16} />)}
			<IconButton onClick={emojiPickerModal.openModal}>
        		<InsertEmoticonOutlinedIcon />
      		</IconButton>
			{emojiPickerModal.isOpened && <EmojiPickerModal
				onClose={emojiPickerModal.closeModal}
				onSelect={onSelect}
			/>}
		</RowWrapper>
	);
}

export default EmojiArea;
