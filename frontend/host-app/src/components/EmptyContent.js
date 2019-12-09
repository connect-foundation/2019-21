import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import CreateEventModal from "./CreateEventModal/CreateEventModal";
import useModal from "../customhook/useModal";
import {EmptyContentBox, EmptyContentDiv} from "./ComponentsStyle";

function EmptyContent() {
	const [eventModalOpen, handleOpen, handleClose] = useModal();

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
				{eventModalOpen && (
					<CreateEventModal
						open={eventModalOpen}
						handleClose={handleClose}
					/>
				)}
			</EmptyContentDiv>
		</EmptyContentBox>
	);
}

export default EmptyContent;
