
import * as React from 'react';
import styled,{ css } from "styled-components";
import { IDeckButton } from './App';
import { DeckButton } from './DeckButton';


interface IDeckButtonsContainerProps{
    buttons: IDeckButton[];
    baseApiURL: string;
    removeButtonHandler:(firebotKey: string) => void;

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
            baseApiURL={props.baseApiURL}
            removeButtonHandler={props.removeButtonHandler}
        />))}
    </ContainingDiv>
}

const ContainingDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`
