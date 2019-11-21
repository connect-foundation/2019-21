import React from "react";
import {styled} from "@material-ui/core/styles";
import {Switch, Box} from "@material-ui/core";

const SwitchBox = styled(Box)({
	marginTop: 20,
	display: "flex",
});

export default function SettingSwitch(props) {
	const {state, dispatch, children} = props;

	return (
		<SwitchBox>
			{children}
			<Switch
				checked={state}
				onChange={dispatch}
				value={children}
				color="primary"
				inputProps={{"aria-label": "state checkbox"}}
			/>
		</SwitchBox>
	);
}
