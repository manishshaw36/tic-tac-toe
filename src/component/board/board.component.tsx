import React, { Component } from 'react';

import { AppContext } from '../../shared/context-provider/context.provider';
import Cell from '../cell/cell.component';

class Board extends Component {
    
    boardRef: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.boardRef = React.createRef();
    }

    componentDidUpdate() {
        if (this.context.gameState.position !== "") {
            setTimeout(() => {
                this.boardRef.current.classList.add('full');
            }, 50);
        } else {
            this.boardRef.current.classList.remove('full');
        }
    }

    render() {
        return (
            <div className={`board ${this.context.gameState.position}`} ref={this.boardRef}>
                <div className="board-row">
                    <Cell index={0} />
                    <Cell index={1} />
                    <Cell index={2} />
                </div>

                <div className="board-row">
                    <Cell index={3} />
                    <Cell index={4} />
                    <Cell index={5} />
                </div>

                <div className="board-row">
                    <Cell index={6} />
                    <Cell index={7} />
                    <Cell index={8} />
                </div>
            </div>
        )
    }
}

Board.contextType = AppContext;

export default Board;