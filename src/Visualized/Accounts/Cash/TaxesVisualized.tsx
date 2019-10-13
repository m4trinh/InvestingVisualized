import React, { useState } from 'react'
import { getLocalStorage } from '../../../UsefulFunctions';

interface TaxBracket {
    amount: number,
    taxPercent: number
};

const TaxesVisualized = () => {
    

    //const [taxableIncome, setTaxableIncome] = useState(getLocalStorage(State.actions, []));
    

    /*
    return (
        <div>We use a progressive tax system in Canada.</div>
    )*/
    return (
        <div>
            <label>Taxable Income</label>
            <input  type="number"
                                className="form-control"
                                placeholder="Taxable Income"
                                />
        </div>
    )
}

export default TaxesVisualized;