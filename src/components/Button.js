import React from 'react';

export default (props) => {
	const {
		isDisabled,
		onClick,
		className,
		label,
	} = props;

	var buttonStyle = 'button ' + className + (isDisabled ? '--disabled' : '');

	return (
		<button
			className={buttonStyle}
			onClick={onClick}
		>
			{label}
		</button>
	)
}
