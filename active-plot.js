import React, { Component } from 'react';
import Plot from 'react-plotly.js';
//import PropTypes from 'prop-types';

export default class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDisabled: false,

      // Data Points
      class_A_x: [1,2,3],
      class_A_y: [4,4,4],

      class_B_x: [4,5,3],
      class_B_y: [1,2,1],

      unlabeled_x: [],
      unlabeled_y: [],

      selected_x: [1, 4],
      selected_y: [4, 1],
    }
  }

  handleDataClick = (e) => this.setState((prevState) => {
		let { points: [ point ]} = e;
    let new_selected_x = prevState.selected_x;
    let new_selected_y = prevState.selected_y;
    console.log('clicked');

		for (let index = 0; index < new_selected_x.length; index++) {
			if (prevState.selected_x[index] === point.x && prevState.selected_y[index] === point.y) {
				new_selected_x.splice(index, 1);
				new_selected_y.splice(index, 1);

				return {
					selected_x: new_selected_x,
					selected_y: new_selected_y,
				};
			}
		}

		new_selected_x.push(point.x);
		new_selected_y.push(point.y);

		return {
			selected_x: new_selected_x,
			selected_y: new_selected_y,
		};
	});

  render() {
    const {
      class_A_x,
      class_A_y,
      class_B_x,
      class_B_y,
      unlabeled_x,
      unlabeled_y,
      selected_x,
      selected_y,

      handleDataClick,
    } = this.state

    return (
      <Plot
        data={[
          {
            x: class_A_x,
            y: class_A_y,
            mode: 'markers',
  					type: 'scatter',
            marker: {color: 'blue'},
            //name: 'Class A',
          },
          {
  					x: class_B_x,
  					y: class_B_y,
  					mode: 'markers',
  					type: 'scatter',
            marker: {color: 'red'},
            //name: 'Class B',
  				},
  				{
  					x: unlabeled_x,
  					y: unlabeled_y,
  					mode: 'markers',
  					type: 'scatter',
  					marker: {color: 'purple'},
            //name: 'Unlabeled',
  				},
  				{
  					x: selected_x,
  					y: selected_y,
  					mode: 'markers',
  					type: 'scatter',
  					marker: {color: 'black'},
            //name: 'To be Labeled',
  				}
        ]}
        layout={
  				{
  					width: 1000,
  					height: 600,
  					autosizer: 'false',
  					hovermode: 'closest',
            xaxis: {
              range: [0, 8]
            },
            yaxis: {
              range: [0, 8]
            },
            showlegend: 'false',
  				}
  			}
  			onClick={(e) => this.handleDataClick(e)}
  			style={
  				{
  					display: 'inline-block',
  					height: '100%',
  					width: '100%',
  				}
  			}
  			useResizeHandler={true}
      />
    );
  }
};
