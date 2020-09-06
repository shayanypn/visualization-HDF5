import React, { useEffect, useState } from 'react';
import MainChart from './components/MainChart';

const App = () => {
  const [glucose, setGlucose] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/data')
    .then(res => res.json())
    .then(res => {
      setGlucose(res);
    })
  }, [])

  return (
    <main>
      <MainChart
        items={glucose}
      />
    </main>
  );
}

export default App;
