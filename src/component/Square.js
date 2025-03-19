export const Square = ({ value, isHighlight, onSquareClick }) => {  
    return  <button 
                className={`square${isHighlight ? " highlight" : ""}`}
                onClick={onSquareClick}
            >
                {value}
            </button>;
};
