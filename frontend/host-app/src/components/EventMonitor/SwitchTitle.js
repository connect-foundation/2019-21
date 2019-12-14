import React, {useContext} from "react";
import Switch from "@material-ui/core/Switch";
import Badge from "@material-ui/core/Badge";
import {makeStyles} from "@material-ui/core";
import {socketClient, useSocket} from "../../libs/socket.io-Client-wrapper.js";
import {HostContext} from "../../libs/hostContext.js";
import {BoldTitleStyle} from "../StyledComponent/ComponentsStyle.js";
import TitleBox from "../StyledComponent/TitleBox.js";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2),
	},
}));

function SwitchTitle({titleName, state, stateHandler, data}) {
	const {events} = useContext(HostContext);
	const classes = useStyles();
	const eventId = events[0].id;

	const moderationEventEmit = () =>
		socketClient.emit("moderation/toggle", {eventId, state: !state});

	useSocket("moderation/toggle", req => {
		stateHandler(req.state);
	});

	return (
		<TitleBox>
			<Badge
				color="secondary"
				badgeContent={data.length}
				showZero
				className={classes.margin}
				children={undefined}
			/>
			<BoldTitleStyle>{titleName}</BoldTitleStyle>
			<Switch checked={state} onClick={() => moderationEventEmit()} />
		</TitleBox>
	);
}

export default SwitchTitle;
