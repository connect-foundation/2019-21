import React, {useContext} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import EmojiInstance from "./EmojiInstance";
import EmojiPickerModal from "./EmojiPickerModal";
import useCommonModal from "../CommonComponent/CommonModal/useCommonModal";
import {socketClient} from "../../libs/socket.io-Client-wrapper.js";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";

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
	const {emojis, id: QuestionId} = props;
	const {guest, event} = useContext(GuestGlobalContext);
	const emojiPickerModal = useCommonModal();

	const onAddEmoji = emoji => {
		const newEmoji = {
			name: emoji,
			QuestionId,
			GuestId: guest.id,
			EventId: event.id,
		};

		socketClient.emit("questionEmoji/create", newEmoji);
	};

	const onClickEmoji = name => {
		emojis.forEach(emoji => {
			if (emoji.name !== name) {
				return;
			}

			const newEmoji = {
				name: emoji.name,
				QuestionId,
				GuestId: guest.id,
				EventId: event.id,
			};

			socketClient.emit("questionEmoji/create", newEmoji);
		});
	};

	return (
		<RowWrapper left>
			{emojis.map((emj, index) => (
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
