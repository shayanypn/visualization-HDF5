import React, { useEffect, useState } from 'react';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';

const defaultSetting = {
  chart: {
    zoomType: 'x'
  },
  title: {
    text: ' '
  },
  subtitle: {
    text: ' '
  },
  plotOptions: {
    series: {
      color: '#bbb7e4',
    }
  },
  yAxis: {
    title: { text: ' ' }
  },
  legend: {
    enabled: false
  },
  series: []
};

const MeasurementChart = ({ sample, ts, glucose, onBack }) => {
  const [setting, setSetting] = useState(defaultSetting);

  const handleConfigureChart = (data) => {
    setSetting({
      ...defaultSetting,
      series: [{
        name: 'Measurement',
        data: data
      }]
    });
  }

  useEffect(() => {
    fetch(`http://localhost:5000/data/${sample}/${ts}`)
    .then(res => res.json())
    .then(res => handleConfigureChart(res))
  }, [ts, sample])

  return (
    <section>
      <header>
        <button
          className="btn btn-default"
          onClick={onBack}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </header>
      <summary className="pl-2 pr-2">
        <div className="alert alert-light" role="alert">
          Measurement of Wave samples at <b>{moment(ts*1000).utc().format('YYYY/MM/DD HH:mm:ss')}</b> with the glucose of <b>{glucose}</b>
        </div>
      </summary>
      <ReactHighcharts
        config={setting}
      />
    </section>
  );
}

export default MeasurementChart;
