import React, { useState, useEffect } from 'react';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { updateLocalStorage, getLocalStorage } from '../../../UsefulFunctions';
import { GICActionModel, GICGraphPoint } from './GICModel';
import { SessionState } from '../../../State';
import classNames from 'classnames';

const GICVisualized = () => {
	const defaultGICAction: GICActionModel = {
		maturity: 24,
		interest: 2,
		principal: 10000,
	};

	const [gicAction, setGicAction]: [GICActionModel, Function] = useState(
		getLocalStorage(SessionState.infoGIC, defaultGICAction)
	);

	useEffect(() => {
		updateGraph();
		updateLocalStorage(SessionState.infoGIC, gicAction);
	}, [gicAction]);

	// Set type of graphActions with TypeScript
	let tempPoints: GICGraphPoint[] = [];
	const [gicGraphPoints, setGICGraphPoints] = useState(tempPoints);

	const updateGraph = () => {
		const { maturity, interest, principal } = gicAction;
		let tempPoints: GICGraphPoint[] = [
			{
				month: 0,
				amount: principal,
			},
		];
		const numMonths = 12;
		const monthlyInterest = interest / numMonths / 100;
		for (let month = 1; month <= maturity; month++) {
			const amount = ~~(tempPoints[month - 1].amount * (1 + monthlyInterest));
			const GICGraphPoint: GICGraphPoint = {
				month,
				amount,
			};
			tempPoints.push(GICGraphPoint);
		}
		setGICGraphPoints(tempPoints);
	};

	const setPrincipalWrapper = event => {
		let principal;
		try {
			principal = parseInt(event.target.value);
		} catch (e) {
			principal = 0;
		}
		setGicAction({ ...gicAction, principal });
	};

	const setInterestWrapper = event => {
		let interest;
		try {
			interest = parseFloat(event.target.value);
		} catch (e) {
			interest = 0;
		}
		setGicAction({ ...gicAction, interest });
	};

	const setMaturityWrapper = event => {
		let maturity;
		try {
			maturity = parseInt(event.target.value);
		} catch (e) {
			maturity = 0;
		}
		setGicAction({ ...gicAction, maturity });
	};

	const renderTooltip = ({ active, payload, label }) => {
		if (active) {
			return (
				<div>
					<h3>{`Month ${label}`}</h3>
					<p>{`Account balance so far: $${payload[0].value}`}</p>
				</div>
			);
		}
	};

	const renderMaturitySummary = () => {
		if (gicGraphPoints && gicGraphPoints.length > 0) {
			const lastElementIndex = gicGraphPoints.length - 1;
			const { interest, maturity, principal } = gicAction;
			return (
				<p className="textAlignCenter">
					At {interest}% interest, after {maturity} months, your principal of $
					{principal} has grown to ${gicGraphPoints[lastElementIndex].amount}
				</p>
			);
		}
	};

	const colClassNames = classNames('col-4', 'minWidth200');
	return (
		<>
			<div className="row">
				<div className={colClassNames}>
					<label>Principal</label>
					<br />
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">$</span>
						</div>
						<input
							type="number"
							className="form-control"
							placeholder="Principal"
							onChange={setPrincipalWrapper}
							value={gicAction.principal}
						/>
					</div>
				</div>
				<div className={colClassNames}>
					<label>Interest</label>
					<br />
					<div className="input-group mb-3">
						<input
							type="number"
							onChange={setInterestWrapper}
							value={gicAction.interest}
							className="form-control"
							placeholder="Interest"
							min={0}
						/>
						<div className="input-group-append">
							<span className="input-group-text" id="basic-addon2">
								%
							</span>
						</div>
					</div>
				</div>
				<div className={colClassNames}>
					<label>Maturity</label>
					<br />
					<div className="input-group mb-3">
						<input
							type="number"
							onChange={setMaturityWrapper}
							value={gicAction.maturity}
							className="form-control"
							placeholder="Maturity"
							min={0}
						/>
						<div className="input-group-append">
							<span className="input-group-text" id="basic-addon2">
								Months
							</span>
						</div>
					</div>
				</div>
			</div>
			{renderMaturitySummary()}
			<div style={{ width: '100%', height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={gicGraphPoints}>
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip content={renderTooltip} />
						<Line type="monotone" dataKey="amount" stroke="#006eff" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</>
	);
};

export default GICVisualized;
