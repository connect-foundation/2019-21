import React, {useContext, useReducer} from "react";
import styled from "styled-components";
import {Button, Modal} from "@material-ui/core";
import PollName from "./PollName";
import PollType from "./PollType";
import MultipleItems from "./MultipleItems";
import RatingBlock from "./RatingBlock";
import Duplication from "./Duplication";
import {socketClient} from "../../libs/socket.io-Client-wrapper";
import {HostContext} from "../../libs/hostContext";
import initialPollData from "./InitialPollData";
import newPollReducer from "./NewPollReducer";

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

// 모달의 스타일 선언
const modalStyle = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

function NewPollModal({open, handleClose}) {
	// Poll이 속한 EventId
	const {events} = useContext(HostContext);
	const EventId = events[0].id;

	const [pollInfo, dispatch] = useReducer(newPollReducer, initialPollData);

	const {
		pollName,
		pollType,
		selectionType,
		texts,
		dates,
		allowDuplication,
		ratingValue,
	} = pollInfo;

	// Poll 이름
	const onPollNameChange = event => {
		dispatch({
			type: "POLL_NAME_CHANGE",
			value: {
				value: event.target.value,
				error: false,
				helperText: "",
			},
		});
	};

	// Poll 종류
	const onPollTypeChange = event => {
		dispatch({
			type: "POLL_TYPE_CHANGE",
			value: event.target.value,
		});
	};

	// Poll 종류가 N지선다 일때, 항목들의 속성이 text 인지 date 인지 선택
	const onSelectionTypeChange = event => {
		dispatch({
			type: "SELECTION_TYPE_CHANGE",
			value: event.target.value,
		});
	};

	// Poll 종류가 N지선다 이고 항목들의 속성이 text일때 항목들을 관리하는 부분
	const onTextChange = (event, id) => {
		dispatch({
			type: "TEXT_CHANGE",
			value: event.target.value,
			id,
		});
	};
	const onAddText = () => {
		dispatch({
			type: "TEXT_ADD",
		});
	};

	const onDeleteText = id => {
		dispatch({
			type: "TEXT_DELETE",
			id,
		});
	};

	// Poll 종류가 N지선다 이고 항목들의 속성이 date일때 항목들을 관리하는 부분
	const onDateChange = (newDate, id) => {
		dispatch({
			type: "DATE_CHANGE",
			value: newDate,
			id,
		});
	};

	const onAddDate = () => {
		dispatch({
			type: "DATE_ADD",
		});
	};

	const onDeleteDate = id => {
		dispatch({
			type: "DATE_DELETE",
			id,
		});
	};

	// Poll 종류가 별점 일때
	const MAX_STARS = 10;

	const onRatingValueChange = newValue => {
		dispatch({
			type: "RATING_VALUE_CHANGE",
			value: newValue,
		});
	};

	// Poll 종류가 N지선다 일때 중복선택 옵션을 체크하는 부분
	const onDuplicationChange = event => {
		dispatch({
			type: "DUPLICATION_CHANGE",
			value: event.target.checked,
		});
	};

	const getSelectionType = () =>
		(pollType === "rating" ? ratingValue.toString() : selectionType);

	const getCandidates = (pollType, selectionType) => {
		if (pollType === "rating") {
			return new Array(ratingValue);
		}

		if (selectionType === "date") {
			return dates.map(
				date =>
					`${date.getFullYear()}년 
					${date.getMonth() + 1}월 
					${date.getDate()}일`,
			);
		}
		return texts.map(text => text.value);
	};

	// createPoll()을 호출하기 전에 입력 항목들이 empty가 아닌지 체크함
	const checkValidity = () => {
		let result = true;

		if (pollName.value.length === 0) {
			result = false;
		}

		if (pollName.value.length === 0) {
			dispatch({
				type: "POLL_NAME_CHANGE",
				value: {
					...pollName,
					error: true,
					helperText: "투표 제목을 입력하세요",
				},
			});
		} else {
			dispatch({
				type: "POLL_NAME_CHANGE",
				value: {
					...pollName,
					error: false,
					helperText: "",
				},
			});
		}

		// 별점매기기의 경우는 투표제목만 입력되면 validity가 통과됨
		if (pollType === "rating") {
			return result;
		}

		// N지선다형의 date 인 경우, 기본값이 입력되어 있으므로 투표제목만 확인함
		if (selectionType === "date") {
			return result;
		}

		// 별점이 아닌 N지선다형의 text인경우에만 계속 validity를 진행함
		if (!texts.every(text => text.value.length > 0)) {
			dispatch({
				type: "TEXT_CHECK",
			});
			result = false;
		}

		return result;
	};

	const onCreatePoll = () => {
		if (!checkValidity()) {
			return;
		}
		const newPoll = {};

		newPoll.EventId = EventId;
		newPoll.pollName = pollName.value;
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
						onChange={onRatingValueChange}
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
