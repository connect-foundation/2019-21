import React, {useState, useContext} from "react";
import styled from "styled-components";
import {Button, Modal} from "@material-ui/core";
import PollName from "./PollName";
import PollType from "./PollType";
import MultipleItems from "./MultipleItems";
import RatingBlock from "./RatingBlock";
import Duplication from "./Duplication";
import {socketClient} from "../../libs/socket.io-Client-wrapper";
import {HostContext} from "../../libs/hostContext";

const ModalWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 400px;
	background-color: white;
`;

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

function NewPollModal({open, handleClose}) {
	// Poll이 속한 EventId
	const {events} = useContext(HostContext);
	const EventId = events[0].id;

	const initialPollName = {
		value: "",
		error: false,
		helperText: "",
	};
	// Poll 이름
	const [pollName, setPollName] = useState(initialPollName);
	const onPollNameChange = event => {
		setPollName({
			...pollName,
			value: event.target.value,
			error: false,
			helperText: "",
		});
	};
	const checkValidity = () => {
		let result = true;

		if (pollName.value.length === 0) {
			result = false;
		}
		setPollName(
			pollName.value.length === 0
				? {
						...pollName,
						error: true,
						helperText: "투표 제목을 입력하세요",
				  }
				: {
						...pollName,
						error: false,
						helperText: "",
				  },
		);

		if (!texts.every(text => text.value.length > 0)) {
			result = false;
		}
		setTexts(
			texts.map(text =>
				text.value.length === 0
					? {
							...text,
							error: true,
							helperText: "항목을 입력하세요",
					  }
					: {
							...text,
							error: false,
							helperText: "",
					  },
			),
		);

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

	// Poll 종류가 N지선다 이고 항목들의 속성이 text일때 항목들을 관리하는 부분
	const initialText = {
		value: "",
		error: false,
		helperText: "",
	};
	const initialTexts = [initialText, initialText];
	const [texts, setTexts] = useState(initialTexts);
	const onTextChange = (event, id) => {
		setTexts(
			texts.map((text, index) =>
				index === id
					? {
							...text,
							value: event.target.value,
							error: false,
							helperText: "",
					  }
					: text,
			),
		);
	};
	const onAddText = () => {
		setTexts([...texts, initialText]);
	};

	const onDeleteText = id => {
		setTexts(texts.filter((text, index) => index !== id));
	};

	// Poll 종류가 N지선다 이고 항목들의 속성이 date일때 항목들을 관리하는 부분
	const now = Date.now();
	const initialDates = [now, now];

	const [dates, setDates] = useState(initialDates);
	const onDateChange = (newDate, id) => {
		setDates(dates.map((date, index) => (index === id ? newDate : date)));
	};

	const onAddDate = () => {
		setDates([...dates, Date.now()]);
	};

	const onDeleteDate = id => {
		setDates(dates.filter((date, index) => index !== id));
	};

	// Poll 종류가 별점 일때
	const RECOMMENDED_MAX_STARS = 5;
	const MAX_STARS = 10;
	const [ratingValue, setRatingValue] = useState(RECOMMENDED_MAX_STARS);

	// Poll 종류가 N지선다 일때 중복선택 옵션을 체크하는 부분
	const [allowDuplication, setDuplication] = useState(false);
	const onDuplicationChange = event => {
		setDuplication(event.target.checked);
	};

	// 모달의 스타일 선언
	const modalStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	const getSelectionType = () =>
		pollType === "rating" ? ratingValue.toString() : selectionType;

	const getCandidates = (pollType, selectionType) =>
		pollType === "rating"
			? ratingValue
			: selectionType === "text"
			? texts
			: dates;

	const onCreatePoll = () => {
		if (!checkValidity()) {
			return;
		}
		const newPoll = {};

		newPoll.EventId = EventId;
		newPoll.pollName = pollName;
		newPoll.pollType = pollType;
		newPoll.selectionType = getSelectionType();
		newPoll.allowDuplication = allowDuplication;
		newPoll.candidates = getCandidates(pollType, selectionType);

		socketClient.emit("poll/create", newPoll);
		handleClose();
	};

	return (
		<Modal open={open} style={modalStyle} onClose={handleClose}>
			<ModalWrapper>
				<h2>투표 만들기</h2>
				<PollName
					value={pollName.value}
					onChange={onPollNameChange}
					error={pollName.error}
					helperText={pollName.helperText}
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
					<Button
						variant="contained"
						color="primary"
						onClick={onCreatePoll}
					>
						확인
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleClose}
					>
						취소
					</Button>
				</RowWrapper>
			</ModalWrapper>
		</Modal>
	);
}

export default NewPollModal;
