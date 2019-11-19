import React, {useState} from "react";
import styled from "styled-components";
import {Button, Modal} from "@material-ui/core";
import PollName from "./PollName";
import PollType from "./PollType";
import NItems from "./NItems";
import RatingBlock from "./RatingBlock";

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


function NewPollModal() {
	// Poll 이름
	const [pollName, setPollName] = useState("");
	const handlePollNameChange = event => {
		setPollName(event.target.value);
	};

	// Poll 종류
	const [pollType, setPollType] = useState("nItems");
	const handlePollTypeChange = event => {
		setPollType(event.target.value);
	};

	// Poll 종류가 N지선다 일때, 항목들의 속성이 text 인지 date 인지 선택
	const [selectionType, setSelectionType] = useState("text");
	const handleSelectionTypeChange = event => {
		setSelectionType(event.target.value);
	};

	// Poll 종류가 별점 일때
	const [ratingValue, setRatingValue] = useState(5);

	// Poll 종류가 N지선다 이고 항목들의 속성이 text일때 항목들을 관리하는 부분
	const [selectionItems, setSelectionItems] = useState(["", ""]);
	const handleSelectionItemChange = (event, id) => {
		setSelectionItems(
			selectionItems.map(
				(item, index) => (index === id ? event.target.value : item),
			),
		);
	};

	const onAddItem = () => {
		setSelectionItems([...selectionItems, ""]);
	};

	const onRemoveItem = id => {
		setSelectionItems(
			selectionItems.filter(
				(item, index) => (index !== id),
			),
		);
	};

	// Poll 종류가 N지선다 이고 항목들의 속성이 date일때 항목들을 관리하는 부분
	const initialDates = [];
	const now = Date.now();

	initialDates.push(now);
	initialDates.push(now);

	const [selectionDates, setSelectionDates] = useState(initialDates);
	const handleSelectionDateChange = (newDate, id) => {
		setSelectionDates(
			selectionDates.map(
				(date, index) => (index === id ? newDate : date),
			),
		);
	};

	const onAddDate = () => {
		setSelectionDates([...selectionDates, Date.now()]);
	};

	const onRemoveDate = id => {
		setSelectionDates(
			selectionDates.filter(
				(date, index) => (index !== id),
			),
		);
	};

	return (
		<Modal
			open
			style={{display: "flex", justifyContent: "center", alignItems: "center"}}
		>
			<ModalWrapper>
				<h2>투표 만들기</h2>
				<PollName
					value={pollName}
					onChange={handlePollNameChange}
				/>
				<PollType
					pollType={pollType}
					onChange={handlePollTypeChange}
				/>
				{pollType === "nItems" ?
					<NItems
						items={selectionItems}
						dates={selectionDates}
						selectionType={selectionType}
						onChange={handleSelectionTypeChange}
						handleSelectionItemChange={handleSelectionItemChange}
						handleSelectionDateChange={handleSelectionDateChange}
						onAddItem={onAddItem}
						onRemoveItem={onRemoveItem}
						onAddDate={onAddDate}
						onRemoveDate={onRemoveDate}
					/> :
					<RatingBlock
						ratingValue={ratingValue}
						onChange={setRatingValue}
					/>
				}
				<RowWrapper>
					<Button
						variant="contained"
						color="primary"
					>
						확인
					</Button>
					<Button
						variant="contained"
						color="secondary"
					>
						취소
					</Button>
				</RowWrapper>
			</ModalWrapper>
		</Modal>
	);
}

export default NewPollModal;
