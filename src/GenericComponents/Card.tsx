import React from 'react';

interface Props {
	imgAlt: string;
	imgSrc: string;
	title: string;
	author: string;
	body: string;
}

const Card = (props: Props) => (
	<div className="card" style={{ width: '20rem', margin: '5px 5px 5px 5px' }}>
		<img className="card-img-top" src={props.imgSrc} alt={props.imgAlt} />
		<div className="card-body">
			<h5 className="card-title">{props.title}</h5>
			<h6 className="card-subtitle mb-2 text-muted">{props.author}</h6>
			<p className="card-text">{props.body}</p>
		</div>
	</div>
);

export default Card;
