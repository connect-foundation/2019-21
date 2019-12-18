import React from "react";
import styled from "styled-components";
import EmojiBadge from "./EmojiBadge.js";
import EmojiPickerModal from "./EmojiPickerModal";
import useCommonModal from "../CommonComponent/CommonModal/useCommonModal";
import {socketClient} from "../../socket.io";
import EmojiInsertButton from "./EmojiInsertButton.js";
import useGlobalData from "../../models/GlobalData/useGlobalData.js";

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

function isIncludeSameEmoji(emojis, name) {
	return emojis.filter(x => x.name === name).length > 0;
}

function EmojiArea(props) {
	const {emojis, id: QuestionId} = props;
	const guestGlobal = useGlobalData();
	const emojiPickerModal = useCommonModal();

	const onEmojiInstanceClick = (name, didIPick) => {
		didIPick
			? unPickEmoji(emojis, name, guestGlobal, QuestionId)
			: pickEmoji(emojis, name, guestGlobal, QuestionId);
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

		if (isIncludeSameEmoji(emojis, name)) {
			return;
		}

		socketClient.emit("questionEmoji/create", newEmoji);
		emojiPickerModal.closeModal();
	};

	return (
		<RowWrapper left>
			{emojis.map((emj, index) => (
				<EmojiBadge
					{...emj}
					onClick={onEmojiInstanceClick}
					key={index}
				/>
			))}
			<EmojiInsertButton onClick={emojiPickerModal.openModal} />
			<EmojiPickerModal
				open={emojiPickerModal.isOpened}
				onClose={emojiPickerModal.closeModal}
				onSelect={onSelectOfEmojiPicker}
			/>
		</RowWrapper>
	);
}

export default EmojiArea;
