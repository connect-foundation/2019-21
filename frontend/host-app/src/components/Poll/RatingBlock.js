import React from "react";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";

const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	flex: 1;
	width: 80%;
	padding: 1rem;
	box-sizing: border-box;
	border: 1px solid gray;
`;

function RatingBlock({ratingValue, maxValue, onChange}) {
	return (
		<ColumnWrapper>
			별점 최대값을 정해주세요.
			<div>
				<Rating
					value={ratingValue}
					max={maxValue}
					onChange={(_, newValue) => {
						onChange(newValue);
					}}
				/>
			</div>
		</ColumnWrapper>
	);
}

export default RatingBlock;
