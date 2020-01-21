import React, { useState } from 'react';
import {
	ProgressiveTaxSystem,
	TaxBracketModel,
	TaxGraphPoint,
} from './TaxModel';
import TaxBrackets from './TaxBrackets';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const INFINITY = -1;

const TaxesVisualized = () => {
	const ontarioTax: TaxBracketModel[] = [
		{
			upperLimit: 42201,
			tax: 5.05,
		},
		{
			upperLimit: 84404,
			tax: 9.15,
		},
		{
			upperLimit: 150000,
			tax: 11.16,
		},
		{
			upperLimit: 220000,
			tax: 12.16,
		},
		{
			upperLimit: INFINITY,
			tax: 16,
		},
	];
	const canadaTax: TaxBracketModel[] = [
		{
			upperLimit: 47630,
			tax: 15,
		},
		{
			upperLimit: 95259,
			tax: 20.5,
		},
		{
			upperLimit: 147667,
			tax: 26,
		},
		{
			upperLimit: 210371,
			tax: 29,
		},
		{
			upperLimit: INFINITY,
			tax: 33,
		},
	];

	const taxSystem: ProgressiveTaxSystem = {
		federalTax: canadaTax,
		provincialTax: ontarioTax,
	};

	const [income, setIncome] = useState(0);

	// Set type of graphActions with TypeScript
	let tempPoints: TaxGraphPoint[] = [];
	const [taxGraphPoints, setTaxGraphPoints] = useState(tempPoints);

	const renderTaxBrackets = () => {
		return (
			<div className="row">
				<div className="col-6">
					<TaxBrackets title={'Federal'} taxBrackets={canadaTax} />
				</div>
				<div className="col-6">
					<TaxBrackets title={'Provincial'} taxBrackets={ontarioTax} />
				</div>
			</div>
		);
	};
	const setIncomeWrapper = () => {};
	const renderIncomeInput = () => {
		return (
			<input
				type="number"
				className="form-control"
				placeholder="Income"
				onChange={setIncomeWrapper}
				value={income}
			/>
		);
	};

	const updateGraph = () => {
		setTaxGraphPoints(taxGraphPoints);
	};

	const renderGraph = () => {
		return (
			<div style={{ width: '100%', height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={taxGraphPoints}>
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey="amount" stroke="#006eff" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	};

	return (
		<div>
			{renderTaxBrackets()}
			{renderIncomeInput()}
			{renderGraph()}
		</div>
	);
};

export default TaxesVisualized;
