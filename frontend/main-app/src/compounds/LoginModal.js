import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const ModalStyle = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LoginStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 280px;
	height: 250px;
	background-color: white;
	border: 1px solid #ced4da;
	border-radius: 8px;
	z-index: 9;
	box-shadow: 2px 5px 5px 0px rgba(0, 0, 0, 0.75);
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

function LoginModal({onHideModal}) {
	return (
		<ModalStyle>
			<LoginStyle>
				<LoginImageStyle src="naver.png" onClick={onHideModal} />
				<LoginImageStyle src="google.png" onClick={onHideModal} />

				<StyledButton
					variant="contained"
					color="secondary"
					type="button"
					onClick={onHideModal}
				>
					취소
				</StyledButton>
			</LoginStyle>
		</ModalStyle>
	);
}

export default LoginModal;
