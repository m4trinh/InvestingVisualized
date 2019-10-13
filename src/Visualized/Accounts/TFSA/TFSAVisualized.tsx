import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer
} from "recharts";
import YearPickerSelect from "../../../GenericComponents/YearPickerSelect";
import {
	updateLocalStorage,
	getLocalStorage,
	getCurrentYear
} from "../../../UsefulFunctions";
import { TFSA_AGE_START, FIRST_TFSA_YEAR, String } from "./TFSAConstants";
import { AccountAction, AccountGraphAction } from "../ActionModel";
import { SessionState } from "../../../State";
import { TFSAInfo } from "./TFSAModel";

const TFSAVisualized = () => {
	const defaultTFSAInfoYear = 1999;
	const defaultTFSAInfo: TFSAInfo = {
		actions: [],
		yearBorn: defaultTFSAInfoYear
	};

	const [info, setInfo] = useState(
		getLocalStorage(SessionState.infoTFSA, defaultTFSAInfo)
	);
	useEffect(() => {
		updateLocalStorage(SessionState.infoTFSA, info);
	}, [info]);

	const [actions, setActions] = useState(info.actions);
	useEffect(() => {
		setInfo({ ...info, actions });
		updateGraph();
	}, [actions]);

	const [yearBorn, setYearBorn] = useState(info.yearBorn);
	useEffect(() => {
		setInfo({ ...info, yearBorn });
		setContributionRoom(calculateInitialContributionRoom());
	}, [yearBorn]);

	const [contributionRoom, setContributionRoom] = useState(0);
	useEffect(() => {
		updateGraph();
	}, [contributionRoom]);

	const tempGraphActions: AccountGraphAction[] = [];
	const [graphActions, setGraphActions] = useState(tempGraphActions);

	const calculateInitialContributionRoom = () => {
		//TODO: Get TFSA contribution room per year from an API
		const YEARLY_TFSA_ALLOWANCE = {
			2009: 5000,
			2010: 5000,
			2011: 5000,
			2012: 5000,
			2013: 5500,
			2014: 5500,
			2015: 10000,
			2016: 5500,
			2017: 5500,
			2018: 5500,
			2019: 6000,
			2020: 6000
		};

		let cumulativeYearlyTFSAAllowance = {};
		let cumulativeAmount = 0;
		for (let year = 2019; year >= 2009; year--) {
			cumulativeAmount += YEARLY_TFSA_ALLOWANCE[year];
			cumulativeYearlyTFSAAllowance[year] = cumulativeAmount;
		}
		const currentYear = new Date().getFullYear();
		const age = currentYear - yearBorn;
		// People below the age of 18 have 0 TFSA contribution room
		if (age < TFSA_AGE_START) {
			return 0;
		} else {
			const TFSAStartYear = currentYear - (age - TFSA_AGE_START);
			return cumulativeYearlyTFSAAllowance.hasOwnProperty(TFSAStartYear)
				? cumulativeYearlyTFSAAllowance[TFSAStartYear]
				: cumulativeYearlyTFSAAllowance[FIRST_TFSA_YEAR];
		}
	};

	const updateGraph = () => {
		let actionsList: AccountAction[] = [...actions];
		let graphPoints: AccountGraphAction[] = [];

		graphPoints.push({
			title: String.governmentInitialRoomAllowance,
			amount: contributionRoom
		});

		let currentYear = getCurrentYear();
		for (let i = 0; i < actionsList.length; i++) {
			let currentAction = actionsList[i];
			let cumulativeAmount = currentAction.amount;
			let titleDesc = "";
			if (currentAction.withdraw) {
				// Withdrawing money adds contribution room only if it was withdrawn last year
				if (currentAction.year < currentYear) {
					cumulativeAmount = graphPoints[i].amount + cumulativeAmount;
					titleDesc = String.withdrawal;
				} else {
					cumulativeAmount = graphPoints[i].amount;
					titleDesc = `${String.withdrawal}-${String.noContributionRoomGained}`;
				}
			} else {
				// Contributing money removes contribution room
				cumulativeAmount = graphPoints[i].amount - cumulativeAmount;
				titleDesc = String.contribution;
			}
			if (titleDesc) {
				titleDesc = ` (${titleDesc})`;
			}
			graphPoints.push({
				title: `${currentAction.title}${titleDesc}`,
				amount: cumulativeAmount
			});
		}
		setGraphActions(graphPoints);
	};

	const yearBornChange = yearBorn => setYearBorn(yearBorn);

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
		let returnContent = `You have $${contributionRoom} left to contribute this year.`;
		if (contributionRoom < 0) {
			returnContent = `You have over contributed $${contributionRoom *
				-1}! The CRA will come for you!`;
		}
		return <div className="textAlignCenter">{returnContent}</div>;
	};

	const getTFSAYearsLookUpObj = () => {
		let lookUpObj = {};
		for (let year = FIRST_TFSA_YEAR; year <= getCurrentYear(); year++) {
			lookUpObj[year] = year;
		}
		return lookUpObj;
	};

	const Columns = [
		{
			title: "Withdrawal?",
			field: "withdraw",
			type: "boolean",
			initialEditValue: false
		},
		{ title: "Amount ($)", field: "amount", type: "numeric", initialEditValue: 0 },
		{ title: "Title", field: "title", initialEditValue: "Contribution" },
		{
			title: "Year",
			field: "year",
			type: "numeric",
			initialEditValue: getCurrentYear(),
			lookup: getTFSAYearsLookUpObj()
		}
	];

	const castActionTypes = (action) => {
		return {
			...action,
			year: parseInt(action.year),
			amount: parseInt(action.amount),
		}
	}

	return (
		<div>
		    <div>
				<h4>What year were you born in? </h4>
				<p>
					The government gives you more contribution room each after you turn{" "}
					{TFSA_AGE_START} starting from {FIRST_TFSA_YEAR}
				</p>
				<YearPickerSelect
					startYear={1919}
					endYear={getCurrentYear() - TFSA_AGE_START + 1}
					initialYear={yearBorn !== 0 ? yearBorn : defaultTFSAInfoYear}
					onChange={yearBornChange}
				/>
				<p>
					Initially, the government has given you ${contributionRoom}{" "}
					contribution room for your TFSA.
				</p>
			</div>
			<hr/>
			<div className="card">
				<MaterialTable
					title="TFSA Transactions"
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
									setActions(
										actions.filter((row, index) => index !== deleteIndex)
									);
									resolve();
								}, 600);
							})
					}}
				/>
			</div>
			{renderContributionRoomLeft()}
			<div style={{ width: "100%", height: 300 }}>
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
		</div>
	);
};

export default TFSAVisualized;
