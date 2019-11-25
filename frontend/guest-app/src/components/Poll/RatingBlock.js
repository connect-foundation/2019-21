import React from "react";
import Rating from "@material-ui/lab/Rating";
import styled from "styled-components";

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

function RatingBlock({maxStars, value, active}) {
	return (
		<ColumnWrapper>
			{active ? (
				<Rating
					value={value}
					max={maxStars}
					// onChange={(event, newValue) => { onChange(newValue); }}
				/>
			) : (
				<Rating
					readOnly
					value={value}
					max={maxStars}
					// onChange={(event, newValue) => { onChange(newValue); }}
				/>
			)}
		</ColumnWrapper>
	);
}

export default RatingBlock;
