import React from "react";
import {makeStyles, styled} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const MyPaper = styled(Paper)({
	display: "flex",
	flexDirection: "column",
	flex: 1,
	overflowY: "auto",
	width: 400,
});

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		padding: theme.spacing(0.5),
	},
	chip: {
		margin: theme.spacing(0.5),
		maxWidth: 400,
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
		<MyPaper>
			{props.hashTags.map(data => (
				<Chip
					key={data.key}
					label={data.label}
					className={classes.chip}
					onDelete={handleDelete(data)}
				/>
			))}
		</MyPaper>
	);
}

export default HashTagField;
