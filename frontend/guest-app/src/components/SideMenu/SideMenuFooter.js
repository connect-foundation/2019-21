import React from "react";
import Image from "react-image";
import Grid from "@material-ui/core/Grid";

function SideMenuFooter() {
	return (
		<Grid
			container
			justify={"center"}
			style={{position: "absolute", bottom: "1rem"}}
		>
			<Image
				src={`${process.env.PUBLIC_URL}/logo_vaagle(transparent).png`}
				style={{width: "100px", height: "auto"}}
			/>
		</Grid>
	);
}

export default SideMenuFooter;
