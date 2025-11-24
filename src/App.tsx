import React from 'react';
import styled, { css } from "styled-components";

import { DeckButtonsContainer } from './DeckButtonsContainer';
import { Instructions } from './Instructions';

export interface IDeckButton {
  firebotKey: string;
  caption: string;
  textColor: string;
  backgroundColor: string;
  backColorVariable: string;
}

interface IFireBotEffect{
  id: string;
  name: string;
}

function App() {

  const [buttons, setButtons] = React.useState<IDeckButton[]>([]);
  const [ipAddress, setIPAddress] = React.useState<string>("");
  const [port, setPort] = React.useState<string>("7472");
  const baseApiURL = 'http://'+ipAddress+':'+port+'/api/v1/';
  const [effectList, setEffectList] = React.useState<IFireBotEffect[]>([]);

  const pullFirebotEffects = async () => 
  {
    try {
      const effects =await (await fetch(baseApiURL + "effects/preset")).json(); 
      setEffectList(effects);
    } catch (error) { 
    }
  }

  const updateButtonColors = async () => {
       try {
        let updated= false;
        for(const button of buttons){
          const updatedColor= await (await fetch(baseApiURL + "custom-variables/" +button.backColorVariable)).json();
          if(updatedColor && button.backgroundColor != updatedColor){
            button.backgroundColor= updatedColor;
            updated=true;
          }
        }
        if(updated){
          setButtons(buttons.splice(0,buttons.length));
        }

       }
       catch (error) { 
      }
  }

  const saveState= () =>{
    window.localStorage.setItem("buttons", JSON.stringify(buttons));
    window.localStorage.setItem("ipForRequests",ipAddress);
  }

  React.useEffect(() => {
    //this is where we'll read from browser storage for existing values.
    const buttonjson = window.localStorage.getItem("buttons");
    const ipForRequests = window.localStorage.getItem("ipForRequests");
    if(ipForRequests){
      setIPAddress(ipForRequests);
    }
    else{
      setIPAddress("localHost");
    }
    if (buttonjson) {
      const buttons = JSON.parse(buttonjson);
      setButtons(buttons);
    }
  }, []);

  React.useEffect(()=> {
    if(ipAddress !=="") { 
      saveState();
      pullFirebotEffects();
      updateButtonColors();
    }
  },[ipAddress,buttons]);

  const removeButtonHandler= (firebotKey: string) => {
    buttons.splice(buttons.findIndex((deckbutton) => {
      if(deckbutton.firebotKey===firebotKey){
      return true;
    }}),1);
    setButtons(buttons.splice(0,buttons.length));
  }

  const newEffectSelectedHandler: React.ChangeEventHandler<HTMLSelectElement> = (event): void=>{
      const neweffect=effectList.find((effect)=>{if(effect.id === event.target.value){ return true;}});  

      if(neweffect){
        buttons.push({
          caption: neweffect.name,
          firebotKey: neweffect.id,
          textColor: "white",
          backgroundColor: "#790981",
          backColorVariable: (neweffect.name + " deckbuttoncolor"),
        });
      }
      setButtons(buttons.splice(0,buttons.length));
  }

  return (
    <Container >
      <DeckButtonsContainer buttons={buttons} baseApiURL={baseApiURL} removeButtonHandler={removeButtonHandler} afterActionHandler={updateButtonColors}/>
      {buttons.length===0 ? <Instructions/> : null}
      <label>IP Address for requests: </label>
      <input type="text" value={ipAddress} onChange={(event)=> {setIPAddress(event.target.value); }}/>
      <div>
      <select value="" onChange={newEffectSelectedHandler}>
        <option value="">select an effect to add</option>
        {effectList.map((effect, index)=>
          buttons.findIndex((button)=>{if(button.firebotKey === effect.id){return true;}}) < 0 ? 
            <option key={index} value={effect.id}>{effect.name}</option> : null
      )}</select>
      </div>
    </Container>

  );
}

const Container = styled.div`
  background-color: #2a2a2a;
  color: white;
  height: 100%;
`

export default App;
