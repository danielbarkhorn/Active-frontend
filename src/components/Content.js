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
      features: [],
      xAxis: '',
      yAxis: '',

      unlabeledData: [],
      selectedData: [],
			labeledData: {},

			num_selected: 0,
			max_selected: 3,
      dataRevision: 0,
		}
	}

  componentDidMount() {
    this.restart();
  }

  restart = () =>
  {
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
    const {
      labeled,
      unlabeled,
      selected,
      dataRevision,
    } = data;

    const labels = Object.keys(labeled);
    const initXAxis = Object.keys(labeled[labels[0]])[0];
    const initYAxis = Object.keys(labeled[labels[0]])[1];
    const features = Object.keys(labeled[labels[0]]);
    const newDataRevision = dataRevision + 1;

    this.setState((prevState) => {
      return {
        ...prevState,
        labels: labels,
        xAxis: initXAxis,
        yAxis: initYAxis,
        labeledData: labeled,
        unlabeledData: unlabeled,
        selectedData: selected,
        features: features,
        dataRevision: newDataRevision,
      }
    });
  }

  labelSelectedPoints = () => {
    axios.post('http://0.0.0.0:8000/label', {
      labeled: this.state.labeledData,
      unlabeled: this.state.unlabeledData,
      selected: this.state.selectedData,
    })
    .then(response => response['data'])
    .then(response => {
      console.log(response);
      this.initializeStateFromData(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

	handleDataClick = (e) => {
    const {
      selectedData,
      unlabeledData,
      xAxis,
      yAxis,
      dataRevision,
      features,
      max_selected
    } = this.state;

		let { points: [ point ]} = e;
    let new_selectedData = JSON.parse(JSON.stringify(selectedData));
    let new_selected_x = new_selectedData[xAxis];
    let new_selected_y = new_selectedData[yAxis];
    let newDataRevision = dataRevision;

		for (let index = 0; index < new_selected_x.length; index++) {
			if (selectedData[xAxis][index] === point.x && selectedData[yAxis][index] === point.y) {
        for (let featInd = 0; featInd < features.length; featInd++) {
          new_selectedData[features[featInd]].splice(index, 1);
        }
        console.log('removing');
        newDataRevision += 1;
			}
		}

    if(new_selected_x.length === max_selected || (point.curveNumber !== 3 && point.curveNumber !== 4)) {
      // make this a pretty alert
      console.log('You have selected as many points as you are allowed, or you have tried to select a labeled point.');
      return;
    }

    if(selectedData[xAxis].length === new_selected_x.length){
      for(let unlabeledInd = 0; unlabeledInd < unlabeledData[features[0]].length; unlabeledInd++){
        if(unlabeledData[xAxis][unlabeledInd] === point.x && unlabeledData[yAxis][unlabeledInd] === point.y){
          for (let featInd = 0; featInd < features.length; featInd++) {
            new_selectedData[features[featInd]].push(unlabeledData[features[featInd]][unlabeledInd]);
          }
          newDataRevision += 1;
          break;
        }
      }
    }

    console.log(new_selectedData);

    this.setState((prevState) => {
  		return {
  			...prevState,
  			selectedData: new_selectedData,
        num_selected: new_selected_x.length,
        dataRevision: newDataRevision,
  		}
    });
	}

  handleXAxisChange = (e) => {
    const { target: { value } } = e;
    const newDataRevision = this.state.dataRevision + 1;
    this.setState(() => (
      {
        xAxis: value,
        dataRevision: newDataRevision,
      }
    ));
  }

  handleYAxisChange = (e) => {
    const { target: { value } } = e;
    const newDataRevision = this.state.dataRevision + 1;
    this.setState(() => (
      {
        yAxis: value,
        dataRevision: newDataRevision,
      }
    ));
  }

	render() {
		return (
			<div className='content'>
				 <Graph
          labels={this.state.labels}
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
					labeledData={this.state.labeledData}
					unlabeledData={this.state.unlabeledData}
					selectedData={this.state.selectedData}
					handleDataClick={this.handleDataClick}
          dataRevision={this.state.dataRevision}
				/>
				<Sidebar
					num_selected={this.state.num_selected}
					max_selected={this.state.max_selected}
					add_selected={this.state.addSelected}
          labelPoints={this.labelSelectedPoints}
          restart={this.restart}
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
          features={this.state.features}
          handleXAxisChange={this.handleXAxisChange}
          handleYAxisChange={this.handleYAxisChange}
				/>
			</div>
		);
	}
}
