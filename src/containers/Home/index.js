import React from 'react';
import moment from 'moment';

const Home = ({ items, onClick }) => {

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>List of samples</h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <table className="table">
            <thead className="thead-purple">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Sample Count</th>
                <th scope="col">Sample  start/end</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.key}>
                  <td>
                    <strong>{item.name}</strong><br/>
                    <small>key: {item.key}</small>
                  </td>
                  <td>{item.sampleNum} samples</td>
                  <td>
                    {moment(item.startTime*1000).utc().format('YYYY/MM/DD HH:mm:ss')} <br />
                    {moment(item.endTime*1000).utc().format('YYYY/MM/DD HH:mm:ss')}
                  </td>
                  <td>
                    <button className="btn btn-view" onClick={() => onClick(item)}>
                      View <i className="fas fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
