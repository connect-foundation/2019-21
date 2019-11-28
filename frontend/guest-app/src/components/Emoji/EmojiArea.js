import React, {useState} from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import EmojiInstance from "./EmojiInstance";
import EmojiPickerModal from "./EmojiPickerModal";
import useCommonModal from "../CommonModal/useCommonModal";
import EmojiDummyData from "./EmojiDummyData";

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	padding: 0.5rem;
	flex-wrap: wrap;
	box-sizing: border-box;
	button {
		outline: none;
	}
`;

const updateEmoji = emoji => {
	if (emoji.voted && emoji.count === 1) {
		return null;
	}

	const newEmoji = {...emoji};

	if (newEmoji.voted) {
		newEmoji.voted = false;
		newEmoji.count--;
	} else {
		newEmoji.voted = true;
		newEmoji.count++;
	}

	return newEmoji;
};

const addIndex = (list) => {
	return list.map((item, index) => ({...item, id:index}));
};

function EmojiArea() {
	const emojiPickerModal = useCommonModal();
	const initialEmojiList = EmojiDummyData();
	const [emojiList, setEmojiList] = useState(initialEmojiList);
	const onSelect = emoji => {
		const newEmoji = {
			id: emojiList.length,
			name: emoji,
			count: 1,
			voted: true,
		};

		setEmojiList(emojiList.concat(newEmoji));
	};
	const onVote = id => {
		let result = emojiList.map(emoji => (emoji.id === id ? updateEmoji(emoji) : emoji));
		result = result.filter(n => n != null);
		result = addIndex(result);
		setEmojiList(result);
	};

	return (
		<RowWrapper left>
			{emojiList.map((emj, index) => <EmojiInstance {...emj} onVote={onVote} key={index} />)}
			<IconButton size="medium" onClick={emojiPickerModal.openModal}>
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
