import React, { useEffect, useState } from 'react';
import ReactHighcharts from 'react-highcharts';

const MainChart = ({ items, onClick }) => {
  const [setting, setSetting] = useState([]);

  useEffect(() => {
  	setSetting({
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
        name: 'Data one',
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
