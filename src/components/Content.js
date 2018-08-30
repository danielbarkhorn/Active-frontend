import React, { Component, Fragment } from 'react';
import '../assets/styles/main.scss';
import Graph from '../components/Graph.js';
import Sidebar from '../components/Sidebar.js';
import axios from 'axios';

export default class Content extends Component {
  constructor(props) {
		super(props);

		this.state = {
      labels: [],
      xAxis: '',
      yAxis: '',

      unlabeled_x: [],
      unlabeled_y: [],

      selected_x: [],
      selected_y: [],

			labeledData: {},

			num_selected: 0,
			max_selected: 3,
		}
	}

  componentDidMount() {
    axios.get('http://0.0.0.0:8000/restart')
    .then(response => response['data'])
    .then(response => {
      this.initializeStateFromData(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  initializeStateFromData(data) {
    const labels = Object.keys(data);
    const initXAxis = Object.keys(data[labels[0]])[0];
    const initYAxis = Object.keys(data[labels[0]])[1];

    this.setState((prevState) => {
      return {
        ...prevState,
        labels: labels,
        xAxis: initXAxis,
        yAxis: initYAxis,
        labeledData: data,
      }
    });
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

    if(new_selected_x.length === this.state.max_selected || point.curveNumber !== 0) {
      // make this an alert
      console.log('You have selected as many points as you are allowed, or you have tried to select a labeled point.');
      return prevState;
    }

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

  }

  restart = () =>
  {
    axios.get('http://0.0.0.0:8000/restart')
    .then(function (response) {
      const { data } = response;
      this.setState((prevState) => {
        return {
          labeledData: data,
          ...prevState,
        }
      });
      console.log('done?');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

	render() {
		return (
			<div className='content'>
				 <Graph
          labels={this.state.labels}
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
					labeledData={this.state.labeledData}
					unlabeled_x={this.state.unlabeled_x}
					unlabeled_y={this.state.unlabeled_y}
					selected_x={this.state.selected_x}
					selected_y={this.state.selected_y}
					handleDataClick={this.handleDataClick}
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
