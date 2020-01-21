import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import {
	getLocalStorage,
	updateLocalStorage,
	getCurrentYear,
} from '../../UsefulFunctions';
import { AccountGraphAction } from './ActionModel';

interface Props {
	renderHeader: Function;
	getYearsLookUpObj: Function;
	calcInitContribRoom: Function;
	getGraphPoints: Function;
	tableName: string;
	sessionStateInfo: string;
	defaultInfo: any; // TODO: make a type
}

const AbstractAccountVisualized = (props: Props) => {
	const {
		renderHeader,
		getYearsLookUpObj,
		calcInitContribRoom,
		getGraphPoints,
		sessionStateInfo,
		defaultInfo,
	} = props;

	const updateGraph = () => {
		setGraphActions(getGraphPoints(actions, contributionRoom));
	};
	const [info, setInfo] = useState(
		getLocalStorage(sessionStateInfo, defaultInfo)
	);
	useEffect(() => {
		updateLocalStorage(sessionStateInfo, info);
	}, [info]);

	const [actions, setActions] = useState(info.actions);
	useEffect(() => {
		setInfo({ ...info, actions });
		updateGraph();
	}, [actions]);

	const [contributionRoom, setContributionRoom] = useState(0);
	useEffect(() => {
		updateGraph();
	}, [contributionRoom]);

	const [yearBorn, setYearBorn] = useState(info.yearBorn);
	useEffect(() => {
		setInfo({ ...info, yearBorn });
		setContributionRoom(calcInitContribRoom(yearBorn));
	}, [yearBorn]);

	const tempGraphActions: AccountGraphAction[] = [];
	const [graphActions, setGraphActions] = useState(tempGraphActions);

	const renderTooltip = ({ active, payload, label }) => {
		if (active) {
			return (
				<div>
					<h3>{label}</h3>
					<p>{`Contribution Room Left:$${payload[0].value}`}</p>
				</div>
			);
		}
	};

	const renderContributionRoomLeft = () => {
		if (graphActions.length === 0) {
			return;
		}
		const contributionRoom = [...graphActions].splice(-1)[0].amount;
		let returnContent = `You have $${contributionRoom} left to contribute.`;
		if (contributionRoom < 0) {
			returnContent = `You have over contributed $${contributionRoom *
				-1}! The CRA will come for you!`;
		}
		return <div className="textAlignCenter">{returnContent}</div>;
	};

	const Columns = [
		{
			title: 'Withdrawal?',
			field: 'withdraw',
			type: 'boolean',
			initialEditValue: false,
		},
		{
			title: 'Amount ($)',
			field: 'amount',
			type: 'numeric',
			initialEditValue: 0,
		},
		{ title: 'Title', field: 'title', initialEditValue: 'Contribution' },
		{
			title: 'Year',
			field: 'year',
			type: 'numeric',
			initialEditValue: getCurrentYear(),
			lookup: getYearsLookUpObj(yearBorn),
		},
	];

	const castActionTypes = action => {
		return {
			...action,
			year: parseInt(action.year),
			amount: parseInt(action.amount),
		};
	};

	return (
		<>
			{renderHeader(yearBorn, setYearBorn, contributionRoom)}
			<hr />
			<div className="card">
				<MaterialTable
					title={props.tableName}
					// @ts-ignore
					columns={Columns}
					data={actions.slice().reverse()}
					options={{
						addRowPosition: 'first',
						exportButton: true,
					}}
					editable={{
						onRowAdd: newAction => {
							setActions([...actions, castActionTypes(newAction)]);
							return Promise.resolve();
						},
						onRowUpdate: (newAction, oldAction) =>
							new Promise(resolve => {
								setTimeout(() => {
									if (oldAction) {
										// @ts-ignore
										const updateIndex = actions.length - oldAction.tableData.id - 1;
										setActions(
											actions.map((item, index) => {
												if (index == updateIndex) {
													return castActionTypes(newAction);
												}
												return item;
											})
										);
									}
									resolve();
								}, 600);
							}),
						onRowDelete: oldAction =>
							new Promise(resolve => {
								setTimeout(() => {
									// @ts-ignore
									const deleteIndex = actions.length - oldAction.tableData.id - 1;
									setActions(actions.filter((row, index) => index !== deleteIndex));
									resolve();
								}, 600);
							}),
					}}
				/>
			</div>
			<hr />
			{renderContributionRoomLeft()}
			<hr />
			<div style={{ width: '100%', height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={graphActions}>
						<Line type="monotone" dataKey="amount" stroke="#8884d8" />
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<XAxis dataKey="title" />
						<YAxis />
						<Tooltip content={renderTooltip} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</>
	);
};

export default AbstractAccountVisualized;
