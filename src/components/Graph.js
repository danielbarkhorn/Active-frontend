import React from 'react';
import Plot from 'react-plotly.js';

export default (props) => {
  const {
    labels,
    xAxis,
    yAxis,
    labeledData,
    unlabeledData,
    selected_x,
    selected_y,
    handleDataClick,
    dataRevision,
  } = props;

  const createLayout = () => {
    return {
      width: 1000,
      height: 600,
      autosizer: 'true',
      hovermode: 'closest',
      showlegend: true,
      datarevision: dataRevision,
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
      const trace = {
        x: labeledData[label][xAxis],
        y: labeledData[label][yAxis],
        mode: 'markers',
        types: 'scatter',
        name: label,
      }
      dataTrace.push(trace);
    });

    const unlabeledTrace = {
      x: unlabeledData[xAxis],
      y: unlabeledData[yAxis],
      mode: 'markers',
      types: 'scatter',
      name: 'Unlabeled',
      marker: {color: 'gray'},
    }
    dataTrace.push(unlabeledTrace);

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
