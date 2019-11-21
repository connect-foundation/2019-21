import React from "react";
import {styled} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import {BookmarkBorderRounded} from "@material-ui/icons";

const MyPaper = styled(Paper)({
	marginTop: 10,
	overflowY: "auto",
	width: 400,
});

const CustomChip = styled(Chip)({
	margin: 5,
});

function HashTagField(props) {
	const handleDelete = hashTagToDelete => () => {
		const deletedHashTagList = props.hashTags.filter(
			hashTag => hashTag.key !== hashTagToDelete.key,
		);

		props.dispatch(deletedHashTagList);
	};

	return (
		<MyPaper>
			{props.hashTags.map(data => (
				<CustomChip
					icon={<BookmarkBorderRounded />}
					color="primary"
					variant="outlined"
					key={data.key}
					label={data.label}
					onDelete={handleDelete(data)}
				/>
			))}
		</MyPaper>
	);
}

export default HashTagField;
