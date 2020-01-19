import React from 'react';
import AbstractAccountVisualized from "../AbstractAccountVisualized";
import { SessionState } from "../../../State";
import { getCurrentYear } from "../../../UsefulFunctions";
import { AccountAction, AccountGraphAction } from "../ActionModel";
import YearPickerSelect from "../../../GenericComponents/YearPickerSelect";
import { RESP_CONTRIBUTION_LIMIT, FIRST_RESP_YEAR, RESP_MAX_ACCOUNT_DURATION } from "./RESPConstants";
import { AccountInfo } from "../AccountModel";

const RESPVisualized = () => {
    const tableName = 'RESP Transactions';
    const sessionStateInfo = SessionState.infoRESP;
    const defaultRESPInfoYear = 1999;
    const defaultInfo: AccountInfo = {
		actions: [],
		yearBorn: defaultRESPInfoYear
    };

    const renderHeader = (yearBorn, yearBornChange) => {
        return (
            <div>
                <p>You can only contribute a maximum of ${RESP_CONTRIBUTION_LIMIT}.</p>
                <h4>What year did you open this RESP account in?</h4>
				<YearPickerSelect
					startYear={FIRST_RESP_YEAR}
					endYear={getCurrentYear()}
					initialYear={yearBorn !== 0 ? yearBorn : defaultRESPInfoYear}
					onChange={yearBornChange}
				/>
            </div>
        )
    }
    const getYearsLookUpObj = (yearBorn) => {
        const lookUpObj = {};
        const currentYear = getCurrentYear();
        const maxYear = Math.min(currentYear + RESP_MAX_ACCOUNT_DURATION, currentYear);
		for (let year = yearBorn; year <= maxYear; year++) {
			lookUpObj[year] = year;
		}
		return lookUpObj;
    }
    const calcInitContribRoom = () => {
        return RESP_CONTRIBUTION_LIMIT;
    }
    const getGraphPoints = (actions) => {
        let actionsList: AccountAction[] = actions;
        let graphPoints: AccountGraphAction[] = [];
        graphPoints.push({
            title: 'Initial Space',
            amount: RESP_CONTRIBUTION_LIMIT
        });
        for (let i = 0; i < actionsList.length; i++) {
            let currentAction = actionsList[i];
            let cumulativeAmount = currentAction.amount;
            if (currentAction.withdraw) {
                cumulativeAmount = graphPoints[i].amount + cumulativeAmount;
            } else {
                cumulativeAmount = graphPoints[i].amount - cumulativeAmount;
            }
            graphPoints.push({
                title: `${currentAction.title}`, 
                amount: cumulativeAmount 
            });
        }
		return graphPoints;
    }
    
    const props = {
        tableName,
        sessionStateInfo,
        defaultInfo,
        renderHeader,
        getYearsLookUpObj,
        calcInitContribRoom,
        getGraphPoints,
    };
    return <AbstractAccountVisualized {...props}/>
}
export default RESPVisualized;