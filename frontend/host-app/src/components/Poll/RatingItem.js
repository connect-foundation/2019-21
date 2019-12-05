import React from "react";
import Rating from "@material-ui/lab/Rating";
import styled from "styled-components";
import ActiveRating from "./ActiveRating";

const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	flex: 1;
	width: 80%;
	padding: 1rem;
	box-sizing: border-box;
	border: 1px solid #dee2e6; /* Gray3 */
`;

function RatingItem({ nItems, state, onChange, onCancelRating }) {
	return (
		<ColumnWrapper>
			{state === "running" ? (
				<ActiveRating
					{...nItems[0]}
					state={state}
					onChange={onChange}
					onCancelRating={onCancelRating}
				/>
			) : (
				<Rating
					readOnly
					value={nItems[0].value}
					max={nItems[0].maxStars}
				/>
			)}
		</ColumnWrapper>
	);
}

export default RatingItem;
