import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

// todo 명확한 이름
const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	flex: 1;
	width: 80%;
	box-sizing: border-box;
	padding: 1rem 0 0 0;
	border: ${props => (props.border ? "1px solid #adb5bd" : "none")};
`;

// todo 명확한 이름
const RowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	height: ${props => (props.thin ? "1.5rem" : "4rem")};
	padding: 0.5rem;
	box-sizing: border-box;
	border: ${props => (props.border ? "1px solid #adb5bd" : "none")};
`;

// todo prop type
function ActiveRating({
	id,
	rated,
	ratingValue,
	max,
	state,
	onChange,
	onCancelRating,
}) {
	// todo 컴포넌트 쪼개기
	return (
		<ColumnWrapper>
			<RowWrapper thin>
				{!rated && "별 갯수로 평가해주세요"}
				{rated && `투표했음: ${ratingValue}점`}
			</RowWrapper>
			<RowWrapper>
				<Rating
					readOnly={rated}
					name={id.toString()}
					value={ratingValue}
					max={max}
					onChange={(_, newValue) => {
						onChange(newValue, state, id);
					}}
				/>
			</RowWrapper>
			<RowWrapper>
				<Button
					disabled={!rated}
					variant="contained"
					color="default"
					onClick={() => onCancelRating(id, state)}
				>
					투표 취소
				</Button>
			</RowWrapper>
		</ColumnWrapper>
	);
}

export default ActiveRating;
