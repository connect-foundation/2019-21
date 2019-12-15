import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import randomMC from "random-material-color";
import PersonIcon from "@material-ui/icons/Person";

// todo: 컴포넌트 다른 파일로 분리
function NamedAvatar({userName, remainder}) {
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
	const inner = remainder ? `+${remainder}` : userName.slice(0, 1);

	return <Avatar className={classes.randomAvatar}>{inner}</Avatar>;
}

// todo: 컴포넌트 다른 파일로 분리
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
	const {isAnonymous = false, userName = "Anonymous", remainder} = props;

	return isAnonymous ? (
		<AnonymousAvatar {...{remainder}} />
	) : (
		<NamedAvatar {...{userName, remainder}} />
	);
}

ReplyAvatar.propTypes = {
	userName: PropTypes.string,
	isAnonymous: PropTypes.bool,
	remainder: PropTypes.any,
};

export default ReplyAvatar;
