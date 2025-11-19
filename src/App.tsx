import React from 'react';
import styled,{ css } from "styled-components";

import { DeckButton } from './DeckButton';

function App() {


  return (
    <Container >
      <DeckButton backgroundColor='blue' textColor='white' caption='a caption! ' actionID='a62e08df-c863-404c-b0c0-379f3bb75e0c' ipAddress='localhost' port='7472' />
    </Container>
   

         

  );
}

const Container =styled.div`
background-color: black;
height: 100%;
`

export default App;
