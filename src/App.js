import React, { Suspense } from 'react';
import './App.css';
import { AppRoute } from 'router';

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<p>Loading.....</p>}>
        <AppRoute />
      </Suspense>
    </div>
  );
};

export default App;
