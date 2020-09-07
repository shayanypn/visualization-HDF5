import React, { useEffect, useState } from 'react';
import MainChart from './components/MainChart';
import MeasurementChart from './components/MeasurementChart';

const SAMPLES = {
  ONE: 'test_dataset_1',
  TWO: 'test_dataset_2'
};

const App = () => {
  const emptySelected = {ts:0, glucose: null};
  const [model, setModel] = useState({
    sample: SAMPLES.ONE
  });
  const [glucose, setGlucose] = useState([]);
  const [selected, setSelected] = useState(emptySelected);
  const [enableHelp, setEnableHelp] = useState(false);

  const handleMeasureSelect = (ts, glucose) => setSelected({ts, glucose});

  const handleSample = (sample) => {
    setModel(prevState=> ({...prevState, sample }));
    setGlucose([]);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/data/${model.sample}`)
    .then(res => res.json())
    .then(res => setGlucose(res))
  }, [model.sample])

  return (
    <div className={`page ${enableHelp ? 'page-modal' : ''}`}>
      <aside>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <a href="/">
              <i className="fas fa-tachometer-alt"></i>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/">
              <i className="fas fa-signal"></i>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/">
              <i className="fas fa-network-wired"></i>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/">
              <i className="fas fa-cog"></i>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/">
              <i className="fas fa-sign-out-alt"></i>
            </a>
          </li>
        </ul>
      </aside>
      <main className="pt-2">
          <div className="container">
            {
              selected.ts
              ? <MeasurementChart
                  sample={model.sample}
                  ts={selected.ts}
                  glucose={selected.glucose}
                  onBack={() => setSelected(emptySelected)}
                />
              : <div>
                <div className="row">
                  <div className="col">
                    <section>
                      <header className="p-3">
                        <div className="row">
                          <div className="col">
                            <nav className="nav nav-pills">
                              <a 
                                className={`nav-link ${model.sample === 'test_dataset_1' ? 'active' : ''}`} 
                                onClick={() => handleSample(SAMPLES.ONE)}
                                href="#"
                              >
                                Sample data one
                              </a>
                              <a 
                                className={`nav-link ${model.sample === 'test_dataset_2' ? 'active' : ''}`} 
                                onClick={() => handleSample(SAMPLES.TWO)}
                                href="#"
                              >
                                Sample data two
                              </a>
                            </nav>
                          </div>
                          <div className="col">
                            <button
                              className="btn btn-help"
                              onClick={() => setEnableHelp(true)}
                            >
                              <i className="fas fa-question-circle"></i>
                            </button>
                          </div>
                        </div>
                      </header>
                      <MainChart
                        items={glucose}
                        onClick={handleMeasureSelect}
                      />
                    </section>
                  </div>
                </div>
              </div>
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
