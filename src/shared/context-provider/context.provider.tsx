import React, { Component } from 'react';
import {
    GAME_TYPES, PLAYER_TURNS,
    checkGameState, getRandom, replace,
    findBestMove, findRandomMove
} from '../utils/utils';

const THINKING_TIME: number = 500;

export const AppContext: React.Context<any> = React.createContext(null);

class GameState {
    position: string = "";
    iconType: string | null = null;
    isTie: boolean = false;
}

class IntialState {
    isMainMenu: boolean = true;
    isIconSelected: boolean = false;
    gameType: number = GAME_TYPES.TWO_PLAYERS;
    selectedIcon: number = 0;
    currentIcon: number = getRandom(0, 2);
    playerTurn: number = getRandom(0, 2);
    cells: any[] = new Array(9).fill(null);
    gameState: GameState = new GameState();
}


class Props extends IntialState {
    changeType: Function | undefined;
    humanPlay: Function | undefined;
    newGame: Function | undefined;
    goToGameMenu: Function | undefined;
    chooseIcon: Function | undefined;
}

export default class ContextProvider extends Component {

    timeout: NodeJS.Timeout | undefined;
    initialState: IntialState = new IntialState();

    state: Props = {
        ...new IntialState(),
        goToGameMenu: (isMenu: boolean) => this.setState({ isMainMenu: isMenu, isIconSelected: false }),
        changeType: (type: number) => {
            if (this.state.gameType !== type) {
                this.initNewGame(type);
            }
        },
        humanPlay: (index: number) => this.humanPlay(index),
        newGame: () => this.initNewGame(this.state.gameType),
        chooseIcon: (value: number) => this.setState({ selectedIcon: value, isIconSelected: true }, 
            () => this.initNewGame(this.state.gameType))
    }

    initGame = () => {
        if (this.state.gameType === GAME_TYPES.VERSUS_COMPUTER &&
            this.state.playerTurn === PLAYER_TURNS.COMPUTER) {

            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                const randomMove = findRandomMove(this.state.cells);
                this.computerPlay(randomMove);
            }, THINKING_TIME);
        }
    }

    initNewGame = (type: number = this.initialState.gameType) => {
        this.setState((state: Props) => {
            const playerTurn = getRandom(0, 2);
            let currentIcon = getRandom(0, 2);
            if(type === GAME_TYPES.VERSUS_COMPUTER) {
                if(!playerTurn) {
                    currentIcon = state.selectedIcon
                } else {
                    currentIcon = 1 - state.selectedIcon;
                }
            }
            return {
                gameType: type,
                currentIcon,
                playerTurn,
                cells: this.initialState.cells,
                gameState: this.initialState.gameState,
            }
        }, () => {
            this.initGame();
        });
    }

    applyState = (prevState: Props, index: number) => {
        const cells = prevState.cells;
        const nextIcon = 1 - prevState.currentIcon;
        const nextPlayerTurn = 1 - prevState.playerTurn;
        const nextCells = replace(cells, index, prevState.currentIcon);
        const gameState = checkGameState(nextCells);

        return {
            gameState: gameState,
            currentIcon: nextIcon,
            playerTurn: nextPlayerTurn,
            cells: nextCells
        }
    }

    humanPlay = (index: number) => {
        if (this.state.gameState.position === "" && this.state.cells[index] === null &&
            (this.state.gameType === GAME_TYPES.TWO_PLAYERS || this.state.playerTurn === PLAYER_TURNS.HUMAN)) {

            this.setState((prevState: Props) => {
                return this.applyState(prevState, index);
            }, () => {
                // Make a move for computer if the game is in 'versus computer' mode
                if (this.state.gameState.position === "" &&
                    this.state.gameType === GAME_TYPES.VERSUS_COMPUTER &&
                    this.state.playerTurn === PLAYER_TURNS.COMPUTER) {

                    setTimeout(() => {
                        this.makeAIMove();
                    }, THINKING_TIME);
                }
            });
        }
    }

    computerPlay = (index: number) => {
        if (this.state.gameState.position === "" && this.state.cells[index] === null &&
            this.state.gameType === GAME_TYPES.VERSUS_COMPUTER &&
            this.state.playerTurn === PLAYER_TURNS.COMPUTER) {

            this.setState((prevState: Props) => this.applyState(prevState, index));
        }
    }

    makeAIMove = () => {
        const bestMove = findBestMove(this.state.cells, this.state.currentIcon);

        if (bestMove !== null) {
            this.computerPlay(bestMove);
        }
    }

    componentDidMount() {
        this.initGame();
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}