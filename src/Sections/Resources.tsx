import React from 'react';
import Card from '../GenericComponents/Card';
import Definition from '../GenericComponents/Definition';
import Container from '../GenericComponents/Container';
const BOOKS = [
	{
		imgAlt: 'Little Book of Common Sense Investing Book Image',
		imgSrc: './images/books/littlebook.png',
		title: 'Little Book of Common Sense Investing',
		author: 'John Bogle',
		body: `Short and Concise Book on why you should stay away from high cost mutual funds and go to Index Fund Investing instead.
                Written by John Bogle, the inventor of the first index fund!`,
	},
	{
		imgAlt: 'The Intelligent Investor Book Image',
		imgSrc: './images/books/intelligent.png',
		title: 'The Intelligent Investor',
		author: 'Benjamin Graham',
		body: `A more in depth and breadth book on investing. You should read this if you are interested in learning more about the markets.`,
	},
];

const RESOURCE_DEFINITION = {
	title: 'Resources',
	body: (
		<>
			<div>
				The Little of Book of Common Sense Investing is really all you need to get
				started.
			</div>
			<hr />
			<Container>
				<div className="row">
					{BOOKS.map((book, i) => (
						<Card key={i} {...book} />
					))}
				</div>
			</Container>
		</>
	),
};

const Resources = props => {
	return <Definition {...RESOURCE_DEFINITION} />;
};

export default Resources;
