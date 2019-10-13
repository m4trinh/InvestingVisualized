export interface TaxBracketModel {
    upperLimit: number,
    tax: number 
};

export interface ProgressiveTaxSystem {
    federalTax: TaxBracketModel[],
    provincialTax: TaxBracketModel[]
}

export interface TaxGraphPoint {
    initialAmount: number,
    taxedAmount: number
}
