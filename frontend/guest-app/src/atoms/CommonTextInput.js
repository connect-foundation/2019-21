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

// todo 사용하지 않는다면 삭제
function CommonTextInput({label, value, icon = null, onChange = () => {}, inputRef}) {
	const inputStyles = useInputStyles();

	const InputProps = icon ?
		{
			startAdornment: (
				<InputAdornment position="start">{icon}</InputAdornment>
			),
		} :
		undefined;

	return (
		<TextField
			className={inputStyles.textField}
			label={label}
			value={value}
			margin="normal"
			onChange={onChange}
			InputProps={InputProps}
			inputRef={inputRef}
		/>
	);
}

export default CommonTextInput;
