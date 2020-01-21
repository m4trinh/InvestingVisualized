import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Route, Link, Switch } from 'react-router-dom';
import PageNotFound from '../PageNotFound';

const Toolbar = props => {
	const navbarID = `${props.title}Nav`;
	const routing = (
		<>
			<nav className="navbar navbar-expand-lg navbar-light secondary-color">
				<div className="navbar-brand">
					<Link to={props.currentPath}>{props.title}</Link>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target={`#${navbarID}`}
					aria-controls={navbarID}
					aria-expanded="false"
					aria-label={`Toggle ${props.title}`}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id={navbarID}>
					<ul className="navbar-nav">
						{props.tabs.map((tab, i) => (
							<li key={i} className="nav-item">
								<div className="nav-link">
									<Link to={`${props.currentPath}/${tab.link}`}>{tab.title}</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			</nav>
			<Switch>
				{props.tabs.map((tab, i) => (
					<Route
						key={i}
						path={`${props.currentPath}/${tab.link}`}
						component={tab.component}
					/>
				))}
				<Route exact path={`${props.currentPath}`} component={React.Fragment} />
				<Route component={PageNotFound} />
			</Switch>
		</>
	);
	return routing;
};

export default Toolbar;
