import React from 'react';
import Square from './Square';
import {calculateWinner} from '../utils/gameUtils';

function Board({xIsNext, squares, onPlay}) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }

        onPlay(nextSquares, i);
    }

    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(square => square !== null);
    let status;

    if (winner) {
        status = "Winner: " + winner.winner;
    } else if (isDraw) {
        status = "Game ended in a draw";
    } else {
        status = "Next player: " + (xIsNext ? 'X' : 'O');
    }

    // Create board using two loops
    const boardRows = [];
    for (let row = 0; row < 3; row++) {
        const squaresInRow = [];
        for (let col = 0; col < 3; col++) {
            const squareIndex = row * 3 + col;
            squaresInRow.push(
                <Square
                    key={squareIndex}
                    value={squares[squareIndex]}
                    onSquareClick={() => handleClick(squareIndex)}
                    isWinning={winner && winner.winningLine.includes(squareIndex)}
                />
            );
        }
        boardRows.push(
            <div key={row} className="board-row">
                {squaresInRow}
            </div>
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            {boardRows}
        </>
    );
}

export default Board;
