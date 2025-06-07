import { useState, useEffect } from "react";

export const ReactPlaygroundTwo = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter((prev) => prev + 1);
        }, 1000); // use setInterval() is better for recurring

        return () => clearInterval(intervalId); // Cleanup interval on component unmount or before next effect
    }, []);

    return <div>Automatic Counter (secs): {counter}</div>;
};
