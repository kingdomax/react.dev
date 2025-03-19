import { Square } from "./Square";

export const Board = ({ 
	status,
	xIsNext,
	winner,
	squares,
	onPlay 
}) => {

	const handleClick = (i) => {
		if (squares[i] || winner) { return; }
		
		let nextSquares = squares.slice(); 		// no params mean shallow copy
		nextSquares[i] = xIsNext ? "X" : "O";
		onPlay(nextSquares);
	};

	const boardRows = () => {
		const numberOfRows = 3;
		const numberOfColumns = 3;
		let boardRows = [];

		for (var i=0; i<numberOfRows; i++) {
			let eachRow = [];

			for (var j=0; j<numberOfColumns; j++) {
				const squareIndex = (i * numberOfRows) + j;
				eachRow.push(<Square 
								key={squareIndex}
								isHighlight={winner?.winnerIndex?.includes(squareIndex) ?? false}
								value={squares[squareIndex]}
								onSquareClick={() => handleClick(squareIndex)} 
							/>);
			}

			boardRows.push(<div key={i} className="board-row">{eachRow}</div>);
		}

		return boardRows;
	};

	return  <>
				<div className="status">{status}</div>
				{boardRows()}
				{/*<div className="board-row">
					<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
					<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
					<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
				</div>
				<div className="board-row">
					<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
					<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
					<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
				</div>
				<div className="board-row">
					<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
					<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
					<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
				</div>*/}
			</>;
};
