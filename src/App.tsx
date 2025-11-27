import React, { useEffect } from 'react';
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

interface IFireBotEffect {
  id: string;
  name: string;
}

function App() {

  const [buttons, setButtons] = React.useState<IDeckButton[]>([]);
  const [ipAddress, setIPAddress] = React.useState<string>("");
  const [port, setPort] = React.useState<string>("7472");
  const baseApiURL = 'http://' + ipAddress + ':' + port + '/api/v1/';
  const [effectList, setEffectList] = React.useState<IFireBotEffect[]>([]);
  const [failedRequestURL, setFailedRequestURL] = React.useState<string>("");
  //Note we never set the request state because its purpose is to carry data accross timers in a way that doesn't play well with react state.
  const [requestState, setRequestState] = React.useState<{requestNumber: number,lastSuccessfulRequest: number}>({requestNumber: 0, lastSuccessfulRequest: 0});

  const pullFirebotEffects = async () => {
      requestState.requestNumber++;
      const requestNumber = requestState.requestNumber;
    try {
      const effects = await (await fetch(baseApiURL + "effects/preset")).json();
      setFailedRequestURL("");
      requestState.lastSuccessfulRequest=requestNumber;
      setEffectList(effects);
    } catch (error) {
      //if there hasn't been a more recent successful request
      if(requestNumber > requestState.lastSuccessfulRequest){
        setFailedRequestURL(baseApiURL);
      }
    }
  }

  const updateButtonColors = async () => {
    try {
      let updated = false;
      for (const button of buttons) {
        const updatedColor = await (await fetch(baseApiURL + "custom-variables/" + button.backColorVariable)).json();
        if (updatedColor && button.backgroundColor != updatedColor) {
          button.backgroundColor = updatedColor;
          updated = true;
        }
      }
      if (updated) {
        setButtons(buttons.splice(0, buttons.length));
      }
    } catch (error) { }

  }

  useEffect(() => {

    const regexp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    if (regexp.test(ipAddress) || ipAddress.toUpperCase() === "LOCALHOST") {
      const updateFromFirebot = async () => {
          await pullFirebotEffects();
          await updateButtonColors();

      }
      const interval = (failedRequestURL === "") ? 300 : 2000;
      const intervalRef = setInterval(updateFromFirebot, interval);
      return () => {
        clearInterval(intervalRef);
      }

    }
  }, [failedRequestURL, ipAddress]);



  const saveState = () => {
    window.localStorage.setItem("buttons", JSON.stringify(buttons));
    window.localStorage.setItem("ipForRequests", ipAddress);
  }

  React.useEffect(() => {
    //this is where we'll read from browser storage for existing values.
    const buttonjson = window.localStorage.getItem("buttons");
    const ipForRequests = window.localStorage.getItem("ipForRequests");
    if (ipForRequests) {
      setIPAddress(ipForRequests);
    }
    else {
      setIPAddress("localHost");
    }
    if (buttonjson) {
      const buttons = JSON.parse(buttonjson);
      setButtons(buttons);
    }
  }, []);

  React.useEffect(() => {
    if (ipAddress !== "") {
      saveState();
    }
  }, [ipAddress]);

  const removeButtonHandler = (firebotKey: string) => {
    buttons.splice(buttons.findIndex((deckbutton) => {
      if (deckbutton.firebotKey === firebotKey) {
        return true;
      }
    }), 1);
    setButtons(buttons.splice(0, buttons.length));
  }

  const updateButtonProps = (firebotKey: string, props: Partial<IDeckButton>) => {
    const buttonindex = buttons.findIndex((button) => { if (button.firebotKey === firebotKey) { return true; } })
    if (buttonindex >= 0) {
      buttons[buttonindex] = { ...buttons[buttonindex], ...props };
      setButtons(buttons.splice(0, buttons.length));
    }
  }

  const newEffectSelectedHandler: React.ChangeEventHandler<HTMLSelectElement> = (event): void => {
    const neweffect = effectList.find((effect) => { if (effect.id === event.target.value) { return true; } });

    if (neweffect) {
      buttons.push({
        caption: neweffect.name,
        firebotKey: neweffect.id,
        textColor: "white",
        backgroundColor: "#790981",
        backColorVariable: (neweffect.name + " deckbuttoncolor"),
      });
    }
    setButtons(buttons.splice(0, buttons.length));
  }

  return (
    <Container >
      <DeckButtonsContainer buttons={buttons} baseApiURL={baseApiURL} removeButtonHandler={removeButtonHandler}
        afterActionHandler={updateButtonColors} updateButtonProps={updateButtonProps} />
      {buttons.length === 0 ? <Instructions /> : null}
      <label>IP Address for requests: </label>
      <input type="text" value={ipAddress} onChange={(event) => { setIPAddress(event.target.value); }} />
      {failedRequestURL !== "" ? <ConnectionErrorSpan> Failed to connect to firebot at {failedRequestURL}</ConnectionErrorSpan> : null}
      <div>
        <select value="" onChange={newEffectSelectedHandler}>
          <option value="">select an effect to add</option>
          {effectList.map((effect, index) =>
            buttons.findIndex((button) => { if (button.firebotKey === effect.id) { return true; } }) < 0 ?
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

const ConnectionErrorSpan = styled.span`
  color: #bc1111;
`

export default App;
