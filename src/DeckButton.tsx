import * as React from 'react';
import styled,{ css } from "styled-components";

interface IDeckButtonProps
{
    caption : string;
    actionID: string;
    ipAddress: string;
    port: string;
    backgroundColor: string;
    textColor: string;
}

export const DeckButton:React.FC<IDeckButtonProps> = (props) => {
    const onclick= () => {
    fetch('http://'+props.ipAddress+':'+props.port+'/api/v1/effects/preset/' + props.actionID);
    }
    return <Button style={{color: props.textColor, backgroundColor: props.backgroundColor}} onClick={onclick} >{props.caption}</Button>

}

const Button = styled.button`
    font-size: 50px;
    border-radius: 5px;
`