import React, { useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { updateLocalStorage, getLocalStorage, getCurrentYear } from '../../../UsefulFunctions'
import { RESP_LIMIT, RESP_MAX_ACCOUNT_DURATION, FIRST_RESP_YEAR } from './RESPConstants';
import { AccountAction, AccountGraphAction } from '../ActionModel';
import Container from '../../../GenericComponents/Container';
import { SessionState } from '../../../State';
import { InfoRESP } from './RESPModel';
import MaterialTable from 'material-table';
import YearPickerSelect from '../../../GenericComponents/YearPickerSelect';

const RESPVisualized = () => {
    const defaultRESPInfoYear = 1999;
    const defaultRESPInfo: InfoRESP = {
        actions: [],
        yearCreate: defaultRESPInfoYear
    };
    const [infoRESP, setInfoRESP] = useState(
		getLocalStorage(SessionState.infoRESP, defaultRESPInfo)
    );
    useEffect(() => {
		updateLocalStorage(SessionState.infoRESP, infoRESP);
    }, [infoRESP]);

    const [actions, setActions] = useState(infoRESP.actions);
    useEffect(() => {
        setInfoRESP({ ...infoRESP, actions });
        updateGraph();
    }, [actions]);

    const [yearCreate, setYearCreate] = useState(infoRESP.yearCreate);
	useEffect(() => {
		setInfoRESP({ ...infoRESP, yearCreate });
    }, [yearCreate]);

    const [contributionRoom, setContributionRoom] = useState(0);
    useEffect(() => {
        updateGraph();
    }, [contributionRoom]);

    // Set type of graphActions with TypeScript
    let tempGraphActions: AccountGraphAction[] = [];
    const [graphActions, setGraphActions] = useState(tempGraphActions);
   
    updateLocalStorage(SessionState.infoRESP, infoRESP);
    
    const updateGraph = () => {
        let actionsList: AccountAction[] = actions;
        let graphActions: AccountGraphAction[] = [];
        graphActions.push({
            title: 'Initial Space', 
            amount: RESP_LIMIT 
        });
        for (let i = 0; i < actionsList.length; i++) {
            let currentAction = actionsList[i];
            let cumulativeAmount = currentAction.amount;
            if (currentAction.withdraw) {
                cumulativeAmount = graphActions[i].amount + cumulativeAmount;
            } else {
                cumulativeAmount = graphActions[i].amount - cumulativeAmount;
            }
            graphActions.push({
                title: `${currentAction.title}`, 
                amount: cumulativeAmount 
            });
        }
        setGraphActions(graphActions);
    }

    const renderTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
              <div>
                <h3>{label}</h3>
                <p>{`Contribution Room Left:$${payload[0].value}`}</p>
              </div>
            );
        }
    }

    const renderContributionRoomLeft = () => {
        if (graphActions.length === 0) {
            return;
        }
        const contributionRoom = [...graphActions].splice(-1)[0].amount;
        let returnContent = `You have $${contributionRoom} left to contribute.`;
        if (contributionRoom < 0) {
            returnContent = `You have over contributed $${contributionRoom*-1}! The CRA will come for you!`
        }
        return (
            <div className="textAlignCenter">
                {returnContent}
            </div>
        )
    }

    const getRESPYearsLookUpObj = () => {
        let lookUpObj = {};
        const currentYear = getCurrentYear();
        const maxYear = Math.min(currentYear + RESP_MAX_ACCOUNT_DURATION, currentYear);
		for (let year = infoRESP.yearCreate; year <= maxYear; year++) {
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
			lookup: getRESPYearsLookUpObj()
		}
    ];

    const castActionTypes = (action) => {
		return {
			...action,
			year: parseInt(action.year),
			amount: parseInt(action.amount),
		}
    }

    const yearCreateChange = yearCreate => setYearCreate(yearCreate);

    return (
        <Container>
            <div>
                <p>You can only contribute a maximum of ${RESP_LIMIT}.</p>
                <h4>What year did you open this RESP account in?</h4>
				<YearPickerSelect
					startYear={FIRST_RESP_YEAR}
					endYear={getCurrentYear()}
					initialYear={yearCreate !== 0 ? yearCreate : defaultRESPInfoYear}
					onChange={yearCreateChange}
				/>
            </div>
            <hr />
            <div className="card">
                <MaterialTable
					title="RESP Transactions"
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
        </Container>
    )
}

export default RESPVisualized;