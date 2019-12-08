import React, {useState} from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import EmojiInstance from "./EmojiInstance";
import EmojiPickerModal from "./EmojiPickerModal";
import useCommonModal from "../CommonComponent/CommonModal/useCommonModal";

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

const addIndex = list => list.map((item, index) => ({...item, id: index}));

function EmojiInsertButton(props) {
	const {onClick} = props;

	return (
		<IconButton size="medium" onClick={onClick}>
			<InsertEmoticonOutlinedIcon />
		</IconButton>
	);
}

function EmojiArea(props) {
	// const {emojis} = props;
	// console.log(emojis)
	const emojiPickerModal = useCommonModal();
	const [emojiList, setEmojiList] = useState([]);
	const onAddEmoji = emoji => {
		const newEmoji = {
			id: emojiList.length,
			name: emoji,
			count: 1,
			voted: true,
		};

		setEmojiList(emojiList.concat(newEmoji));
	};
	const onClickEmoji = id => {
		let result = emojiList.map(emoji =>
			emoji.id === id ? updateEmoji(emoji) : emoji,
		);

		result = result.filter(n => n != null);
		result = addIndex(result);
		setEmojiList(result);
	};

	return (
		<RowWrapper left>
			{emojiList.map((emj, index) => (
				<EmojiInstance {...emj} onClick={onClickEmoji} key={index} />
			))}
			<EmojiInsertButton onClick={emojiPickerModal.openModal} />
			{emojiPickerModal.isOpened && (
				<EmojiPickerModal
					onClose={emojiPickerModal.closeModal}
					onSelect={onAddEmoji}
				/>
			)}
		</RowWrapper>
	);
}

export default EmojiArea;
