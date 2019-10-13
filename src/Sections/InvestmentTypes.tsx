import React from 'react'
import Toolbar from '../GenericComponents/Toolbar'
import Definition from '../GenericComponents/Definition'
import FeesVisualized from '../Visualized/Investments/Fund/Fees/FeesVisualized'
import VisualizationWrapper from '../GenericComponents/VisualizationWrapper';
import GICVisualized from '../Visualized/Investments/GIC/GICVisualized';
import TaxesVisualized from '../Visualized/Investments/Stock/TaxesVisualized';
import { SessionState } from '../State';

const INVESTMENT_TYPES = {
    GIC: {
        title: "Guaranteed Investment Certificate (GIC)",
        titleHyperlink: "https://www.wealthsimple.com/en-ca/learn/what-is-gic",
        body: 
        <div>
            GICs guarantee interest over a specified time period. 
            <ul>
                <li>
                    Withdrawing your money before the specified time period may be impossible or subject to penalty.
                    <br />
                    Therefore, it's usually a good idea to use a High Interest Savings Account over a GIC if the interest is higher.
                    <ul>
                        <li>You can withdraw your money anytime.</li>
                        <li>For example, the <a href="https://www.wealthsimple.com/en-ca/product/save/">Wealthsimple Savings Account</a> earns 2% interest per year.</li>
                        <li>Note: Do a google search on High Interest Savings Accounts to find other rates</li>
                    </ul>
                </li>
            </ul>
            <VisualizationWrapper showKey={SessionState.showGIC} component={<GICVisualized />}/>
        </div>
    },
    STOCK: {
        title: "Stock",
        titleHyperlink: "https://www.investopedia.com/terms/s/stock.asp",
        body: 
        <div>
            A stock is piece of a business.
            <ul>
                <li>Hand picking stocks is risky. </li>
                <li>Therefore, there a higher upside.</li>
                <li>This also means that there is a lower downside.</li>
            </ul>
            {/*<VisualizationWrapper showKey='showStocks' component={<TaxesVisualized />}/>*/}
        </div>
    },
    BOND: {
        title: "Bond",
        titleHyperlink: "",
        body: 
        <div>
            A bond is an way for you to lend money to a company. They pay you interest.
        </div>
    },
    FUND: {
        title: "Exchange Traded Fund (ETF) / Mutual Fund",
        titleHyperlink: "https://www.investopedia.com/ask/answers/09/mutual-fund-etf.asp",
        body: 
        <div>
            A ETFs and mutual fund are collections of stocks.
            Heres how mutual funds differ from ETFs:
            <ul>
                <li>ETFs actively trade throughout the trading day while mutual fund trades close at the end of the trading day.</li>
            </ul>
            When choosing which ETF or mutual fund addresses your needs, please consider the fees.
            <ul>
                <li>
                    <a href="https://dqydj.com/sp-500-historical-return-calculator/">
                        The return of the {'S&P'} 500 over the last 30 years was about 9.5% with dividends reinvested. (Not accounting for inflation)
                    </a>
                </li>
                <li>
                    Past returns do not indicate future returns but for example sake, we will use these numbers.
                </li>
                <li>
                    See the Fees Visualizer to understand how much money you could lose from just a 2% fee.
                </li>
            </ul>
            <VisualizationWrapper showKey={SessionState.showFees} component={<FeesVisualized />}/>
        </div>
    }
};

const TOOLBAR_PROPS = {
    title: 'Investments',
    currentPath: '/investments',
    tabs: [
        {
            title: 'ETF / Mutual Fund',
            link: 'fund',
            component: () => <Definition {...INVESTMENT_TYPES.FUND} />
        },
        {
            title: 'GIC',
            link: 'gic',
            component: () => <Definition {...INVESTMENT_TYPES.GIC} />
        },
        {
            title: 'Stock',
            link: 'stock',
            component: () => <Definition {...INVESTMENT_TYPES.STOCK} />
        },
    ]
}

const InvestmentTypes = () => {
    return (
        <>
            <Toolbar {...TOOLBAR_PROPS} />
            {
                window.location.pathname === TOOLBAR_PROPS.currentPath ? 
                <div className="center-all">
                    <h1>Investments</h1> <br/>
                    <h2>Assets that you hope will go up in value.</h2>
                </div>: <></>
            }
        </>
    )
}

export default InvestmentTypes;