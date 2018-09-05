import React from 'react';
import Button from './Button.js';

export default (props) => {
	const {
		num_selected,
		max_selected,
		labelPoints,
		restart,
		xAxis,
		yAxis,
		features,
		handleXAxisChange,
		handleYAxisChange,
		handleMaxSelectedChange,
		activeSelect,
		num_labeled,
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
			<div className={'sidebar__label'}>
				Number of points to select per iteration:
			</div>
			<input
				className='sidebar__max-selection'
				type="number"
				onChange={handleMaxSelectedChange}
				value={max_selected}
				min={1}
				max={10}
			/>
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
			<Button
				className='button button-restart'
				label='Active Select'
				onClick={activeSelect}
			/>
			<div className={'sidebar__label'}>
				X-Axis
			</div>
			<select
				className='sidebar__axis'
				onChange={handleXAxisChange}
				value={xAxis}
			>
			  {features.map(makeOption)}
			</select>
			<div className={'sidebar__label'}>
				Y-Axis
			</div>
			<select
				className='sidebar__axis'
				onChange={handleYAxisChange}
				value={yAxis}
			>
		  	{features.map(makeOption)}
			</select>
		</div>
	)
}
