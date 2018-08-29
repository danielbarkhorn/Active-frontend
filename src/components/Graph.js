import React from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

export default (props) => {
  return (
    <Plot
      data={[
        {
          x: props.class_A_x,
          y: props.class_A_y,
          mode: 'markers',
					type: 'scatter',
          marker: {color: 'blue'},
        },
        {
					x: props.class_B_x,
					y: props.class_B_y,
					mode: 'markers',
					type: 'scatter',
          marker: {color: 'red'},
				},
				{
					x: props.unlabeled_x,
					y: props.unlabeled_y,
					mode: 'markers',
					type: 'scatter',
					marker: {color: 'gray'},
				},
				{
					x: props.selected_x,
					y: props.selected_y,
					mode: 'markers',
					type: 'scatter',
					marker: {color: 'purple'},
				}
      ]}
      layout={props.layout}
			onClick={(e) => props.handleDataClick(e)}
			useResizeHandler={true}
    />
  );
}
