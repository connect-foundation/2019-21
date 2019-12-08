import {Skeleton} from "@material-ui/lab";
import React from "react";
import {ContentStyle, ColumnStyle} from "./ComponentsStyle";

function SkeletonContent() {
	return (
		<ContentStyle>
			<ColumnStyle>
				<Skeleton variant="rect" width={318} height={817} />
			</ColumnStyle>
			<ColumnStyle>
				<Skeleton variant="rect" width={318} height={817} />
			</ColumnStyle>
			<ColumnStyle>
				<Skeleton variant="rect" width={318} height={817} />
			</ColumnStyle>
			<ColumnStyle>
				<Skeleton variant="rect" width={318} height={817} />
			</ColumnStyle>
			<ColumnStyle>
				<Skeleton variant="rect" width={318} height={817} />
			</ColumnStyle>
		</ContentStyle>
	);
}

export default SkeletonContent;
