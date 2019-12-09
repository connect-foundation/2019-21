import React from "react";

export default function ErrorPage() {
	return (
		<div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
			<img
				src={"https://img.memecdn.com/morphius-404_o_1938383.webp"}
				alt={
					"morphius said: what if i told you that page dosen't exist"
				}
			/>
		</div>
	);
}
