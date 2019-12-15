import React from "react";
import styled from "styled-components";
import useModal from "../../../hooks/useModal.js";
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

	// todo 버튼은 common buttons의 버튼으로 교체할수 있음
	return (
		<Container>
			<CancelTextButton onClick={handleOpen}>취소</CancelTextButton>
			<CreateTextButton onClick={submit}>저장</CreateTextButton>
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
