import React from 'react';
import { Board } from './board.component'
import { calculateWinner } from './util.service'

class Game extends React.Component {
    defaultState = {
        history: [{
            squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        xIsNext: true
    }
    constructor(props) {
        super(props)
        this.state = this.defaultState
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    clearData() {
        this.setState(this.defaultState)
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i])
            return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares)
        let status;
        if (winner) {
            status = 'El ganador es: ' + winner;
        } else {
            status = 'Es el turno del jugador: ' + (this.state.xIsNext ? 'Player 1 (X)' : 'Player 2 (O)');
        }

        const moves = history.map((step, move) => {
            const desc = move ?
                'Ir al movimiento #' + move :
                'Inicio del Juego';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div>
                    <button className='reload-button' onClick={() => { this.clearData() }}>
                        Reiniciar
                    </button>
                </div>
            </div>
        );
    }
}

export { Game }