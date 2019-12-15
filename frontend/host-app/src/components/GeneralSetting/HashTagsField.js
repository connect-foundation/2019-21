import React from "react";
import {styled} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import {BookmarkBorderRounded} from "@material-ui/icons";

const MyPaper = styled(Paper)({
	marginTop: "0.6rem",
	overflowY: "auto",
	height: "4.5rem",
	width: "25rem",
});

const CustomChip = styled(Chip)({
	margin: "0.3rem",
});

// todo proptype default prop 추가
function HashTagsField(props) {
	const {hashTags, dispatch} = props;
	const handleDelete = hashTagToDelete => () => {
		const deletedHashTagList = hashTags.filter(
			hashTag => hashTag.key !== hashTagToDelete.key,
		);

		dispatch(deletedHashTagList);
	};

	// todo CustomChip은 독립적은 컴포넌트로 분리 가능
	return (
		<MyPaper>
			{hashTags.map(data => (
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

export default HashTagsField;
