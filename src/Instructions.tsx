import * as React from 'react';
import styled,{ css } from "styled-components";


export const Instructions:React.FC = () => {

    return <Div>
        1. Make actions you want to trigger in firebot as "Preset effect lists" <br/>
        2. In Firebot go to Settings  Setups Create Setup<br/>
        3. Make a setup with your preset effects<br/>
        4. choose file below to import the setup<br/>
    </Div>
}

const Div = styled.div`
    font-size: 20px;
`