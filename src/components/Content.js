import React, { Component } from 'react';
import '../assets/styles/main.scss';
import Graph from './Graph.js';
import Sidebar from './Sidebar.js';
import axios from 'axios';
import Modal from 'react-modal';
import Button from './Button.js';
import { withAlert } from 'react-alert';
import { renderStartModal, renderEndModal } from './Modal.js'

Modal.setAppElement(document.getElementById('root'));

class Content extends Component {
  constructor(props) {
		super(props);
    const max_labeled_list = {
      1: 20,
      2: 20,
      3: 21,
      4: 20,
      5: 20,
      6: 18,
      7: 21,
      8: 16,
      9: 18,
      10:20,
    };

		this.state = {
      labels: [],
      features: [],
      xAxis: '',
      yAxis: '',

      unlabeledData: [],
      selectedData: [],
			labeledData: {},

      num_labeled: 0,
      max_labeled_list,
      max_labeled: max_labeled_list[3],
			num_selected: 0,
			max_selected: 3,
      dataRevision: 0,
      empty: [],
      test_X: [],
      test_Y: [],
      results: '',
      isStartOpen: true,
      isEndOpen: false,
		}
	}

  componentDidMount() {
    this.restart();
  }

  restart = () => {
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
      test_X,
      test_Y,
    } = data;

    const labels = Object.keys(labeled);
    const initXAxis = Object.keys(labeled[labels[0]])[0];
    const initYAxis = Object.keys(labeled[labels[0]])[1];
    const features = Object.keys(labeled[labels[0]]);
    const newDataRevision = dataRevision + 1;

    let empty = {};
    for(let featInd = 0; featInd < features.length; featInd++) {
      empty[features[featInd]] = [];
    }

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
        num_labeled: 0,
  			num_selected: 0,
        empty: empty,
        test_X: test_X,
        test_Y: test_Y,
      }
    });
  }

  setStateFromData(data) {
    const {
      labeled,
      unlabeled,
      selected,
      dataRevision,
      numLabeled,
    } = data;

    const newDataRevision = dataRevision + 1;
    const num_selected = selected[this.state.features[0]].length
    let newNumLabeled = numLabeled ? numLabeled : this.state.num_labeled

    this.setState((prevState) => {
      return {
        ...prevState,
        labeledData: labeled,
        unlabeledData: unlabeled,
        selectedData: selected,
        dataRevision: newDataRevision,
        num_selected: num_selected,
        num_labeled: newNumLabeled,
      }
    });
  }

  labelSelectedPoints = () => {
    if(this.state.num_selected === this.state.max_selected){
      if((this.state.num_selected + this.state.num_labeled) === this.state.max_labeled){
        axios.post('http://0.0.0.0:8000/labelAndTest', {
          labeled: this.state.labeledData,
          unlabeled: this.state.unlabeledData,
          selected: this.state.selectedData,
          numLabeled: this.state.num_labeled,
          test_X: this.state.test_X,
          test_Y: this.state.test_Y,
        })
        .then(response => response['data'])
        .then(response => {
          console.log(response);
          this.setStateFromData(response);
          this.setState({
            isEndOpen: true,
            results: response['results'],
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else {
        axios.post('http://0.0.0.0:8000/label', {
          labeled: this.state.labeledData,
          unlabeled: this.state.unlabeledData,
          selected: this.state.selectedData,
          numLabeled: this.state.num_labeled,
        })
        .then(response => response['data'])
        .then(response => {
          this.setStateFromData(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
    else {
      this.props.alert.show('Select more points to label');
    }
  }

  activeSelect = () => {
    if(this.state.num_labeled !== this.state.max_labeled){
      axios.post('http://0.0.0.0:8000/activeSelect', {
        labeled: this.state.labeledData,
        unlabeled: this.state.unlabeledData,
        selected: this.state.selectedData,
        numChosen: this.state.max_selected,
      })
      .then(response => response['data'])
      .then(response => {
        this.setStateFromData(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      this.props.alert.success('You have completed the demo');
    }
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
    let new_selectedData = JSON.parse(JSON.stringify(selectedData), 10);
    let new_selected_x = new_selectedData[xAxis];
    let newDataRevision = dataRevision;

		for (let index = 0; index < new_selected_x.length; index++) {
			if (selectedData[xAxis][index] === point.x && selectedData[yAxis][index] === point.y) {
        for (let featInd = 0; featInd < features.length; featInd++) {
          new_selectedData[features[featInd]].splice(index, 1);
        }
        newDataRevision += 1;
			}
		}

    if(new_selected_x.length === max_selected) {
      this.props.alert.error('You have tried to select too many points. You can deselect points by clicking on a selected point.');
      return;
    }

    if(point.curveNumber !== 3 && point.curveNumber !== 4) {
      this.props.alert.error('You have tried to select a labeled point.');
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

    this.setState((prevState) => {
  		return {
  			...prevState,
  			selectedData: new_selectedData,
        num_selected: new_selected_x.length,
        dataRevision: newDataRevision,
  		}
    });
	}

  handleMaxSelectedChange = (e) => {
    if(this.state.num_labeled === 0){
      const { target: { value } } = e;
      this.setState((prevState) => ({
        max_selected: parseInt(value, 10),
        selectedData: prevState.empty,
        max_labeled: prevState.max_labeled_list[parseInt(value, 10)]
      }));
    }
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

  closeStartModal = () => {
    this.setState({ isStartOpen: false});
  }

  closeEndModal = () => {
    this.setState({ isEndOpen: false});
  }

	render() {
		return (
			<div className='content'>
        <Modal
          isOpen={this.state.isStartOpen}
          onRequestClose={this.closeStartModal}
        >
          {renderStartModal()}
        	<Button
    				onClick={this.closeStartModal}
    				label={'Close'}
            className={'button--small'}
    			/>
        </Modal>
        <Modal
          isOpen={this.state.isEndOpen}
          onRequestClose={this.closeEndModal}
        >
          {renderEndModal(this.state.results)}
        	<Button
    				onClick={this.closeEndModal}
    				label={'Close'}
            className={'button--small'}
    			/>
        </Modal>
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
          num_labeled={this.state.num_labeled}
          max_labeled={this.state.max_labeled}
					add_selected={this.state.addSelected}
          labelPoints={this.labelSelectedPoints}
          activeSelect={this.activeSelect}
          restart={this.restart}
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
          features={this.state.features}
          handleXAxisChange={this.handleXAxisChange}
          handleYAxisChange={this.handleYAxisChange}
          handleMaxSelectedChange={this.handleMaxSelectedChange}
				/>
			</div>
		);
	}
}

export default withAlert(Content);
