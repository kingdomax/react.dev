import { useState } from "react";

export const Square = ({ value, onSquareClick }) => {
    //const [value, setValue] = useState(null);
//
    //const handleClick = () => {
    //    setValue("X");
    //};
    
    return  <button 
                className="square"
                onClick={onSquareClick}
            >
                {value}
            </button>;
};
