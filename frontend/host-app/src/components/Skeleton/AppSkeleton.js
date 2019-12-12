import React from "react";
import {Skeleton} from "@material-ui/lab";
import SkeletonTitle from "./SkeletionTitle.js";
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
