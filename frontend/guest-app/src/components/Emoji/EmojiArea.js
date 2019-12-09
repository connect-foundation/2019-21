import React, {useContext} from "react";
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

function EmojiInsertButton(props) {
	const {onClick} = props;

	return (
		<IconButton size="small" onClick={onClick}>
			<InsertEmoticonOutlinedIcon />
		</IconButton>
	);
}

const unPickEmoji = (emojis, name, guestGlobal, QuestionId) => {
	const {event, guest} = guestGlobal;

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

		socketClient.emit("questionEmoji/remove", newEmoji);
	});
};

const pickEmoji = (emojis, name, guestGlobal, QuestionId) => {
	const {event, guest} = guestGlobal;

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

function EmojiArea(props) {
	const {emojis, id: QuestionId} = props;
	const guestGlobal = useContext(GuestGlobalContext);
	const emojiPickerModal = useCommonModal();

	const onEmojiInstanceClick = (name, didIPick) => {
		didIPick ?
			unPickEmoji(emojis, name, guestGlobal, QuestionId) :
			pickEmoji(emojis, name, guestGlobal, QuestionId);
	};

	const onSelectOfEmojiPicker = value => {
		const {id: name} = value;
		const {event, guest} = guestGlobal;
		const newEmoji = {
			name,
			QuestionId,
			GuestId: guest.id,
			EventId: event.id,
		};

		if (emojis.filter(x => x.name === name).length) {
			return;
		}

		socketClient.emit("questionEmoji/create", newEmoji);
		emojiPickerModal.closeModal();
	};

	return (
		<RowWrapper left>
			{emojis.map((emj, index) => (
				<EmojiInstance {...emj} onClick={onEmojiInstanceClick} key={index} />
			))}
			<EmojiInsertButton onClick={emojiPickerModal.openModal} />
			{emojiPickerModal.isOpened && (
				<EmojiPickerModal
					onClose={emojiPickerModal.closeModal}
					onSelect={onSelectOfEmojiPicker}
				/>
			)}
		</RowWrapper>
	);
}

export default EmojiArea;
