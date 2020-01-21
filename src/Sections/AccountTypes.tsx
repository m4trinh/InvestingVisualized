import React from 'react';
import Toolbar from '../GenericComponents/Toolbar';
import Definition from '../GenericComponents/Definition';
import TFSAVisualized from '../Visualized/Accounts/TFSA/TFSAVisualized';
import RESPVisualized from '../Visualized/Accounts/RESP/RESPVisualized';
import {
	CESG_INFO_URL,
	CESG_LIMIT,
	CESG_ABBREV,
	RESP_CONTRIBUTION_LIMIT,
	EAP_ABBREV,
} from '../Visualized/Accounts/RESP/RESPConstants';
import VisualizationWrapper from '../GenericComponents/VisualizationWrapper';
import { SessionState } from '../State';

// TODO: Move these constants to their respective files
const ACCOUNT_TYPES = {
	TFSA: {
		title: 'Tax-Free Savings Acccount (TFSA)',
		titleHyperlink: 'https://www.wealthsimple.com/en-ca/learn/what-is-tfsa',
		body: (
			<div>
				There are two main points you need to understand for a TFSA.
				<ul>
					<li>Any money earned in this account type is not taxed.</li>
					<li>You can only contribute a limited amount of money.</li>
					<ul>
						<li>
							The Canadian government adds more contribution room every year (On
							January 1st)
						</li>
						<li>Depositing money into a TFSA deducts your contribution room.</li>
						<li>
							Withdrawing money from your TFSA readds the capital to your contribution
							room next year.
						</li>
					</ul>
				</ul>
				See the Contribution Room Calculator for a visualization of contribution
				room!
				<hr />
				<VisualizationWrapper
					showKey={SessionState.showTFSA}
					component={<TFSAVisualized />}
				/>
			</div>
		),
	},
	RESP: {
		title: 'Registered Education Savings Plan (RESP)',
		titleHyperlink: 'https://www.wealthsimple.com/en-ca/learn/what-is-resp',
		body: (
			<div>
				The purpose of this account to help pay for your child's post secondary
				education.
				<ul>
					<li>
						You can only contribute a maximum of ${RESP_CONTRIBUTION_LIMIT} for each
						child.
					</li>
					<li>
						The government will provide a 20% grant on a maximum if $2500 per year. (
						<a href={CESG_INFO_URL}>{CESG_ABBREV}</a>)
					</li>
					<ul>
						<li>
							Contributing $2500 annually will get your child $500 annually! (Maximum
							of ${CESG_LIMIT}){' '}
						</li>
					</ul>
					<li>When your child attends post secondary</li>
					<ul>
						<li>The amount you initially put in is returned to you</li>
						<li>
							All investment earnings ({EAP_ABBREV}s) and {CESG_ABBREV} are paid to
							your child (Usually split throughout the duration of post secondary)
						</li>
						<ul>
							<li>These payments are taxable</li>
							<li>
								Post Secondary Students usually have none or little income so the tax
								can be offset by tuition credits
							</li>
							<li>
								If you anticipate your child potentially doing an internship at
								Microsoft (or some other company that pays interns large sums of money),
								it may be wise to withdraw the bulk of the RESP early to avoid money
								being taxed in a higher tax bracket
							</li>
						</ul>
					</ul>
				</ul>
				Plan out a RESP account with the RESP Visualizer!
				<hr />
				<VisualizationWrapper
					showKey={SessionState.showRESP}
					component={<RESPVisualized />}
				/>
			</div>
		),
	},
	RRSP: {
		title: 'Registered Retirement Savings Plan (RRSP)',
		titleHyperlink: 'https://www.wealthsimple.com/en-ca/learn/what-is-rrsp',
		body: (
			<div>
				There are 4 main things you need to know about an RRSP.
				<ul>
					<li>You can only contribute a limited amount.</li>
					<li>Depositing money into your RRSP reduces your taxable income</li>
					<li>
						Withdrawing money forfeits contribution space.
						<br />
						There are exceptions:
						<ul>
							<li>Homebuyers’ Plan (HBP)</li>
							<li>Lifelong Learning Plan (LLP)</li>
						</ul>
					</li>
					<li>All money withdrawn is counted towards your taxable income.</li>
				</ul>
				{/*<VisualizationWrapper showKey={SessionState.showRRSP} component={<RRSPVisualized />}/>*/}
			</div>
		),
	},
	CASH: {
		title: 'Cash Account',
		titleHyperlink: 'https://www.investopedia.com/terms/c/cashaccount.asp',
		body: (
			<div>
				There are two main things to consider in a cash account.
				<ul>
					<li>
						Selling a stock at a gain (Capital Gain)
						<ul>
							<li>50% of your gains are taxed</li>
							<li>The tax is calculated by adding it to your income</li>
						</ul>
					</li>
					<li>
						Selling a stock at a loss (Capital Loss)
						<ul>
							<li>Capital losses can be used to offset capital gains.</li>
						</ul>
					</li>
				</ul>
				{/*<VisualizationWrapper showKey='showTaxes' component={<TaxesVisualized />}/>*/}
			</div>
		),
	},
	MARGIN: {
		title: 'Margin Account',
		titleHyperlink:
			'https://www.investopedia.com/ask/answers/100314/whats-difference-between-cash-account-and-margin-account.asp',
		body: (
			<div>
				<ul>
					<li>Margin accounts are used to borrow money to trade stocks</li>
					<li>
						Beginners should stay away from these accounts because it adds more risk
					</li>
					<li>
						Although, margin accounts may amplify gains, it will also amplify losses!
					</li>
				</ul>
			</div>
		),
	},
};

const TOOLBAR_PROPS = {
	title: 'Accounts',
	currentPath: '/accounts',
	tabs: [
		{
			title: 'TFSA',
			link: 'tfsa',
			component: () => <Definition {...ACCOUNT_TYPES.TFSA} />,
		},
		{
			title: 'RESP',
			link: 'resp',
			component: () => <Definition {...ACCOUNT_TYPES.RESP} />,
		},
		{
			title: 'RRSP',
			link: 'rrsp',
			component: () => <Definition {...ACCOUNT_TYPES.RRSP} />,
		},
		{
			title: 'Cash',
			link: 'cash',
			component: () => <Definition {...ACCOUNT_TYPES.CASH} />,
		},
		{
			title: 'Margin',
			link: 'margin',
			component: () => <Definition {...ACCOUNT_TYPES.MARGIN} />,
		},
	],
};

const AccountTypes = () => {
	const renderTitle = () => {
		if (window.location.pathname === TOOLBAR_PROPS.currentPath) {
			return (
				<div className="center-all">
					<div>
						<h1>Accounts</h1> <br />
						<h2>An account is a container to hold your investments.</h2>
					</div>
				</div>
			);
		}
	};
	return (
		<>
			<Toolbar {...TOOLBAR_PROPS} />
			{renderTitle()}
		</>
	);
};

export default AccountTypes;
