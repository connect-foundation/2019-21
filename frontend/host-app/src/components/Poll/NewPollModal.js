import React, {useContext, useState} from "react";
import styled from "styled-components";
import PollTitleInput from "./PollTitleInput.js";
import PollType from "./PollType";
import MultipleItems from "./MultipleItems";
import RatingBlock from "./RatingBlock";
import Duplication from "./Duplication";
import {socketClient} from "../../libs/socket.io-Client-wrapper";
import {HostContext} from "../../libs/hostContext";
import CancelButton from "../CommonButton/CancelButton.js";
import ConfirmButton from "../CommonButton/ConfirmButton.js";
import useNItemInput from "../../hooks/useNItemInput.js";
import CommonModal from "../CommonModal/CommonModal.js";
import useRatingInput from "../../hooks/useRatingInput.js";
import usePollTitleInput from "../../hooks/usePollTitleInput.js";

const RowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	min-height: 60px;
	padding: 0 2rem;
	box-sizing: border-box;
`;

const MAX_STARS = 10;

// 모달의 스타일 선언
const modalStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
};

const toKoreanDateFormat = date =>
	`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

function useAllowDuplication() {
	const [allowDuplication, setDuplication] = useState(false);
	const onDuplicationChange = event => {
		setDuplication(event.target.checked);
	};

	return {allowDuplication, setDuplication, onDuplicationChange};
}

function NewPollModal({open, handleClose}) {
	// Poll이 속한 EventId
	const {events} = useContext(HostContext);
	const EventId = events[0].id;

	const {onPollTitleChange, pollTitle, validatePollTitle} = usePollTitleInput();

	const validateRatingType = () => {
		let result = true;

		result = validatePollTitle(result);

		return result;
	};

	const validateNItemType = () => {
		const newtexts = texts.map(text => {
			let newText = null;

			if (text.value.length === 0) {
				newText = {
					...text,
					error: true,
					helperText: "항목을 입력하세요",
				};
			} else {
				newText = {
					...text,
					error: false,
					helperText: "",
				};
			}

			return newText;
		});

		setTexts(newtexts);
	};

	// createPoll()을 호출하기 전에 입력 항목들이 empty가 아닌지 체크함
	const checkValidity = () => {
		if (pollType === "rating") {
			return validateRatingType();
		}

		let result = true;

		result = validatePollTitle(result);

		// N지선다형의 date 인 경우, 기본값이 입력되어 있으므로 투표제목만 확인함
		if (selectionType === "date") {
			return result;
		}

		// 별점이 아닌 N지선다형의 text인경우에만 계속 validity를 진행함
		if (!texts.every(text => text.value.length > 0)) {
			result = false;
		}

		validateNItemType();

		return result;
	};

	// Poll 종류
	const [pollType, setPollType] = useState("nItems");
	const onPollTypeChange = event => {
		setPollType(event.target.value);
	};

	// Poll 종류가 N지선다 일때, 항목들의 속성이 text 인지 date 인지 선택
	const [selectionType, setSelectionType] = useState("text");
	const onSelectionTypeChange = event => {
		setSelectionType(event.target.value);
	};

	const {
		texts,
		setTexts,
		onTextChange,
		onAddText,
		onDeleteText,
	} = useNItemInput();

	// Poll 종류가 N지선다 이고 항목들의 속성이 date일때 항목들을 관리하는 부분
	const now = new Date();
	const initialDates = [now, now];

	const [dates, setDates] = useState(initialDates);
	const onDateChange = (newDate, id) => {
		setDates(dates.map((date, index) => (index === id ? newDate : date)));
	};

	const onAddDate = () => {
		setDates([...dates, new Date()]);
	};

	const onDeleteDate = id => {
		setDates(dates.filter((_, index) => index !== id));
	};

	// Poll 종류가 별점 일때
	const {ratingValue, setRatingValue} = useRatingInput();

	// Poll 종류가 N지선다 일때 중복선택 옵션을 체크하는 부분
	const {allowDuplication, onDuplicationChange} = useAllowDuplication();

	const getSelectionType = () =>
		pollType === "rating" ? ratingValue.toString() : selectionType;

	const getCandidates = (pollType, selectionType) => {
		if (pollType === "rating") {
			return new Array(ratingValue);
		}

		if (selectionType === "date") {
			return dates.map(date => toKoreanDateFormat(date));
		}

		return texts.map(text => text.value);
	};

	const onCreatePoll = () => {
		if (!checkValidity()) {
			return;
		}

		const newPoll = {
			EventId,
			pollName: pollTitle.value,
			pollType,
			selectionType: getSelectionType(),
			allowDuplication,
			candidates: getCandidates(pollType, selectionType),
		};

		socketClient.emit("poll/create", newPoll);
		handleClose();
	};

	return (
		<CommonModal isOpened={open} style={modalStyle} onClose={handleClose}>
			<div style={modalStyle}>
				<h2>투표 만들기</h2>
				<PollTitleInput
					value={pollTitle.value}
					onChange={onPollTitleChange}
					error={pollTitle.error}
					helperText={pollTitle.helperText}
				/>
				<PollType pollType={pollType} onChange={onPollTypeChange} />
				{pollType === "nItems" ? (
					<MultipleItems
						texts={texts}
						dates={dates}
						selectionType={selectionType}
						onChange={onSelectionTypeChange}
						onTextChange={onTextChange}
						onDateChange={onDateChange}
						onAddText={onAddText}
						onDeleteText={onDeleteText}
						onAddDate={onAddDate}
						onDeleteDate={onDeleteDate}
					/>
				) : (
					<RatingBlock
						ratingValue={ratingValue}
						maxValue={MAX_STARS}
						onChange={setRatingValue}
					/>
				)}
				{pollType === "nItems" && (
					<Duplication
						checked={allowDuplication}
						onChange={onDuplicationChange}
					/>
				)}
				<RowWrapper>
					<ConfirmButton onClick={onCreatePoll} />
					<CancelButton onClick={handleClose} />
				</RowWrapper>
			</div>
		</CommonModal>
	);
}

export default NewPollModal;
