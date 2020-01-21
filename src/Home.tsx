import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
	<div className="center-all">
		<img src="./images/logos/ivLogo.png" alt="Investing Visualized Logo"></img>
		<h1>Welcome to Investing Visualized!</h1> <br />
		<h2>This is a beginner's guide to investing.</h2> <br />
		<h3>Explore different types of accounts, investments, and resources!</h3>{' '}
		<br />
		<h4>
			Notable Visualizations: <br />
			<Link to="/investments/fund">Compounding Fee Losses</Link> <br />
			<Link to="/accounts/tfsa">Tax Free Savings Account Contribution Room</Link>
		</h4>{' '}
		<br />
		<p>
			Please note that this guide is targeted towards Canadians. The terminology
			may vary depending on your country
		</p>
	</div>
);

export default Home;
