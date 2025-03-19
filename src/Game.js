import { useState } from "react";
import { Board } from "./component/Board";

export const Game = () => {
	const [currentMove, setCurrentMove] = useState(0);
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [sortByAsc, setSortByAsc] = useState(true);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];
	
	const setStatus = () => {
		const winner = calculateWinner(currentSquares);
		if (winner){ return "Winner: " + winner; }
		else { return "Next Player: " + (xIsNext ? "X" : "O"); }
	};

	const handlePlay = (nextSquares) => {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	};

	const moveList = () => {
		const sortedHistory = sortByAsc ? history : [...history].reverse(); // Reverse if descending
		return sortedHistory.map((_, index) => {
		  const move = sortByAsc ? index : history.length - 1 - index; // Correct move numbering
		  const description = move > 0 ? `Go to move #${move}` : "Go to game start";
		  return (
			<li key={move}>
			  {currentMove !== move ? (
				<button onClick={() => setCurrentMove(move)}>{description}</button>
			  ) : (
				<span>You are at move #{move}</span>
			  )}
			</li>
		  );
		});
	};

	return (
        <div className="game">
          <div className="game-board">
            <Board
				status={setStatus()}
				xIsNext={xIsNext}
				hasWinner={calculateWinner(currentSquares)}
				squares={currentSquares}
				onPlay={handlePlay}
			/>
          </div>
          <div className="game-info">
			<button onClick={() => setSortByAsc(!sortByAsc)}>sort</button>
            <ol reversed={!sortByAsc}>{moveList()}</ol>
          </div>
        </div>
	);
};

const calculateWinner = (squares) => {
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
	for (let i = 0; i < lines.length; i++) {
	  	const [a, b, c] = lines[i];
	  	if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
	  	}
	}
	return null;
};
