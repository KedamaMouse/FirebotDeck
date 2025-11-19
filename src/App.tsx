import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={()=>{fetch('http://localhost:7472/api/v1/effects/preset/a62e08df-c863-404c-b0c0-379f3bb75e0c')}}
         
        >
test this!        </button>
      </header>
    </div>
  );
}

export default App;
