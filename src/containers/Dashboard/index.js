import React, { useState, useEffect } from 'react';
import moment from 'moment';
import CompareGraph from '../../components/CompareGraph';
import HeatGraph from '../../components/HeatGraph';

const DATE_FORMAT = 'YYYY/MM/DD HH:mm:ss';

const DashboardType = ({ selected, onClick }) => {
  const type_classname = selected ? 'type-mini' : '';
  return (
    <div className="row mb-4">
      <div className="col">
        <div className={`bx ${type_classname} ${selected === 'comparegraph' ? 'active' : ''}`} onClick={() => onClick('comparegraph')}>
          <i className="fas fa-chart-line"></i>
          <strong>Comparing graph</strong>
          <small>You are be able to compare different time measurement, together in one frame</small>
        </div>
      </div>
      <div className="col">
        <div className={`bx ${type_classname} ${selected === 'heatgraph' ? 'active' : ''}`} onClick={() => onClick('heatgraph')}>
          <i className="fas fa-chart-area"></i>
          <strong>Heat graph</strong>
          <small>Render all measurements as heatmap graph</small>
        </div>
      </div>
    </div>
  )
}

const DashboardSummary = ({ item }) => (
  <section className="p-3">
    <summary className="pl-4 pr-4">
      <div className="row">
        <div className="col">
          <strong>{item.name}</strong><br />
          key: {item.key} <br />
          Collect <strong>{item.sampleNum} samples</strong> 
        </div>
        <div className="col">
          Start: <strong>{moment(item.startTime*1000).utc().format(DATE_FORMAT)}</strong> <br />
          End: <strong>{moment(item.endTime*1000).utc().format(DATE_FORMAT)}</strong> <br />
        </div>
      </div>
    </summary>
  </section>
)

const DashboardLoading = ({ fetched, total }) => {

  let percent = parseInt((fetched/total)*100);
  percent = percent > 100 ? 100 : percent;

  return (
    <div className="row">
      <div className="col text-center p-5">
        <h3>Fetching data, please wait...</h3>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${percent}%`
            }}
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{percent}%</div>
        </div>
      </div>
    </div>
  )
}

const Dashboard = ({ item, onBack }) => {
  const [type, setType] = useState(null);
  const [model, setModel] = useState({
    state: 'loading',
    data: [],
    limit: 50,
    page: 0
  });

  /**
   * Computed properties
   */

  /**
   * Method
   */
  const fetchPagingData = (page) => {
    fetch(`http://localhost:5000/pagingdata/${item.key}/${model.limit}/${page}`)
    .then(res => res.json())
    .then(data => {

      const fetched_count = model.limit * (page+1);
      setModel(prevStat => ({
        ...prevStat,
        page,
        data: prevStat.data.concat(...data)
      }))

      if (fetched_count < item.sampleNum) {
        fetchPagingData(++page)
      }
    })
  };

  /**
   * Observers
   */
  useEffect(() => {
    if (model.data.length === item.sampleNum) {
      setModel(prevStat => ({
        ...prevStat,
        state: 'type'
      }))
    }
  }, [model.data, item.sampleNum]);

  useEffect(() => {
    fetchPagingData(0);
  }, [item.key]);

  return (
    <div>
      <div className="row">
        <div className="col-1">
          <button
            className="btn btn-gray"
            onClick={onBack}
          >
            <i className="fas fa-arrow-left"></i> Back
          </button>
        </div>
        <div className="col">
          <DashboardSummary item={item} />
        </div>
      </div>
      {
        model.state === 'loading' 
        ? <DashboardLoading
            fetched={ model.limit * (model.page+1) }
            total={item.sampleNum}
          />
        : null
      }
      {
        model.state === 'type' 
        ? <DashboardType
          selected={type}
          onClick={_type => setType(_type)}
        />
        : null
      }
      {type === 'comparegraph' && <CompareGraph item={item} data={model.data} />}
      {type === 'heatgraph' && <HeatGraph item={item} data={model.data} />}
    </div>
  );
}

export default Dashboard;
