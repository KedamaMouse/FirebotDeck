
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuPortal, ContextMenuTrigger } from "@radix-ui/react-context-menu";
import styled, { css } from "styled-components";
import { IDeckButton } from "./App";


interface IDeckButtonProps {
    caption: string;
    actionID: string;
    baseApiURL: string;
    backgroundColor: string;
    textColor: string;
    removeButtonHandler: () => void;
    afterActionHandler: () => void;
    updateButtonProps: (props: Partial<IDeckButton>) => void;
    backColorVariable: string;
}

export const DeckButton: React.FC<IDeckButtonProps> = (props) => {
    const onclick = async () => {
        const url = props.baseApiURL + '/effects/preset/' + props.actionID;
        try {
            await fetch(url);
            props.afterActionHandler();
        } catch (error) {
            alert("request failed. is firebot running? Request: " + url);
        }


    }
    return <>
        <ContextMenu>
            <ContextMenuTrigger>
                <Button style={{ color: props.textColor, backgroundColor: props.backgroundColor }} onClick={onclick} >{props.caption}</Button>
            </ContextMenuTrigger>
            <ContextMenuPortal>

            </ContextMenuPortal>
            <ContextMenuContent>
                <ContentMenuDiv>
                    <ContextMenuItem onClick={() => props.removeButtonHandler()}>
                        <ContextMenuItemDiv>Remove button</ContextMenuItemDiv>
                    </ContextMenuItem>

                    <ContextMenuItem onClick={() => {
                        const variable = prompt("Firebot custom variable name to look to. current value: '" + props.backColorVariable + "'");
                        if (variable) {
                            props.updateButtonProps({ backColorVariable: variable });
                        }
                    }
                    }>
                        <ContextMenuItemDiv>Set color variable</ContextMenuItemDiv>
                    </ContextMenuItem>

                    <ContextMenuItem onClick={() => {
                        const color = prompt("Enter an html color code");
                        if (color) {
                            props.updateButtonProps({ backgroundColor: color });
                        }
                    }
                    }>
                        <ContextMenuItemDiv>set color</ContextMenuItemDiv>
                    </ContextMenuItem>
                    
                    <ContextMenuItem onClick={() => {
                        const caption = prompt("Enter a button caption");
                        if (caption) {
                            props.updateButtonProps({ caption: caption });
                        }
                    }
                    }>
                        <ContextMenuItemDiv>Change button caption</ContextMenuItemDiv>
                    </ContextMenuItem>
                </ContentMenuDiv>
            </ContextMenuContent>

        </ContextMenu>
    </>

}

const ContentMenuDiv = styled.div`
    padding-top: 2px;
    padding-bottom: 2px;
    background-color: white;
    color: black;
`

const ContextMenuItemDiv = styled.div`
    padding-left: 2px;
    padding-right: 2px;
    &:hover
    {
        background-color: #e094d2;
    }
`

const Button = styled.button`
    font-size: 50px;
    border-radius: 5px;
    margin: 5px;

`