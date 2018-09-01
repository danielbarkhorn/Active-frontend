import React, { Component } from 'react';
import Button from './Button.js';

export default (props) => {
	const {
		num_selected,
		max_selected,
		add_selected,
		labelPoints,
		restart,
		xAxis,
		yAxis,
		features,
		handleXAxisChange,
		handleYAxisChange,
		activeSelect,
	} = props;

	const makeOption = (name) => {
		return <option key={name} value={name}>{name}</option>;
	}

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
			<Button
				className='button button-restart'
				label='Active Select'
				onClick={activeSelect}
			/>
			<select
				onChange={handleXAxisChange}
				value={xAxis}
			>
			  {features.map(makeOption)}
			</select>
			<select
			onChange={handleYAxisChange}
				value={yAxis}
			>
		  	{features.map(makeOption)}
			</select>
		</div>
	)
}
