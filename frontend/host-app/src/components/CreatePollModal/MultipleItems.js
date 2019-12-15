import React from "react";
import styled from "styled-components";
import SelectionType from "./SelectionType.js";
import TextItems from "./TextItems.js";
import DateItems from "./DateItems.js";

// todo: 좀더 명확한 이름
const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 0 0.5rem 0.5rem 1rem;
	box-sizing: border-box;
	border: 1px solid #adb5bd;
	width: 320px;
	min-height: 210px;
`;

// todo: prop type default prop 추가
// todo: 좀더 명확한 이름
function MultipleItems({
	selectionType,
	onChange,
	texts,
	onTextChange,
	onAddText,
	onDeleteText,
	dates,
	onDateChange,
	onAddDate,
	onDeleteDate,
}) {
	return (
		<ColumnWrapper>
			<SelectionType selectionType={selectionType} onChange={onChange} />
			{selectionType === "text" && (
				<TextItems
					texts={texts}
					onTextChange={onTextChange}
					onDeleteText={onDeleteText}
					onAddText={onAddText}
				/>
			)}
			{selectionType === "date" && (
				<DateItems
					dates={dates}
					onDateChange={onDateChange}
					onDeleteDate={onDeleteDate}
					onAddDate={onAddDate}
				/>
			)}
		</ColumnWrapper>
	);
}

export default MultipleItems;
