import React from "react";
import styled from "styled-components";
import useModal from "../../../customhook/useModal";
import ConfirmModal from "./ConfirmModal";

const Container = styled.div`
	margin-top: auto;
	display: flex;
	margin-left: 10rem;
`;

const CancelTextButton = styled.div`
	font-size: 1.25rem;
	color: balck;
	:hover {
		font-weight: bold;
	}
	width: auto;
	cursor: pointer;
	margin: 1rem;
`;

const CreateTextButton = styled.div`
	font-size: 1.25rem;
	color: green;
	:hover {
		font-weight: bold;
	}
	width: auto;
	cursor: pointer;
	margin: 1rem;
`;

function ButtonField({submit, onClose}) {
	const [confirmModalOpen, handleOpen, handleClose] = useModal();

	return (
		<Container>
			<CancelTextButton onClick={handleOpen}>취소</CancelTextButton>
			<CreateTextButton onClick={submit}>확인</CreateTextButton>
			{confirmModalOpen && (
				<ConfirmModal
					open={confirmModalOpen}
					handleClose={handleClose}
					reset={onClose}
				/>
			)}
		</Container>
	);
}

export default ButtonField;
