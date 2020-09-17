import React, { useRef, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const MultiMeasurementChart = ({ items }) => {
  const eleRef = useRef(null);
  const [config, setConfig] = useState({
    data: [],
    layout: {}
  });

  useEffect(() => {
    setConfig({
      data: items.map(item => ({
        type: 'scatter',
        x: Array(2084).fill().map((x,i)=>i),
        y: item.measurements,
        name: moment(item.ts*1000).utc().format(DATE_FORMAT),
        line: {color: item.color }
      })),
      layout: {
        paper_bgcolor: '#e1e6f5',
        plot_bgcolor: '#e1e6f5',
        colorscale: '#fff',
        showlegend: false,
        width: eleRef.current.clientWidth,
        height: 400,
        legend: {
          y: 40
        },
        margin: {
          l: 25,
          t: 25,
          b: 25,
          r: 5
        }
      }
    })


  }, [items])

  return (
    <div ref={eleRef} >
      <Plot
        data={config.data}
        layout={config.layout}
      />
    </div>
  );
}

export default MultiMeasurementChart;
