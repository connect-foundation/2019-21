import React from "react";
import Switch from "@material-ui/core/Switch";
import styled from "styled-components";


const TitleBox = styled.div`
	display:flex;
	align-items: center;
`;

const TitleStyle = styled.div`
	font-weight: bold;
`;

function SwitchTitle({type}) {
	const [state, setState] = React.useState(false);

	const handleChange = event => {
		setState(event.target.checked);
	};

	return (
		<TitleBox>
			<TitleStyle>질문 검열</TitleStyle>
			<Switch
				checked={state}
				onChange={handleChange}
			>
			</Switch>
		</TitleBox>
	);
}

export default SwitchTitle;
