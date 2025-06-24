import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContextProvider";

export default function ReactPlaygroundTwo() {
    const [counter, setCounter] = useState(0);
    const { secretKey, setSecretKey } = useContext(AppContext);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter((prev) => prev + 1);
        }, 1000); // use setInterval() is better for recurring

        return () => clearInterval(intervalId); // Cleanup interval on component unmount or before next effect
    }, []);

    return (
        <div className="playground-container">
            <div>Automatic Counter: {counter}s</div>
            <div>Secret Key from AppContext: {secretKey}</div>
        </div>
    );
}
