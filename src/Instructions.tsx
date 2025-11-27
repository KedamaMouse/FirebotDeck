import * as React from 'react';
import styled,{ css } from "styled-components";


export const Instructions:React.FC = () => {

    return <Div>
        1. Make actions you want to trigger in firebot as "Preset effect lists" <br/>
        2. If you're connecting from a different machine, enter the IP firebot is running on<br/>
        3. choose your effects from the dropdown to add them as buttons<br/>
    </Div>
}

const Div = styled.div`
    font-size: 20px;
`