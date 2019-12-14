import React from "react";
import {Skeleton} from "@material-ui/lab";
import {ContentStyle} from "../ComponentsStyle.js";
import SkeletonColumnStyle from "./SkeletonColumnStyleComponent.js";

function SkeletonContent() {
	return (
		<ContentStyle>
			<SkeletonColumnStyle>
				<Skeleton variant="rect" width={318} height={817}/>
			</SkeletonColumnStyle>
			<SkeletonColumnStyle>
				<Skeleton variant="rect" width={318} height={817}/>
			</SkeletonColumnStyle>
			<SkeletonColumnStyle>
				<Skeleton variant="rect" width={318} height={817}/>
			</SkeletonColumnStyle>
			<SkeletonColumnStyle>
				<Skeleton variant="rect" width={318} height={817}/>
			</SkeletonColumnStyle>
			<SkeletonColumnStyle>
				<Skeleton variant="rect" width={318} height={817}/>
			</SkeletonColumnStyle>
		</ContentStyle>
	);
}

export default SkeletonContent;
