
import * as React from 'react';
import styled,{ css } from "styled-components";
import { IDeckButton } from './App';
import { DeckButton } from './DeckButton';


interface IDeckButtonsContainerProps{
    buttons: IDeckButton[];
    ipAddress: string;
    port: string;

}

export const DeckButtonsContainer:React.FC<IDeckButtonsContainerProps> = (props) => {
    
    return <ContainingDiv>
        {props.buttons.map((button, index) => (
        <DeckButton 
            key={index}
            actionID={button.firebotKey} 
            backgroundColor={button.backgroundColor} 
            caption={button.caption}
            textColor={button.textColor}
            ipAddress={props.ipAddress}
            port={props.port}
        />))}
    </ContainingDiv>
}

const ContainingDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`
