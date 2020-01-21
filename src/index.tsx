import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import * as serviceWorker from './serviceWorker';
import Home from './Home';
import AccountTypes from './Sections/AccountTypes';
import InvestmentTypes from './Sections/InvestmentTypes';
import Brokers from './Sections/Brokers';
import Resources from './Sections/Resources';
import PageNotFound from './PageNotFound';
import { Toolbar } from '@material-ui/core';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Authentication from './Authentication';

const routing = (
	<Router>
		<nav className="navbar navbar-expand-lg navbar-light primary-color">
			<div className="navbar-brand">
				<Link to="/">Investing Visualized</Link>
			</div>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavDropdown">
				<ul className="navbar-nav">
					<li className="nav-item">
						<div className="nav-link">
							<Link to="/accounts">Accounts</Link>
						</div>
					</li>
					<li className="nav-item">
						<div className="nav-link">
							<Link to="/investments">Investments</Link>
						</div>
					</li>
					<li className="nav-item">
						<div className="nav-link">
							<Link to="/brokers">Brokers</Link>
						</div>
					</li>
					<li className="nav-item">
						<div className="nav-link">
							<Link to="/resources">Resources</Link>
						</div>
					</li>
				</ul>
				{/* 
            <ul className="nav navbar-nav ml-auto">
                <li><div className="nav-link"><Link to="/login">Login</Link></div></li>
            </ul> 
            */}
			</div>
		</nav>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/accounts" component={AccountTypes} />
			<Route path="/investments" component={InvestmentTypes} />
			<Route path="/brokers" component={Brokers} />
			<Route path="/resources" component={Resources} />
			{/* 
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            */}
			<Route component={PageNotFound} />
		</Switch>
	</Router>
);

ReactDOM.render(
	<Authentication>{routing}</Authentication>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
