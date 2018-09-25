import React from 'react';
import Plot from 'react-plotly.js';

export default (props) => {
  const {
    labels,
    xAxis,
    yAxis,
    labeledData,
    unlabeledData,
    selectedData,
    handleDataClick,
    dataRevision,
    decisionData,
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

    const selectedTrace = {
      x: selectedData[xAxis],
      y: selectedData[yAxis],
      mode: 'markers',
      types: 'scatter',
      name: 'Selected',
      marker: {
        color: '#f12c1b',
        size: 12,
      },
    }
    dataTrace.push(selectedTrace);

    console.log(decisionData);

    const decisionTrace = {
      x: decisionData.map(x => x[2]),
      y: decisionData.map(x => x[3]),
      mode: 'markers',
      types: 'scatter',
      name: 'Unlabeled',
      marker: {
        color: 'blue',
        size: 12,
      },
    }
    dataTrace.push(decisionTrace);

    return dataTrace;
  }

  const config = {
      showLink: false,
      displayModeBar: false,
    }

  return (
    <div className='graph-container'>
      <Plot
        data={createDataTrace()}
        layout={createLayout()}
  			onClick={(e) => handleDataClick(e)}
  			useResizeHandler={true}
        config={config}
      />
    </div>
  );
}
