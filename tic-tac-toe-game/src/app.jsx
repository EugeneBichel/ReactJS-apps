import React from 'react';
import ReactDOM from 'react-dom';

//export const HelloUser = (props) => { return (<div>Welcome to {props.name}</div>)};
//ReactDOM.render(<HelloUser name="tic-tac-toe game" />, document.getElementById('container'));


function Square(props) {

    return (
        <button className="square"
            onClick={() => props.onClick()}>
        </button>
    );
}

function Board(props) {

    return (
        <Square value={props.square}
                onClick={() => props.onClick(i)}/>);
}

class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move:
                'Game start';

            return (
              <li key={move}>
                  <a href="#"
                     onClick={() => this.jumpTo(move)}>{desc}</a>
              </li>
            );
        });

        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board square={(i) => current.squares[i]}
                            onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    };

    handleClick(i) {

        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('container')
);

function calculateWinner(squares){
    "use strict";
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] &&
            squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}
