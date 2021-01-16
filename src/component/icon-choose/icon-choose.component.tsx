import React, { useState } from 'react';

import { AppContext } from '../../shared/context-provider/context.provider';
import CrossImgSrc from "../../assets/images/x.png";
import ZeroImgSrc from "../../assets/images/zero.png";
import { ICON_TYPES } from '../../shared/utils/utils';

import './icon-choose.style.scss';

const IconChoose = () => {
    const [icon, setIcon] = useState(1);
    return (
        <AppContext.Consumer>
            {context => {
                const onFormSubmit = (event: any) => {
                    event.preventDefault(); 
                    context.chooseIcon(icon);
                }
                return (
                    <form className="icon-choose" onSubmit={onFormSubmit}>
                        <div className="play-type">
                            <h2>
                                Pick your side
                            </h2>
                        </div>
                        <div className="image-box">
                            <div className={`cross-img ${icon === ICON_TYPES.X ? 'selected' : ''}`} onClick={() => setIcon(ICON_TYPES.X)}>
                                <img src={CrossImgSrc} width="100%" alt="Cross"/>
                                <input type="radio" onChange={() => setIcon(ICON_TYPES.X)} checked={icon === ICON_TYPES.X}/>
                            </div>
                            <div className={`zero-img ${icon === ICON_TYPES.O ? 'selected' : ''}`} onClick={() => setIcon(ICON_TYPES.O)}>
                                <img src={ZeroImgSrc} width="100%" alt="Zero"/>
                                <input type="radio" onChange={() => setIcon(ICON_TYPES.O)} checked={icon === ICON_TYPES.O}/>
                            </div>
                        </div>
                        <div className="play-type">
                            <button className="btn">
                                Continue
                            </button>
                        </div>
                    </form>
                )
            }}
        </AppContext.Consumer>
    )
}

export default IconChoose;