import React, { useState, useEffect } from 'react'
import styles from './FeesVisualized.module.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { updateLocalStorage, getLocalStorage } from '../../../../UsefulFunctions'
import { FeeActionModel, FeeGraphPoint } from './FeesModel';
import { SessionState } from '../../../../State';
const classNames = require('classnames');

const FeesVisualized = () => {

    const defaultFeeAction: FeeActionModel = {
        years: 30,
        interest: 8,
        fee: 2,
        principal: 10000
    };

    const [feeAction, setFeeAction]: [FeeActionModel, Function] = useState(getLocalStorage(SessionState.infoFees, defaultFeeAction));
    
    useEffect(() => {
        updateGraph();
        updateLocalStorage(SessionState.infoFees, feeAction);
    }, [feeAction]);

    // Set type of graphActions with TypeScript
    let tempPoints: FeeGraphPoint[] = [];
    const [feeGraphPoints, setFeeGraphPoints] = useState(tempPoints);
    const updateGraph = () => {
        const { years, interest, fee, principal } = feeAction;
        let tempPoints: FeeGraphPoint[] = [ 
            {
                year: 0,
                principalAmount: principal,
                feeAmount: principal
            }
        ];
        const interestPercent = feeAction.interest / 100;
        const interestWithFeePercent = (interest - fee) / 100;
        for(let year = 1; year <= years;year++) {
            const principalAmount = ~~(tempPoints[year-1].principalAmount * (1+interestPercent));
            const feeAmount = ~~(tempPoints[year-1].feeAmount * (1+interestWithFeePercent));
            const feeGraphPoint: FeeGraphPoint = {
                year,
                principalAmount,
                feeAmount
            }
            tempPoints.push(feeGraphPoint);
        }
        setFeeGraphPoints(tempPoints);
    }

    const setPrincipalWrapper = (event) => {
        let principal;
        try {
            principal = parseInt(event.target.value);
        } catch (e) {
            principal = 0;
        }
        setFeeAction({...feeAction, principal});
    }

    const setInterestWrapper = (event) => {
        let interest;
        try {
            interest = parseFloat(event.target.value);
        } catch (e) {
            interest = 0;
        }
        let fee = feeAction.fee;
        if (fee > interest) {
            fee = interest;
        }
        setFeeAction({...feeAction, interest, fee});
    }

    const setFeeWrapper = (event) => {
        let fee;
        try {
            fee = parseFloat(event.target.value);
        } catch (e) {
            fee = 0;
        }
        setFeeAction({...feeAction, fee});
    }
    
    const setYearsWrapper = (event) => {
        let years;
        try {
            years = parseInt(event.target.value);
        } catch (e) {
            years = 0;
        }
        setFeeAction({...feeAction, years});
    }

    const renderLossSummary = () => {
        if (feeGraphPoints && feeGraphPoints.length > 0) {
            const lastElementIndex = feeGraphPoints.length - 1;
            const totalLoss = feeGraphPoints[lastElementIndex].principalAmount - feeGraphPoints[lastElementIndex].feeAmount;
            const { fee, years } = feeAction;
            return (
                <p className={styles.lossSummary}>${totalLoss} would be lost due to the {fee}% fee over a {years} period.</p>
            )
        }
    }

    const renderTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
              <div>
                <h3>{`Year ${label}`}</h3>
                <p>{`So far, you would've lost $${payload[0].value - payload[1].value} to fees!`}</p>
              </div>
            );
        }
    }

    const colClassNames = classNames('col-3', 'minWidth200');
    return (
        <>
            <div className="row">
                <div className={colClassNames}>
                    <label>Principal</label>
                    <br/>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input  type="number"
                                className="form-control"
                                placeholder="Principal"
                                onChange={setPrincipalWrapper}
                                value={feeAction.principal}
                                />
                    </div>
                </div>
                <div className={colClassNames}>
                    <label>Interest</label>
                    <br/>
                    <div className="input-group mb-3">
                        <input  type="number"
                                        onChange={setInterestWrapper}
                                        value={feeAction.interest}
                                        className="form-control"
                                        placeholder="Interest"
                                        min={0}
                                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">%</span>
                        </div>
                    </div>
                </div>
                <div className={colClassNames}>
                    <label>Fee</label>
                    <br/>
                    <div className="input-group mb-3">
                        <input  type="number"
                                        onChange={setFeeWrapper}
                                        value={feeAction.fee}
                                        className="form-control"
                                        placeholder="Fee"
                                        min={0}
                                        max={feeAction.interest}
                                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">%</span>
                        </div>
                    </div>
                </div>
                <div className={colClassNames}>
                    <label>Time Frame</label>
                    <br/>
                    <div className="input-group mb-3">
                        <input  type="number"
                                        onChange={setYearsWrapper}
                                        value={feeAction.years}
                                        className="form-control"
                                        placeholder="Years"
                                        min={0}
                                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Years</span>
                        </div>
                    </div>
                </div>
            </div>
            {renderLossSummary()}
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={feeGraphPoints}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip content={renderTooltip} />
                        <Line type="monotone" dataKey="principalAmount" stroke="#006eff" />
                        <Line type="monotone" dataKey="feeAmount" stroke="#ff0022" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default FeesVisualized;