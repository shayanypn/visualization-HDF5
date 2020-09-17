import React, { useRef, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const MainChart = ({ items, onClick }) => {
  const eleRef = useRef(null);
  const [config, setConfig] = useState({
    data: [],
    layout: {}
  });

  const handleClick = (data) => {
    const { y, pointIndex } = data.points[0];
    if (typeof onClick === 'function'){
      const time = data.points[0].data.z[pointIndex];
      onClick(time, y);
    }
  }

  useEffect(() => {
    const startTime = moment(items[0].time*1000).utc().format(DATE_FORMAT);
    const endTime = moment(items[items.length - 1].time*1000).utc().format(DATE_FORMAT);

    setConfig({
      data: [
        {
          z: items.map(item=> item.time),
          x: items.map(item=> moment(item.time*1000).utc().format(DATE_FORMAT)),
          y: items.map(item=> item.glucose),
          mode: 'lines+markers',
          type: 'scatter'
        }
      ],
      layout: {
        width: eleRef.current.clientWidth,
        height: 250,
        margin: {
          l: 25,
          t: 25,
          b: 25,
          r: 25
        },
        xaxis: {
          range: [startTime, endTime],
          type: 'datetime'
        },
      }
    })

  }, [items, onClick])

  return (
    <div ref={eleRef} >
      <Plot
        data={config.data}
        layout={config.layout}
        onClick={handleClick}
      />
    </div>
  );
}

export default MainChart;
