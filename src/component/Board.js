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
			</>;
};
