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
	const {hashTags, dispatch} = props;
	const deleteHashTag = hashTagToDelete => () => {
		const deletedHashTagList = hashTags.filter(
			hashTag => hashTag.key !== hashTagToDelete.key,
		);

		dispatch({
			type: "SET_PROPERTY",
			property: "hashTags",
			value: deletedHashTagList,
		});
	};

	return (
		<MyPaper>
			{hashTags.map(data => (
				<CustomChip
					icon={<BookmarkBorderRounded />}
					color="primary"
					variant="outlined"
					key={data.key}
					label={data.label}
					onDelete={deleteHashTag(data)}
				/>
			))}
		</MyPaper>
	);
}

export default HashTagField;
