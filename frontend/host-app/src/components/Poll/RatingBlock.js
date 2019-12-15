import React from "react";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";

// todo : 명확한 이름
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

// todo : 명확한 이름
// todo: prop type 추가
function RatingBlock({ratingValue, maxValue, onChange}) {

	// todo text는 material typography 로 변경
	// todo 컴포넌트 쪼개기
	return (
		<ColumnWrapper>
			별점 최대값을 정해주세요.
			<div>
				<Rating
					name="simple-controlled"
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
