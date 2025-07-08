import React, {useState} from 'react';
import Board from './Board';

export default function Game() {
    const [history, setHistory] = useState([
        {squares: Array(9).fill(null), location: null}
    ]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAscending] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;

    function handlePlay(nextSquares, location) {
        const nextHistory = [
            ...history.slice(0, currentMove + 1),
            {squares: nextSquares, location: location}
        ];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function toggleSortOrder() {
        setIsAscending(!isAscending);
    }

    const moves = history.map((historyItem, move) => {
        let description;
        if (move > 0) {
            const rowIndex = Math.floor(historyItem.location / 3);
            const colIndex = historyItem.location % 3;
            description = `Go to move #${move} (${rowIndex}, ${colIndex})`;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={move}>
                {move === currentMove ? (
                    <span>You are at move #{move}{move > 0 ? ` (${Math.floor(historyItem.location / 3)}, ${historyItem.location % 3})` : ''}</span>
                ) : (
                    <button onClick={() => jumpTo(move)}>{description}</button>
                )}
            </li>
        );
    });

    // Sort the moves based on the current sort order
    const sortedMoves = isAscending ? moves : [...moves].reverse();

    return (<div className="game">
        <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
            <div>
                <button onClick={toggleSortOrder}>
                    Sort moves: {isAscending ? "Ascending" : "Descending"}
                </button>
            </div>
            <ol>{sortedMoves}</ol>
        </div>
    </div>)
}
