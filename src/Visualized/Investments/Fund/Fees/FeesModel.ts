export interface FeeActionModel {
	years: number;
	interest: number;
	fee: number;
	principal: number;
}

export interface FeeGraphPoint {
	year: number;
	principalAmount: number;
	feeAmount: number;
}
