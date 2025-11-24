import React from 'react';
import styled, { css } from "styled-components";

import { DeckButtonsContainer } from './DeckButtonsContainer';
import { Instructions } from './Instructions';

export interface IDeckButton {
  firebotKey: string;
  
  caption: string;
  textColor: string;
  backgroundColor: string;
}

function App() {

  const [buttons, setButtons] = React.useState<IDeckButton[]>([]);
  const [ipAddress, setIPAddress] = React.useState<string>("localHost");
  const [port, setPort] = React.useState<string>("7472");
  const baseApiURL = 'http://'+ipAddress+':'+port+'/api/v1/';

  React.useEffect(() => {
    //this is where we'll read from browser storage for existing values.
    const buttonjson = window.localStorage.getItem("buttons");

    if (buttonjson) {
      const buttons = JSON.parse(buttonjson);
      setButtons(buttons);
    }

  }, []);

  const importConfig: React.ChangeEventHandler<HTMLInputElement> = (event) => {

    if (!event.target.files) { return };
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        const json = JSON.parse(e.target.result as string);
        if (json.components && json.components.presetEffectLists) {
          const buttons: IDeckButton[] = [];
          for (const effect of json.components.presetEffectLists) {
            buttons.push({
              caption: effect.name,
              firebotKey: effect.id,
              textColor: "white",
              backgroundColor: "#790981",

            })
          }
          setButtons(buttons);
          window.localStorage.setItem("buttons", JSON.stringify(buttons));
        }
      }

    };
    reader.readAsText(file);
  }

  return (
    <Container >
      <DeckButtonsContainer buttons={buttons} baseApiURL={baseApiURL} port={port} />
      {buttons.length===0 ? <Instructions/> : null}
      <input type='file' title='Import' onChange={importConfig} />
      <label>IP Address for requests: </label>
      <input type="text" value={ipAddress} onChange={(event)=> setIPAddress(event.target.value)}/>
    </Container>

  );
}

const Container = styled.div`
  background-color: #2a2a2a;
  color: white;
  height: 100%;
`

export default App;
