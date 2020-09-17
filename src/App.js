import React, { useState } from 'react';
import Menu from './components/Menu';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard';

const ListOfSamples = [
  {
    key: 'test_dataset_1',
    name: 'test dataset 1',
    startTime: 1587729205,
    endTime: 1587739057,
    sampleNum: 610
  }, {
    key: 'test_dataset_2',
    name: 'test dataset 2',
    startTime: 1589388240,
    endTime: 1589390975,
    sampleNum: 38
  }
];

const App = () => {
  const [enableHelp, setEnableHelp] = useState(false);
  const [sample, setSample] = useState(null);

  return (
    <div className={`page ${enableHelp ? 'page-modal' : ''}`}>
      <Menu />
      <main className="pt-2">
          <div className="container-fluid">
          	{sample 
          		? <Dashboard
          			item={sample}
          			onBack={() => setSample(null)}
          		/>
          		: <Home
          		items={ListOfSamples}
          		onClick={sample => setSample(sample)}
          	/>
          	}
          </div>
      </main>
      <aside className={`help ${enableHelp ? 'active' : ''}`}>
        <button
          className="btn btn-help"
          onClick={() => setEnableHelp(false)}
        >
          <i className="fas fa-times"></i>
        </button>
        <h4>Guide</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut 
        </p>
        <div className="alert alert-purple p-4" role="alert">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut 
        </div>
      </aside>
    </div>
  );
}

export default App;
