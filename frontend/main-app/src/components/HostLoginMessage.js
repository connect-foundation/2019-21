import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import config from "../config";

const HostLoginMessageStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: right;
	margin-bottom: 2rem;
	height: 4rem;
	div {
		margin-bottom: 0.5rem;
	}
`;

const LoginButton = withStyles({
	root: {
		width: "150px",
		height: "34px",
		backgroundImage: "url(google.png)",
		backgroundSize: "cover",
	},
})(Button);

function HostLoginMessage() {
	return (
		<HostLoginMessageStyle>
			<div>이벤트를 만들려면, 로그인 해주세요.</div>
			<LoginButton href={config.authLoginURL} />
		</HostLoginMessageStyle>
	);
}

export default HostLoginMessage;
