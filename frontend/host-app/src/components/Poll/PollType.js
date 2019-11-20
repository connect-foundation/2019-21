import React from "react";
import styled from "styled-components";
import {Radio} from "@material-ui/core";

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

function PollType({pollType, onChange}) {
	return (<RowWrapper left>
		<span>투표 종류 :</span>
		<Radio
			checked={pollType === "nItems"}
			onChange={onChange}
			value="nItems"
			id="nItems"
		/>
		<label for="nItems">N지선다</label>
		<Radio
			checked={pollType === "rating"}
			onChange={onChange}
			value="rating"
			id="rating"
		/>
		<label for="rating">별점</label>
	</RowWrapper>);
}

export default PollType;
