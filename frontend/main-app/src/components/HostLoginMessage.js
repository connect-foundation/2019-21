import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import config from "../config";

const HostLoginMessageStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	text-align: right;
	// padding: 1rem 40px;
	margin: 1rem 2rem;
	height: 3rem;
	span {
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
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
			이벤트를 만드려면, 로그인
			<LoginButton href={config.authLoginURL}/>
			해주세요.
		</HostLoginMessageStyle>
	);
}

export default HostLoginMessage;
