import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import makeStyles from "@material-ui/core/styles/makeStyles.js";
import {UserIcon} from "../../FontAwesomeIcons.js";

const useInputStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));

function TextInput({label, value, icon, onChange}) {
	const inputStyles = useInputStyles();

	return (
		<TextField
			className={inputStyles.textField}
			label={label}
			value={value}
			margin="normal"
			onChange={onChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						{icon || <UserIcon />}
					</InputAdornment>
				),
			}}
		/>
	);
}

export default TextInput;
