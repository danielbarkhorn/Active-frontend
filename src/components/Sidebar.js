import React from 'react';
import Button from './Button.js';

export default (props) => {
	const {
		num_selected,
		labelPoints,
		restart,
		activeSelect,
		num_labeled,
		max_selected,
		max_labeled,
	} = props;

	const makeOption = (name) => {
		return <option
			key={name}
			value={name}
		>
			{name}
		</option>;
	}

	return (
		<div className='sidebar'>
			<div className='sidebar__selected-count'>
				{num_selected} / {max_selected} points chosen.
			</div>
			<div className='sidebar__labeled-count'>
				{num_labeled} / {max_labeled} points labeled.
			</div>
			<Button
				className='button button-label'
				isDisabled={num_selected !== 4}
				label='Label Selected Points'
				onClick={labelPoints}
			/>
			<Button
				className='button button-restart'
				label='Active Select'
				onClick={activeSelect}
			/>
			<Button
				className='button button-restart'
				isDisabled={num_selected !== 20}
				label='Restart Demo'
				onClick={restart}
			/>
		</div>
	)
}
