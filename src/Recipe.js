import React from "react";

const Recipe = ({title,calories,image,ingredients}) => {
	return (
		<div>
			<h1>{title}</h1>
			<ul>
				{ingredients.map(i => (
					<li>{i.text}</li>
				))}
			</ul>			
            <p>{calories}</p>
            <img src={image}></img>
		</div>
	);
};

export default Recipe;