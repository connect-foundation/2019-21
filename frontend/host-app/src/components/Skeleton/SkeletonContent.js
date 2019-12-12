import {Skeleton} from "@material-ui/lab";
import React from "react";
import {ContentStyle, SkeletonColumnStyle} from "../ComponentsStyle.js";

function SkeletonContent() {
	return (
		<ContentStyle>
			<SkeletonColumnStyle>
				<Skeleton variant="rect" width={318} height={817} />
			</SkeletonColumnStyle>
			<SkeletonColumnStyle>
				<Skeleton variant="rect" width={318} height={817} />
			</SkeletonColumnStyle>
			<SkeletonColumnStyle>
				<Skeleton variant="rect" width={318} height={817} />
			</SkeletonColumnStyle>
			<SkeletonColumnStyle>
				<Skeleton variant="rect" width={318} height={817} />
			</SkeletonColumnStyle>
			<SkeletonColumnStyle>
				<Skeleton variant="rect" width={318} height={817} />
			</SkeletonColumnStyle>
		</ContentStyle>
	);
}

export default SkeletonContent;
