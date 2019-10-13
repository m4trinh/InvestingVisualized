import React from 'react';
import styles from './css/Brokers.module.css';
import Definition from '../GenericComponents/Definition';
const QUESTRADE_STANDARD_FEE = "1¢ each, $4.95 min, $9.95 max";

const BROKER_TYPES = [
    {
        id: "qt",
        title: "Questrade",
        logo: "./images/logos/brokers/questrade.png",
        accountMin: "$1000",
        accountFees:
            <table>
                <thead>
                    <tr>
                        <th>Account Type</th>
                        <th>Fees</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>TFSA, RESP, RRSP</td>
                        <td><table>
                            <thead>
                                <tr>
                                    <th>Account Balance</th>
                                    <th>Annual Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>$1000-$4999</td>
                                    <td>${24.95 * 4} <p>(This can be
                            <a target="_blank" rel="noopener noreferrer" href="https://questrade-support.secure.force.com/mylearning/view/b/Account/Inactivity-fees/"> waived</a>.)</p></td>
                                </tr>
                                <tr>
                                    <td>$5000+</td>
                                    <td>$0</td>
                                </tr>
                            </tbody>
                        </table></td>

                    </tr>

                </tbody>
            </table>,

        tradingFees: {
            etf: `$0 to buy, ${QUESTRADE_STANDARD_FEE} to sell`,
            stock: QUESTRADE_STANDARD_FEE,
            option: "$9.95+$1 per contract"
        },
        note: <React.Fragment><a href="">ECN fees</a> may be adding on to each trade.</React.Fragment>
    },
    {
        id: "ws",
        title: "Wealthsimple",
        logo: "./images/logos/brokers/wealthsimple.png",
        accountMin: "$0",
        accountFees: "$0",
        tradingFees: {
            etf: "$0",
            stock: "$0",
            option: "N/A"
        }
    },
    {
        id: "cibc",
        title: "CIBC Investors Edge",
        logo: "./images/logos/brokers/cibc.png",
        accountMin: "$0",
        accountFees:
            <table>
                <thead>
                    <tr>
                        <th>Account Type</th>
                        <th>Fees</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TFSA, RESP</td>
                        <td>$0</td>
                    </tr>
                    <tr>
                        <td>RRSP</td>
                        <td><table>
                            <thead>
                                <tr>
                                    <th>Account Balance</th>
                                    <th>Annual Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>$0-$25000</td>
                                    <td>$100</td>
                                </tr>
                                <tr>
                                    <td>$25001+</td>
                                    <td>$0</td>
                                </tr>
                            </tbody>
                        </table></td>

                    </tr>

                </tbody>
            </table>,
        tradingFees: {
            etf: "$6.95",
            stock: "$6.95",
            option: "$6.95+$1.25 per contract"
        }
    }
];

const BROKER_DEFINITION = {
    title: "Brokers",
    body: 
    <div>
        Brokers are companies where you can open accounts and purchase investments.
    </div>
}

const BrokerTypes = () => {
    return (
        <>
            <Definition {...BROKER_DEFINITION}/>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            {BROKER_TYPES.map(x => <th><img className={styles.brokerLogo} src={x.logo} alt={`${x.title} Logo`}></img></th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Account Minimum</td>
                            {BROKER_TYPES.map(x => <td>{x.accountMin}</td>)}
                        </tr>
                        <tr>
                            <td>Registered Account Fees</td>
                            {BROKER_TYPES.map(x => <td>{x.accountFees}</td>)}
                        </tr>
                        <tr>
                            <td>ETF</td>
                            {BROKER_TYPES.map(x => <td>{x.tradingFees.etf}</td>)}
                        </tr>
                        <tr>
                            <td>Stock</td>
                            {BROKER_TYPES.map(x => <td>{x.tradingFees.stock}</td>)}
                        </tr>
                        <tr>
                            <td>Option Contract</td>
                            {BROKER_TYPES.map(x => <td>{x.tradingFees.option}</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default BrokerTypes;