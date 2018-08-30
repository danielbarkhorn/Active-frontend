import React from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

export default (props) => {
  const {
    labels,
    xAxis,
    yAxis,
    labeledData,
    unlabeled_x,
    unlabeled_y,
    selected_x,
    selected_y,
    handleDataClick,
  } = props;

  const createLayout = () => {
    return {
      width: 1000,
      height: 600,
      autosizer: 'true',
      hovermode: 'closest',
      showlegend: true,
      xaxis: {
        title: xAxis,
      },
      yaxis: {
        title: yAxis,
      }
    }
  };

  const createDataTrace = () => {
    let dataTrace = []

    labels.forEach((label) => {
      var trace = {
        x: labeledData[label][xAxis],
        y: labeledData[label][yAxis],
        mode: 'markers',
        types: 'scatter',
        legendgroup: label,
      }
      dataTrace.push(trace);
    });

    return dataTrace;
  }

  return (
    <Plot
      data={createDataTrace()}
      layout={createLayout()}
			onClick={(e) => handleDataClick(e)}
			useResizeHandler={true}
    />
  );
}


// data={[
//   {
//     x: class_A_x,
//     y: class_A_y,
//     mode: 'markers',
//     type: 'scatter',
//     marker: {color: 'blue'},
//     legendgroup: 'I will show up in the legend',
//   },
//   {
//     x: class_B_x,
//     y: class_B_y,
//     mode: 'markers',
//     type: 'scatter',
//     marker: {color: 'red'},
//   },
//   {
//     x: unlabeled_x,
//     y: unlabeled_y,
//     mode: 'markers',
//     type: 'scatter',
//     marker: {color: 'gray'},
//   },
//   {
//     x: selected_x,
//     y: selected_y,
//     mode: 'markers',
//     type: 'scatter',
//     marker: {color: 'purple'},
//   }
// ]}
