import React from "react";
import Radio from "@material-ui/core/Radio";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import {makeStyles} from "@material-ui/core/styles";

const TitleBox = styled.div`
	display:flex;
	align-items: center;
	width:100%;
	justify-content:space-between;
`;

const TitleStyle = styled.div`
	font-weight: bold;
`;

const useStyles = makeStyles(theme => ({

	margin: {
		margin: theme.spacing(2),
	},
}
));

function SwitchTitle({titleName}) {
	const [state, setState] = React.useState("a");

	const handleChange = event => {
		setState(event.target.value);
	};

	const classes = useStyles();

	return (
		<TitleBox>
			<Badge
				color="secondary"
				badgeContent={0}
				showZero
				className={classes.margin}
			/>
			<TitleStyle>{titleName}</TitleStyle>
			<Radio
				checked={state === "a"}
				onChange={handleChange}
				value="a"
				name="radio-button-demo"
				inputProps={{"aria-label": "A"}}
			/>
		</TitleBox>
	);
}

export default SwitchTitle;
