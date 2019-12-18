import React from "react";
import {styled} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

const CustomTypography = styled(Typography)({
	marginTop: "0.6rem",
	color: "#A8A8A8",
	fontSize: "0.8rem",
});

const MyPaper = styled(Paper)({
	marginTop: "0.6rem",
	overflowY: "auto",
	height: "4.5rem",
	width: "25rem",
});

const CustomChip = styled(Chip)({
	margin: "0.3rem",
});

function HashTagsField(props) {
	const {hashTags, dispatch} = props;

	return (
		<>
			<CustomTypography variant="subtitle1">해시태그</CustomTypography>
			<MyPaper>
				{hashTags.map(data => (
					<CustomChip
						icon={<LocalOfferIcon />}
						color="primary"
						variant="outlined"
						key={data.key}
						label={data.label}
					/>
				))}
			</MyPaper>
		</>
	);
}

export default HashTagsField;
