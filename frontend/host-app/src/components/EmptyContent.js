import React from "react";
import Typography from "@material-ui/core/Typography";
import EventCreateButton from "./Event/EventCreateButton.js";
import {Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import CreateEventModal from "./CreateEventModal/CreateEventModal";
import useModal from "../customhook/useModal";
import {EmptyContentBox, EmptyContentDiv} from "./ComponentsStyle";

const StyledButton = withStyles({
	root: {
		width: "300px",
		fontSize: "1.4rem",
	},
})(Button);

function EmptyContent() {
	const [eventModalOpen, handleOpen, handleClose] = useModal();

	return (
		<EmptyContentBox>
			<EmptyContentDiv>
				<Typography>현재 진행중인 이벤트가 없습니다</Typography>

				<EventCreateButton onClick={handleOpen} />
				{/* 현재 진행중인 이벤트가 없습니다
				<StyledButton
					size="large"
					variant="contained"
					color="primary"
					onClick={handleOpen}
				>
					이벤트 만들기
				</StyledButton> */}
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
