
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuPortal, ContextMenuTrigger } from "@radix-ui/react-context-menu";
import styled,{ css } from "styled-components";
import { IDeckButton } from "./App";


interface IDeckButtonProps
{
    caption : string;
    actionID: string;
    baseApiURL: string;
    backgroundColor: string;
    textColor: string;
    removeButtonHandler:() => void;
    afterActionHandler: () => void; 
    updateButtonProps: (props: Partial<IDeckButton>) => void;
    backColorVariable: string;
}

export const DeckButton:React.FC<IDeckButtonProps> = (props) => {
    const onclick= async () => {
        const url =props.baseApiURL + '/effects/preset/' + props.actionID;
        try {
              await fetch(url);
              props.afterActionHandler();
        } catch (error) {
            alert("request failed. is firebot running? Request: "+ url);
        }
           
       
    }
    return <>
    <ContextMenu>
    <ContextMenuTrigger>

        <Button style={{color: props.textColor, backgroundColor: props.backgroundColor}} onClick={onclick} >{props.caption}</Button>
    </ContextMenuTrigger>
        <ContextMenuPortal>

        </ContextMenuPortal>
        <ContextMenuContent>
        <ContextMenuItem onClick={() => props.removeButtonHandler()}>
            <ContextMenuItemDiv>Remove Button</ContextMenuItemDiv>
        </ContextMenuItem>

        <ContextMenuItem onClick={() => {
            const variable=prompt("Firebot custom variable name to look to. current value: '"+props.backColorVariable+"'");
            if(variable){
                props.updateButtonProps({backColorVariable: variable})
            }
        }
        }>
            <ContextMenuItemDiv>set color variable</ContextMenuItemDiv>
        </ContextMenuItem>

        </ContextMenuContent>

    </ContextMenu>
    </>

}

const ContextMenuItemDiv= styled.div`
    background-color: white;
    color: black;
    :hover
    {
        background-color: #e094d2;
    }
`

const Button = styled.button`
    font-size: 50px;
    border-radius: 5px;
    margin: 5px;

`