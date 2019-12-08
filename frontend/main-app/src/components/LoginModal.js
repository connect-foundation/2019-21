import React from "react";
import styled from "styled-components";
import { Button, Modal } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import configLoader from "../config/configLoader.js";

const config = configLoader();

const LoginStyle = styled.div`
	position: relative;
	top: calc(50% - 150px);
	left: calc(50% - 150px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 300px;
	height: 300px;
	background-color: white;
`;

const LoginImageStyle = styled.img`
	width: 200px;
	margin-bottom: 1rem;
	&:hover {
		cursor: pointer;
	}
`;

const StyledButton = withStyles({
	root: {
		width: "200px",
		fontSize: "1.2rem",
	},
})(Button);

function LoginModal({ onHideModal, googleLogin }) {
	return (
		<Modal open onClose={onHideModal}>
			<LoginStyle>
				<a href={config.authLoginURL}>
					<LoginImageStyle src="google.png" />
				</a>

				<StyledButton
					variant="contained"
					color="secondary"
					type="button"
					onClick={onHideModal}
				>
					취소
				</StyledButton>
			</LoginStyle>
		</Modal>
	);
}

export default LoginModal;
