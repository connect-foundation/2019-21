import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import makeStyles from "@material-ui/core/styles/makeStyles.js";

const useInputStyles = makeStyles(theme => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));

function TextInput({label, value, icon = null, onChange = () => {}, inputRef}) {
	const inputStyles = useInputStyles();

	return (
		<TextField
			className={inputStyles.textField}
			label={label}
			value={value}
			margin="normal"
			onChange={onChange}
			InputProps={
				icon ?
					{
						startAdornment: (
							<InputAdornment position="start">
								{icon}
							</InputAdornment>
						),
					} :
					undefined
			}
			inputRef={inputRef}
		/>
	);
}

export default TextInput;
