import React from 'react';

import { AppContext } from '../../shared/context-provider/context.provider';
import { ICON_CHARS } from '../../shared/utils/utils';

import CrossImgSrc from "../../assets/images/x.png";
import ZeroImgSrc from "../../assets/images/zero.png";

const ICON_PLACE_HOLDDER = 'I';

const Cell = (props: any) => {
    return (
        <AppContext.Consumer>
            {context => {
                const value = context.cells[props.index];
                const icon = value !== null ? ICON_CHARS[value] : ICON_PLACE_HOLDDER;
                const isDoneClass = icon !== ICON_PLACE_HOLDDER ? 'done' : '';
                return (
                    <button
                        className={`cell cell-${props.index} ${isDoneClass}`}
                        onClick={() => context.humanPlay(props.index)}>
                        {   
                            icon === "X" ? 
                                <img src={CrossImgSrc} width="70%" alt="X" /> : 
                                icon === "O" ? <img src={ZeroImgSrc} width="100%" alt="0" /> : null
                        }
                    </button>
                )
            }}
        </AppContext.Consumer>
    )
}

export default Cell;