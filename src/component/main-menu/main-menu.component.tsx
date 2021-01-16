import React from 'react';

import { AppContext } from '../../shared/context-provider/context.provider';
import CrossImgSrc from "../../assets/images/x.png";
import ZeroImgSrc from "../../assets/images/zero.png";

import './main-menu.style.scss';
import { GAME_TYPES } from '../../shared/utils/utils';

const MainMenu = () => {
    return (
        <AppContext.Consumer>
            {context => {
                const playWith = (value: number) => {
                    context.goToGameMenu(false);
                    context.changeType(value);
                }
                return (
                    <div className="main-menu">
                        <div className="image-box">
                            <div className="cross-img">
                                <img src={CrossImgSrc} width="100%" alt="Cross"/>
                            </div>
                            <div>
                                <img src={ZeroImgSrc} width="100%" alt="Zero"/>
                            </div>
                        </div>
                        <div className="play-type">
                            <h2>
                                Choose your play mode
                            </h2>

                            <button className="btn" onClick={() => playWith(GAME_TYPES.VERSUS_COMPUTER)}>
                                With AI
                            </button>

                            <button className="btn" onClick={() => playWith(GAME_TYPES.TWO_PLAYERS)}>
                                With Friend
                            </button>

                        </div>
                    </div>
                )
            }}
        </AppContext.Consumer>
    )
}

export default MainMenu;