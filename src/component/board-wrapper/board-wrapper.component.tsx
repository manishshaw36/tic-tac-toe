import React, { Component } from 'react';

import { AppContext } from '../../shared/context-provider/context.provider';
import { GAME_TYPES, PLAYER_TURNS, ICON_CHARS } from '../../shared/utils/utils';

import './board-wrapper.style.scss';
import Board from '../board/board.component';


class BoardWrapper extends Component {
    render() {
        let textInfo = '';
        const currentIconType = this.context.currentIcon;

        if (this.context.gameState.isTie) {
            textInfo = 'Tie!';
        } else {
            if (this.context.gameType === GAME_TYPES.TWO_PLAYERS) {
                if (this.context.gameState.position === "") {
                    textInfo = `It's player(${ICON_CHARS[currentIconType]}) turn`;
                } else {
                    textInfo = `Player(${ICON_CHARS[1 - currentIconType]}) wins!`;
                }
            } else {
                if (this.context.gameState.position === "") {
                    if (this.context.playerTurn === PLAYER_TURNS.HUMAN) textInfo = `It's your turn`;
                    else textInfo = `It's computer turn`;
                } else {
                    if (this.context.playerTurn === PLAYER_TURNS.HUMAN) textInfo = `Computer win!`;
                    else textInfo = `You win!`;
                }
            }
        }

        return (
            <main className="board-wrapper">
                <div className="info">{textInfo}</div>
                <Board />
                <div className="footer">
                    <button 
                        className="btn btn-primary" 
                        onClick={() => this.context.newGame()}
                    >
                        New Game
                    </button>
                    <button 
                        className="btn btn-danger" 
                        onClick={() => {
                            this.context.goToGameMenu(true);
                            this.context.newGame();
                        }}
                    >
                        Main Menu
                    </button>
                </div>
            </main>
        );
    }
}

BoardWrapper.contextType = AppContext;

export default BoardWrapper;
