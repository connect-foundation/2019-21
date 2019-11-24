import React, {useState} from "react";
import styled from "styled-components";
import {Emoji} from "emoji-mart";
import EmojiPickerModal from "./EmojiPickerModal";
import useCommonModal from "../useCommonModal";

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
    height: 2rem;
	padding: 0.5rem;
    box-sizing: border-box;
`;

function EmojiArea() {
	const [isEmojiPickerModalOpened, onOpenModal, onCloseModal] = useCommonModal();
	const initialEmojiList = ["point_up", "santa", "scream"];
	const [emojiList, setEmojiList] = useState(initialEmojiList);
	const onSelect = emoji => {
		setEmojiList(emojiList.concat(emoji));
	};

	return (
		<RowWrapper left>
			{emojiList.map(emj => <Emoji emoji={emj} size={16} />)}
			<Emoji emoji='grinning' size={16} onClick={onOpenModal} />
			{isEmojiPickerModalOpened && <EmojiPickerModal
				onClose={onCloseModal}
				onSelect={onSelect}
			/>}
		</RowWrapper>
	);
}

export default EmojiArea;
