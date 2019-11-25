import React, {useState} from "react";
import styled from "styled-components";
import PollCard from "./PollCard";
import PollDummyData from "./PollDummyData";

const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	border: 1px solid #dee2e6; /* Gray3 */
	padding: 1rem;
	width: 100%;
`;

function PollContainer() {
	const initialPollData = PollDummyData();
	const [pollData] = useState(initialPollData);

	return (
		<ColumnWrapper>
			{pollData.map((poll, index) => (
				<PollCard {...poll} key={index} />
			))}
		</ColumnWrapper>
	);
}

export default PollContainer;
