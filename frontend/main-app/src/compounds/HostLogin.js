import React from "react";
import styled from "styled-components";

const HostLoginStyle = styled.div`
	text-align: right;
	padding: 1rem 40px;
`;

function HostLogin() {
	return (
		<HostLoginStyle>
			이벤트를 생성하려면 <a href="">로그인</a> 해주세요.
		</HostLoginStyle>
	);
}

export default HostLogin;
