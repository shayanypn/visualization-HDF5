import React, { Component } from 'react';
import moment from 'moment';
import MainChart from '../MainChart';
import MultiMeasurementChart from '../MultiMeasurementChart';

const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

class CompareGraph extends Component {

  constructor(props){
    super(props);
    this.state = {
      selected: []
    };
  }

  handleMeasureSelect = (ts, glucose) => {
    const { selected } = this.state;
    const { data } = this.props
    const isSelected = selected.find(item => item.ts === ts);

    if (!isSelected) {
      const measurements = data.find(item => item.time === ts);
      if (measurements) {
        this.setState({
          selected: [...selected, {
            ts,
            glucose,
            color: colors[selected.length],
            measurements: measurements.measurement,
            visible: true
          }]
        })
      }
    } else {
      this.setState({
        selected: selected.filter(item => item.ts !== ts)
      })
    }
  };

  handleToggleSelect = (ts) => {
    const { selected } = this.state;

    this.setState({
      selected: selected.map(item => {
          if (item.ts === ts) {
            item.visible = !item.visible;
          }

          return item;
        })
    })
  }


  render() {
    const { selected } = this.state;
    const { data } = this.props


    return (
      <section>
        <div className="row">
          <div className="col">
            {(data && data.length) && <MainChart
              items={data}
              selected={selected}
              onClick={this.handleMeasureSelect}
            />}
          </div>
        </div>
        <section className="multi-measure m-2">
        {
          selected.length
          ? (
            <div className="row">
              <div className="col-9">
                <MultiMeasurementChart
                  items={selected.filter(item => item.visible)}
                />
              </div>
              <div className="col-3">
                <h4 className="text-center">Selected times</h4>
                <ul className="list-group list-group-flush list-group-selected">
                  {selected.map(item => (
                    <li key={item.ts} className="list-group-item d-flex justify-content-between align-items-center">
                      <button className="btn" onClick={() => this.handleToggleSelect(item.ts, null)}>
                        <i className={`fas fa-${item.visible ? 'eye' : 'eye-slash'}`}></i>
                      </button>
                      <span className="badge badge-primary badge-pill" style={{
                        background: item.color,
                        padding: '10px'
                      }}> </span>
                      {moment(item.ts*1000).utc().format('YYYY/MM/DD HH:mm:ss')}
                      <button className="btn" onClick={() => this.handleMeasureSelect(item.ts, null)}>
                        <i className="fas fa-times"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
          : (<div className="row">
          <div className="col">
            <p className="text-center m-0">Select your desire time, to be able to compare their measurements</p>
          </div>
        </div>)
        }
        </section>
      </section>
    );
  }
}


export default React.memo(CompareGraph);
