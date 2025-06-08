import { useState } from "react";
import { Board } from "./Board";
import { ReactPlaygroundOne } from "./ReactPlaygroundOne";
import { ReactPlaygroundTwo } from "./ReactPlaygroundTwo";
import { calculateWinner } from "../service/calculateWinner";

export const Game = () => {
    const [currentMove, setCurrentMove] = useState(0);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [sortByAsc, setSortByAsc] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const winnerInfo = calculateWinner(currentSquares);

    const setStatusText = () => {
        if (winnerInfo) {
            return "Winner: " + winnerInfo.name;
        } else if (currentMove != 9) {
            return "Next Player: " + (xIsNext ? "X" : "O");
        } else {
            return "Draw";
        }
    };

    // TODO: Display the location for each move in the format (row, col) in the move history list.
    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };

    const moveList = () => {
        const sortedHistory = sortByAsc ? history : [...history].reverse(); // Reverse if descending
        return sortedHistory.map((_, index) => {
            const move = sortByAsc ? index : history.length - 1 - index; // Correct move numbering
            const description =
                move > 0 ? `Go to move #${move}` : "Go to game start";
            return (
                <li key={move}>
                    {currentMove !== move ? (
                        <button onClick={() => setCurrentMove(move)}>
                            {description}
                        </button>
                    ) : (
                        <span>You are at move #{move}</span>
                    )}
                </li>
            );
        });
    };

    return (
        <>
            <div className="game-container">
                <div className="game-board">
                    <Board
                        status={setStatusText()}
                        xIsNext={xIsNext}
                        winner={winnerInfo}
                        squares={currentSquares}
                        onPlay={handlePlay}
                    />
                </div>
                <div className="game-info">
                    <button onClick={() => setSortByAsc(!sortByAsc)}>
                        sort
                    </button>
                    <ol reversed={!sortByAsc}>{moveList()}</ol>
                </div>
                <div className="temp-item">1</div>
                <div className="temp-item">2</div>
                <div className="temp-item">3</div>
                <div className="temp-item">4</div>
                <div className="temp-item">5</div>
                <div className="temp-item">6</div>
                <div className="temp-item">7</div>
                <div className="temp-item">8</div>
                <div className="temp-item">9</div>
                <div className="temp-item">10</div>
            </div>
        </>
    );
};
