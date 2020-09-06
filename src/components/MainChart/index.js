import React, { useEffect, useState } from 'react';
import ReactHighcharts from 'react-highcharts';

const MainChart = ({ items }) => {
  const [setting, setSetting] = useState([]);

  useEffect(() => {
  	setSetting({
	  chart: {
	    type: 'spline',
	    zoomType: 'x'
	  },
	  xAxis: {
	    type: 'datetime',
	  },
		plotOptions: {
	    series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              console.log('ts: ' + this.category);
            }
          }
        }
	    }
		},
	  series: [{
	    data: items.map(item => ({
	    	x: item.time,
	    	y: item.glucose
	    }))
	  }]
	});
  }, [items])

  return (
    <div>
      <ReactHighcharts
        config={setting}
      />
    </div>
  );
}

export default MainChart;
