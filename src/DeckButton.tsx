import * as React from 'react';


interface IDeckButtonProps
{
    caption : string;
    actionID: string;
    ipAddress: string;
    port: string;
}

export const DeckButton:React.FC<IDeckButtonProps> = (props) => {
    const onclick= () => {
    fetch('http://'+props.ipAddress+':'+props.port+'/api/v1/effects/preset/' + props.actionID);
    }
    return <button className="btn btn-primary" onClick={onclick} >{props.caption}</button>

}