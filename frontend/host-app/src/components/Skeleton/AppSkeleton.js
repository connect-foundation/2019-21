import React from "react";
import {Skeleton} from "@material-ui/lab";
import SkeletonTitle from "./SkeletonTitle.js";
import SkeletonContent from "./SkeletonContent.js";

function AppSkeleton() {
	return (
		<Skeleton>
			<SkeletonTitle/>
			<SkeletonContent/>
		</Skeleton>
	);
}

export default AppSkeleton;
