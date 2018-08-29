import React, { Component } from 'react';

export default (props) => {
	const {
		num_selected,
		max_selected,
		add_selected,
	} = props;

	return (
		<div className='sidebar'>
			<div className='count'>
				{num_selected} / {max_selected} points chosen.
			</div>
			<button
				className='button button-label--disabled'
			>
				Label Selected Points
			</button>
			<button
				className='button button-label'
				onClick={add_selected}
			>
				ADD SELECTED
			</button>
			<button
				className='button'
			>
				Restart
			</button>
		</div>
	)
}

// Label Selected points: will send the newly chosen points & old to the API. Should return
// new labels for points and the new decision boundary
