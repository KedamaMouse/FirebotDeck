import React from 'react';
import styled,{ css } from "styled-components";

import { DeckButtonsContainer } from './DeckButtonsContainer';

export interface IDeckButton
{
    firebotKey: string;
    caption: string;
    textColor: string;
    backgroundColor: string;
}

function App() {
 
  const [buttons, setButtons] = React.useState<IDeckButton[]>([]);
  const [ipAddress, setIPAddress] = React.useState<string>("localHost");
  const [port,setPort] =React.useState<string>("7472");

  React.useEffect(()=>{
    //this is where we'll read from browser storage for existing values.
    setButtons([]);
  },[]);

  const importConfig:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    
    if(!event.target.files){return};
    const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target){
          const json= JSON.parse(e.target.result as string);
          if(json.components && json.components.presetEffectLists){
            const buttons: IDeckButton[] = [];
            for(const effect of json.components.presetEffectLists)
              {
                buttons.push({
                  caption: effect.name,
                  firebotKey: effect.id,
                        textColor: "white",
                   backgroundColor: "blue",

                })
              }
              setButtons(buttons);

          }
        }

      };
      reader.readAsText(file);
  }

  return (
    <Container >
      <DeckButtonsContainer buttons={buttons}  ipAddress={ipAddress} port={port}  />
      <input type='file' title='Import' onChange={importConfig} />
    </Container>
  
  );
}

const Container =styled.div`
background-color: black;
height: 100%;
`

export default App;
