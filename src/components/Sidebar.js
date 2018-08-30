import React, { Component } from 'react';
import Button from './Button.js';

export default (props) => {
	const {
		num_selected,
		max_selected,
		add_selected,
		labelPoints,
		restart
	} = props;

	return (
		<div className='sidebar'>
			<div className='sidebar-count'>
				{num_selected} / {max_selected} points chosen.
			</div>
			<Button
				className='button button-label'
				isDisabled={num_selected !== max_selected}
				label='Label Selected Points'
				onClick={labelPoints}
			/>
			<Button
				className='button button-restart'
				isDisabled={num_selected !== max_selected}
				label='Restart Demo'
				onClick={restart}
			/>
		</div>
	)
}
