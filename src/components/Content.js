import React, { Component, Fragment } from 'react';
import '../assets/styles/main.scss';
import Graph from '../components/Graph.js';
import Sidebar from '../components/Sidebar.js';
import axios from 'axios';

export default class Content extends Component {
  constructor(props) {
		super(props);

		this.state = {
			class_A_x: [1,2,3],
      class_A_y: [4,4,4],

      class_B_x: [4,5,3],
      class_B_y: [1,2,1],

      unlabeled_x: [5,5,1],
      unlabeled_y: [6,7,1],

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
    console.log(e);

		for (let index = 0; index < new_selected_x.length; index++) {
			if (prevState.selected_x[index] === point.x && prevState.selected_y[index] === point.y) {
				new_selected_x.splice(index, 1);
				new_selected_y.splice(index, 1);
			}
		}

    if(new_selected_x.length === this.state.max_selected) {
      // make this an alert
      console.log('You have selected as many points as you are allowed');
      return prevState;
    }

    const unlabeled_x_ind = prevState.unlabeled_x.indexOf(point.x);
    const unlabeled_y_ind = prevState.unlabeled_y.indexOf(point.y);

    // if(unlabeled_x_ind === -1 || unlabeled_y_ind === -1 || unlabeled_x_ind !== unlabeled_y_ind){
    //   console.log('You have selected a point that is already labeled. Select an unlabeled point');
    //   return prevState;
    // }

    if(prevState.selected_x.length === new_selected_x.length){
      new_selected_x.push(point.x);
  		new_selected_y.push(point.y);
    }

		return {
			...prevState,
			selected_x: new_selected_x,
			selected_y: new_selected_y,
      num_selected: new_selected_x.length,
		};
	});

  retrieveData = () => {
    console.log('about to call axios');
    axios.get('http://0.0.0.0:8000/restart')
    .then(function (response) {
      console.log('Response');
      console.log(response);
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    });
  }

  restart = () =>
  {
    //calls api, get's points, setState. This should be caled on
    // componentdidmount
    console.log('restart');
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
          labelPoints={this.retrieveData}
          restart={this.restart}
				/>
			</div>
		);
	}
}
