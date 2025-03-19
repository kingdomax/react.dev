import { useState } from "react";

export const Square = () => {
    
    const [value, setValue] = useState(null);

    const handleClick = () => {
        setValue("X");
    };
    
    return  <button 
                className="square"
                onClick={handleClick}
            >
                {value}
            </button>;
};
