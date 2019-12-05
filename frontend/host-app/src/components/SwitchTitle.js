import React, {useContext} from "react";
import Switch from "@material-ui/core/Switch";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import {makeStyles} from "@material-ui/core";
import {socketClient, useSocket} from "../libs/socket.io-Client-wrapper";
import {HostContext} from "../libs/hostContext";

const TitleBox = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-around;
`;

const TitleStyle = styled.div`
	font-weight: bold;
`;

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2),
	},
}));

function SwitchTitle({titleName, state, stateHandler, badgeState}) {
	const {events} = useContext(HostContext);
	const classes = useStyles();
	const eventId = events[0].id; // dummyEventId

	const moderationEventEmit = () =>
		socketClient.emit("moderation/toggle", {eventId, state: !state});

	useSocket("moderation/toggle", req => {
		console.log(req);
		stateHandler(req.state);
	});

	return (
		<TitleBox>
			<Badge
				color="secondary"
				badgeContent={badgeState[0]}
				showZero
				className={classes.margin}
			/>
			<TitleStyle>{titleName}</TitleStyle>
			<Switch
				checked={state}
				onClick={() => moderationEventEmit()}
			></Switch>
		</TitleBox>
	);
}

export default SwitchTitle;
