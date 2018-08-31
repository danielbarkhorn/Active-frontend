import React from 'react';
import Plot from 'react-plotly.js';

export default (props) => {
  const {
    labels,
    xAxis,
    yAxis,
    labeledData,
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
      var trace = {
        x: labeledData[label][xAxis],
        y: labeledData[label][yAxis],
        mode: 'markers',
        types: 'scatter',
        name: label,
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
