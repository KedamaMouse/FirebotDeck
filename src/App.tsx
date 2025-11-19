import React from 'react';
import './App.css';
import { DeckButton } from './DeckButton';

function App() {


  return (
    <div className="App">

    <div className="row"> 
      <div className="col">

      <DeckButton caption='a caption! ' actionID='a62e08df-c863-404c-b0c0-379f3bb75e0c' ipAddress='localhost' port='7472' />
    </div>
     </div>
      </div>
   

         

  );
}

export default App;
