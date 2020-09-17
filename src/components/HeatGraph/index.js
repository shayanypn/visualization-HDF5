import React, { useRef, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const HeatGraph = ({ item, data }) => {
  const eleRef = useRef(null);
  const [config, setConfig] = useState({
    data: [],
    layout: {}
  });

  useEffect(() => {
    console.log(data.length);
    const startTime = moment(data[0].time*1000).utc().format(DATE_FORMAT);
    const endTime = moment(data[data.length - 1].time*1000).utc().format(DATE_FORMAT);

    setConfig({
      data: [{
        z: data.map(item => item.measurement),
        x: Array(2084).fill().map((x,i)=>i),
        y: data.map(item => moment(item.time*1000).utc().format(DATE_FORMAT)),
        type: 'heatmap',
        hoverongaps: false
      }],
      layout: {
        width: eleRef.current.clientWidth-30,
        height: 500,
        title: ' ',
        margin: {
          l: 85,
          t: 25,
          b: 25,
          r: 25
        },
        xaxis: {
          range: [startTime, endTime],
          type: 'datetime'
        },
      }
    });
  }, [data, data.length]);

  return (
    <section ref={eleRef}>
      <div className="row">
        <div className="col">
          <Plot data={config.data} layout={config.layout} />
        </div>
      </div>
    </section>
  );
}

export default React.memo(HeatGraph);
