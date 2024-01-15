import React from 'react';
import Style from './style.css'
function Tile( props:{children?: React.ReactElement<any, string | React.JSXElementConstructor<HTMLElement>>}){
    return (
        <div className={Style}>
            {props.children}
        </div>
    )
}

export default Tile