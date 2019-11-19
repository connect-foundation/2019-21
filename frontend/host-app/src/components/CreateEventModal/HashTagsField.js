import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		padding: theme.spacing(0.5),
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}));

function HashTagField(props) {
	const classes = useStyles();
	const handleDelete = hashTagToDelete => () => {
		const deletedHashTagList = props.hashTags.filter(
			hashTag => hashTag.key !== hashTagToDelete.key,
		);

		props.dispatch(deletedHashTagList);
	};

	return (
		<Paper>
			{props.hashTags.map(data => (
				<Chip
					key={data.key}
					label={data.label}
					className={classes.chip}
					onDelete={handleDelete(data)}
				/>
			))}
		</Paper>
	);
}

export default HashTagField;
