import React from "react";

export function UserIcon(props) {
	return <i className="fas fa-user">{props.children}</i>;
}

export function QuestionIcon(props) {
	return <i className="fas fa-comment-dots">{props.children}</i>;
}

export function LogoutIcon(props) {
	return <i className="fas fa-sign-out-alt">{props.children}</i>;
}

export function MenuIcon(props) {
	return <i className="fas fa-bars">{props.children}</i>;
}

export function LikeIcon(props) {
	return <i className="far fa-thumbs-up">{props.children}</i>;
}

export function CompanyIcon(props) {
	return <i className="far fa-building">{props.children}</i>;
}

export function EmailIcon(props) {
	return <i className="far fa-envelope">{props.children}</i>;
}

export function PollIcon(props) {
	return <i className="fas fa-poll">{props.children}</i>;
}
