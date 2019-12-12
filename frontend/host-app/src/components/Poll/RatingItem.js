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
	border: 1px solid #dee2e6; /* Gray3 */
`;

const RowWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

function RatingItem({nItems, state, selectionType}) {
	return (
		<ColumnWrapper>
			{state !== "standby" && // running, closed 일때 동일하게 보여야함
				nItems.map((item, index) => (
					<RowWrapper key={index}>
						<div>{item.voters}</div>
						<Rating
							readOnly
							value={+item.content}
							max={nItems.length}
							size="small"
						/>
					</RowWrapper>
				))}
			{state === "standby" && (
				<>
					<div>{`최대 별점갯수: ${selectionType}`}</div>
					<Rating readOnly value={0} max={nItems.length} />
				</>
			)}
		</ColumnWrapper>
	);
}

export default RatingItem;
