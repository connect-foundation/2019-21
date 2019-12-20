import React from "react";
import Typography from "@material-ui/core/Typography";
import EventCreateButton from "../Event/EventCreateButton.js";
import CreateEventModal from "../CreateEventModal/CreateEventModal";
import useModal from "../../customhook/useModal";
import {EmptyContentBox, EmptyContentDiv} from "./ComponentsStyle";

function EmptyContent(props) {
	const {value, index} = props;
	const [eventModalOpen, handleOpen, handleClose] = useModal();

	return (
		<>
			{index === value && (
				<EmptyContentBox>
					<EmptyContentDiv>
						<Typography>현재 진행중인 이벤트가 없습니다</Typography>

						<EventCreateButton onClick={handleOpen} />
						{eventModalOpen && (
							<CreateEventModal
								open={eventModalOpen}
								handleClose={handleClose}
							/>
						)}
					</EmptyContentDiv>
				</EmptyContentBox>
			)}
		</>
	);
}

export default EmptyContent;
