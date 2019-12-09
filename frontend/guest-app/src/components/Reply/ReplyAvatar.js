import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import randomMC from "random-material-color";
import PersonIcon from "@material-ui/icons/Person";

function NamedAvatar({userName, remainReplies}) {
	const useStyles = makeStyles({
		randomAvatar: {
			width: "1.5rem",
			height: "1.5rem",
			backgroundColor: randomMC.getColor({text: userName}),
			fontSize: "0.5rem",
			marginLeft: 5,
		},
	});
	const classes = useStyles();
	const inner = remainReplies ? `+${remainReplies}` : userName.slice(0, 1);

	return <Avatar className={classes.randomAvatar}>{inner}</Avatar>;
}

function AnonymousAvatar() {
	const useStyles = makeStyles({
		avatar: {
			margin: 10,
			width: "1.5rem",
			height: "1.5rem",
			fontSize: "0.5rem",
		},
	});
	const classes = useStyles();
	return (
		<Avatar className={classes.avatar}>
			<PersonIcon />
		</Avatar>
	);
}

function ReplyAvatar(props) {
	const {isAnonymous = false, userName = "Anonymous", remainReplies} = props;
	return isAnonymous ? (
		<AnonymousAvatar {...{remainReplies}} />
	) : (
		<NamedAvatar {...{userName, remainReplies}} />
	);
}

ReplyAvatar.propTypes = {
	userName: PropTypes.string,
	isAnonymous: PropTypes.bool,
};

export default ReplyAvatar;
