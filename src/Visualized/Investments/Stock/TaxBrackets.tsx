import React from 'react';
import { TaxBracketModel } from './TaxModel';

interface Props {
	title: string;
	taxBrackets: TaxBracketModel[];
}

const TaxBrackets = (props: Props) => {
	// Hi, this is in progress :)

	const renderTaxBracket = (
		taxBracket: TaxBracketModel,
		lastTaxBracket: TaxBracketModel
	) => {
		const minValue = lastTaxBracket ? lastTaxBracket.upperLimit : 0;
		return (
			<div>
				<input type="number" value={taxBracket.upperLimit} min={minValue} />
				<input type="number" value={taxBracket.tax} min={0} max={100} />
			</div>
		);
	};

	const renderLastTaxBracket = (taxBracket: TaxBracketModel) => {
		return (
			<div>
				<input type="text" value={'Remaining Income'} disabled />
				<input type="number" value={taxBracket.tax} min={0} max={100} />
			</div>
		);
	};
	const renderTaxBrackets = (taxBrackets: TaxBracketModel[]) => {
		const lastTaxBracket: TaxBracketModel = taxBrackets.splice(-1)[0];
		taxBrackets.pop();

		return (
			<>
				{taxBrackets.map((taxBracket, i) =>
					renderTaxBracket(taxBrackets[i], taxBrackets[i - 1])
				)}
				{renderLastTaxBracket(lastTaxBracket)}
			</>
		);
	};

	const { title, taxBrackets } = props;
	return (
		<div>
			<h3>{title}</h3>
			{renderTaxBrackets(taxBrackets)}
		</div>
	);
};

export default TaxBrackets;
