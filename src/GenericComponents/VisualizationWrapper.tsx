import React, { useState, useEffect, Component } from 'react';
import { updateLocalStorage, getLocalStorage } from '../UsefulFunctions';

interface Props {
	showKey: string;
	component: any;
}

const VisualizationWrapper = (props: Props) => {
	const { showKey, component } = props;
	const [show, toggleShow] = useState(getLocalStorage(props.showKey, false));

	useEffect(() => {
		updateLocalStorage(showKey, show);
	}, [show]);

	if (show) {
		return (
			<>
				{component}
				<button className="btn btn-danger" onClick={() => toggleShow(!show)}>
					Close Visualization
				</button>
			</>
		);
	} else {
		return (
			<button className="btn btn-primary" onClick={() => toggleShow(!show)}>
				Open Visualization
			</button>
		);
	}
};

export default VisualizationWrapper;
