import React from "react";
import {Skeleton} from "@material-ui/lab";

function SkeletonTitle() {
	return (
		<>
			<Skeleton variant="rect" width={1500} height={56}/>
			<Skeleton variant="text" width={550} height={6}/>
			<Skeleton variant="text" width={550} height={6}/>
		</>
	);
}

export default SkeletonTitle;
