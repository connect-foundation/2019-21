import React from "react";

function WithLoadingAndErrorComponent(
	Component,
	LoadingComponent,
	ErrorComponent,
) {
	return props => {
		const {loading, error} = props;

		if (loading) {
			return <LoadingComponent {...props} />;
		}

		if (error) {
			return <ErrorComponent {...props} />;
		}

		return <Component {...props} />;
	};
}

export default WithLoadingAndErrorComponent;
