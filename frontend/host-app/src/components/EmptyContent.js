import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import CreateEventModal from "../components/CreateEventModal/CreateEventModal";

const EmptyContentBox = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: auto;
	align-items: center;
	border-radius: 8px;
	background-color: #f1f3f5;
	border: 1px solid #e9ecef;
	height: 100%;
	box-sizing: border-box;
`;

const EmptyContentDiv = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 2rem;
	margin: auto 0;
`;

function Column() {
	const [modalOpen, setModalOpen] = React.useState(false);
	const handleOpen = () => {
		setModalOpen(true);
	};

	const handleClose = () => {
		setModalOpen(false);
	};

	return (
		<EmptyContentBox>
			<EmptyContentDiv>
				현재 진행중인 이벤트가 없습니다
				<Button
					size="medium"
					variant="contained"
					color="primary"
					onClick={handleOpen}
				>
					이벤트 만들기
				</Button>
				{modalOpen && (
					<CreateEventModal
						open={modalOpen}
						handleClose={handleClose}
					/>
				)}
			</EmptyContentDiv>
		</EmptyContentBox>
	);
}

export default Column;
