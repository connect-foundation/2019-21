import {Skeleton} from "@material-ui/lab";
import React from "react";
import {SkeletonContentStyle, SkeletonColumnStyle} from "./SkeletonStyle";

function SkeletonContent() {
	return (
		<SkeletonContentStyle>
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
		</SkeletonContentStyle>
	);
}

export default SkeletonContent;
