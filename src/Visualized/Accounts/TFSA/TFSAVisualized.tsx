import React from 'react';
import AbstractAccountVisualized from '../AbstractAccountVisualized';
import { SessionState } from '../../../State';
import { FIRST_TFSA_YEAR, String, TFSA_AGE_START } from './TFSAConstants';
import { getCurrentYear } from '../../../UsefulFunctions';
import { AccountAction, AccountGraphAction } from '../ActionModel';
import YearPickerSelect from '../../../GenericComponents/YearPickerSelect';
import { AccountInfo } from '../AccountModel';

const TFSAVisualized = () => {
	const tableName = 'TFSA Transactions';
	const sessionStateInfo = SessionState.infoTFSA;
	const defaultTFSAInfoYear = 1999;
	const defaultInfo: AccountInfo = {
		actions: [],
		yearBorn: defaultTFSAInfoYear,
	};
	const renderHeader = (yearBorn, yearBornChange, contributionRoom) => {
		return (
			<div>
				<h4>What year were you born in? </h4>
				<p>
					The government gives you more contribution room each after you turn{' '}
					{TFSA_AGE_START} starting from {FIRST_TFSA_YEAR}.
				</p>
				<YearPickerSelect
					startYear={1919}
					endYear={getCurrentYear() - TFSA_AGE_START + 1}
					initialYear={yearBorn !== 0 ? yearBorn : defaultTFSAInfoYear}
					onChange={yearBornChange}
				/>
				<p>
					Initially, the government has given you ${contributionRoom} contribution
					room for your TFSA.
				</p>
			</div>
		);
	};
	const getYearsLookUpObj = () => {
		const lookUpObj = {};
		for (let year = FIRST_TFSA_YEAR; year <= getCurrentYear(); year++) {
			lookUpObj[year] = year;
		}
		return lookUpObj;
	};
	const calcInitContribRoom = yearBorn => {
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
			2020: 6000,
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
	const getGraphPoints = (actions, contributionRoom) => {
		let actionsList: AccountAction[] = [...actions];
		let graphPoints: AccountGraphAction[] = [];

		graphPoints.push({
			title: String.governmentInitialRoomAllowance,
			amount: contributionRoom,
		});

		let currentYear = getCurrentYear();
		for (let i = 0; i < actionsList.length; i++) {
			let currentAction = actionsList[i];
			let cumulativeAmount = currentAction.amount;
			let titleDesc = '';
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
				amount: cumulativeAmount,
			});
		}
		return graphPoints;
	};

	const props = {
		tableName,
		sessionStateInfo,
		defaultInfo,
		renderHeader,
		getYearsLookUpObj,
		calcInitContribRoom,
		getGraphPoints,
	};
	return <AbstractAccountVisualized {...props} />;
};
export default TFSAVisualized;
