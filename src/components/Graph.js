import React from 'react';
import Plot from 'react-plotly.js';

export default (props)=> {
  const {
    labels,
    xAxis,
    yAxis,
    labeledData,
    unlabeledData,
    selectedData,
    handleDataClick,
    dataRevision,
    decisionInt,
    decisionCoef,
  } = props;

  const createLayout = () => {
    return {
      width: window.innerWidth - 300,
      height: window.innerHeight - 150,

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

    const y_a1 = -1 * ((decisionCoef[0][0] * 1) / decisionCoef[0][1] + (decisionInt[0] / decisionCoef[0][1]))
    const y_a2 = -1 * ((decisionCoef[0][0] * 5) / decisionCoef[0][1] + (decisionInt[0] / decisionCoef[0][1]))

    const y_b1 = -1 * ((decisionCoef[1][0] * 1) / decisionCoef[1][1] + (decisionInt[1] / decisionCoef[1][1]))
    const y_b2 = -1 * ((decisionCoef[1][0] * 5) / decisionCoef[1][1] + (decisionInt[1] / decisionCoef[1][1]))

    const y_c1 = -1 * ((decisionCoef[2][0] * 1) / decisionCoef[2][1] + (decisionInt[2] / decisionCoef[2][1]))
    const y_c2 = -1 * ((decisionCoef[2][0] * 5) / decisionCoef[2][1] + (decisionInt[2] / decisionCoef[2][1]))

    const decisionTrace1 = {
      x: [1, 5],
      y: [y_a1, y_a2],
      mode: 'lines',
      types: 'scatter',
      name: 'A vs B Boundary',
      marker: {
        color: 'pink',
        size: 12,
      },
    }
    dataTrace.push(decisionTrace1);

    const decisionTrace2 = {
      x: [1, 5],
      y: [y_b1, y_b2],
      mode: 'lines',
      types: 'scatter',
      name: 'A vs B Boundary',
      marker: {
        color: 'cyan',
        size: 12,
      },
    }
    dataTrace.push(decisionTrace2);

    const decisionTrace3 = {
      x: [1, 5],
      y: [y_c1, y_c2],
      mode: 'lines',
      types: 'scatter',
      name: 'B vs C Boundary',
      marker: {
        color: 'yellow',
        size: 12,
      },
    }
    dataTrace.push(decisionTrace3);

    return dataTrace;
  }

  const config = {
      showLink: false,
      displayModeBar: false,
      responsive: true,
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
