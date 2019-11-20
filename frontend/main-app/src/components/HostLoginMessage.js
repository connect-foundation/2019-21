import React from "react";
import styled from "styled-components";

const HostLoginMessageStyle = styled.div`
	text-align: right;
	padding: 1rem 40px;
	span {
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
`;

function HostLoginMessage({onShowModal}) {
	return (
		<HostLoginMessageStyle>
			이벤트를 만드려면,{" "}
			<span onClick={onShowModal}>
				<b>로그인</b>
			</span>
			해주세요.
		</HostLoginMessageStyle>
	);
}

export default HostLoginMessage;
