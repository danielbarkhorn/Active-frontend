import React, { Component, Fragment } from 'react';
import '../assets/styles/main.scss';
import Graph from '../components/Graph.js';
import Sidebar from '../components/Sidebar.js';

export default class Content extends Component {
  constructor(props) {
		super(props);

		this.state = {
			class_A_x: [1,2,3],
      class_A_y: [4,4,4],

      class_B_x: [4,5,3],
      class_B_y: [1,2,1],

      unlabeled_x: [5,5],
      unlabeled_y: [6,7],

      selected_x: [],
      selected_y: [],

			num_selected: 0,
			max_selected: 3,
			layout:	{
				width: 1000,
				height: 600,
				autosizer: 'true',
				hovermode: 'closest',
				showlegend: false,
			},
		}
		console.log(this.state);
	}

	handleDataClick = (e) => this.setState((prevState) => {
		let { points: [ point ]} = e;
    let new_selected_x = prevState.selected_x.slice();
    let new_selected_y = prevState.selected_y.slice();

		for (let index = 0; index < new_selected_x.length; index++) {
			if (prevState.selected_x[index] === point.x && prevState.selected_y[index] === point.y) {
				new_selected_x.splice(index, 1);
				new_selected_y.splice(index, 1);
			}
		}

    if(prevState.selected_x.length === new_selected_x.length){
      new_selected_x.push(point.x);
  		new_selected_y.push(point.y);
    }

    if(new_selected_x.length > this.state.max_selected) {
      // Make this an alert
      console.log('You have selected as many points as you are allowed');
      return prevState;
    }

		return {
			...prevState,
			selected_x: new_selected_x,
			selected_y: new_selected_y,
      num_selected: new_selected_x.length,
		};
	});

	addSelected = () => {
		console.log('addSelected');
		console.log(this.state);
		this.setState(() => ({
	    num_selected: 2,
	  }));
		console.log(this.state);
	}

	render() {
		return (
			<div className='content'>
				 <Graph
					class_A_x={this.state.class_A_x}
					class_A_y={this.state.class_A_y}
					class_B_x={this.state.class_B_x}
					class_B_y={this.state.class_B_y}
					unlabeled_x={this.state.unlabeled_x}
					unlabeled_y={this.state.unlabeled_y}
					selected_x={this.state.selected_x}
					selected_y={this.state.selected_y}
					handleDataClick={this.handleDataClick}
					layout={this.state.layout}
				/>
				<Sidebar
					num_selected={this.state.num_selected}
					max_selected={this.state.max_selected}
					add_selected={this.addSelected}
				/>
			</div>
		);
	}
}
