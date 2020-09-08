import React, { useEffect, useState } from 'react';
import ReactHighcharts from 'react-highcharts';

const default_setting = {
    chart: {
      type: 'spline',
      zoomType: 'x'
    },
    title: {
      text: ' '
    },
    subtitle: {
      text: ' '
    },
    yAxis: {
      title: {
        text: ' '
      },
    },
    xAxis: {
      type: 'datetime',
    },
    legend: {
      enabled: false
    }
};

const MainChart = ({ items, onClick }) => {
  const [setting, setSetting] = useState(default_setting);

  useEffect(() => {
  	setSetting({
      ...default_setting,
      plotOptions: {
        series: {
          cursor: 'pointer',
          color: '#4e57aa',
          point: {
            events: {
              click: function () {
                if (typeof onClick === 'function'){
                  onClick(this.category/1000, this.y);
                }
              }
            }
          }
        }
      },
      series: [{
        name: 'Sample',
        data: items.map(item => ({
          x: item.time*1000,
          y: item.glucose
        }))
      }]
    });
  }, [items, onClick])

  return (
    <ReactHighcharts
      config={setting}
    />
  );
}

export default MainChart;
