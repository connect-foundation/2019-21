import React from "react";
import styled from "styled-components";
import {Radio} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const RowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	min-height: 60px;
	padding: 0 2rem;
	box-sizing: border-box;
	.label {
		margin-right: 1rem;
	}
`;

function PollType({pollType, onChange}) {
	return (
		<RowWrapper left>
			<span className="label">투표 종류 :</span>
			<FormControlLabel
				value="nItems"
				control={
					<Radio
						checked={pollType === "nItems"}
						onChange={onChange}
					/>
				}
				label="N지선다"
			/>

			<FormControlLabel
				value="rating"
				control={
					<Radio
						checked={pollType === "rating"}
						onChange={onChange}
					/>
				}
				label="별점"
			/>
		</RowWrapper>
	);
}

export default PollType;
