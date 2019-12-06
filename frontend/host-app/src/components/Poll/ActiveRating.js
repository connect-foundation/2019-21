import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	flex: 1;
	width: 80%;
	box-sizing: border-box;
`;

const RowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	height: ${props => (props.thin ? "1.5rem" : "4rem")};
	padding: 0.5rem;
	box-sizing: border-box;
	border: ${props => (props.border ? "1px solid #dee2e6" : "none")};
`;

function ActiveRating({
	voted,
	value,
	maxStars,
	state,
	onChange,
	onCancelRating,
}) {
	return (
		<ColumnWrapper>
			<RowWrapper left thin>
				{voted && `투표했음: ${value}점`}
			</RowWrapper>
			<RowWrapper>
				<Rating
					name="simple-controlled"
					value={value}
					max={maxStars}
					onChange={(_, newValue) => {
						onChange(newValue, state);
					}}
				/>
			</RowWrapper>
			<RowWrapper border>
				<Button
					variant="contained"
					color="default"
					onClick={onCancelRating}
				>
					투표 취소
				</Button>
			</RowWrapper>
		</ColumnWrapper>
	);
}

export default ActiveRating;
