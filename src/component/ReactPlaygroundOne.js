import { useState, useEffect } from "react";
import { testArray } from "../service/arrayStuff";
import { testPromise } from "../service/promiseStuff";

export const ReactPlaygroundOne = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/todos"
                );

                if (!response.ok) {
                    throw new Error(`404 or 500 response`);
                }

                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
        // testPromise();
        // testArray();
    }, []);

    const handleToggle = (id) => {
        const newData = data.map((x) => {
            if (x.id == id) {
                return {
                    ...x,
                    completed: !x.completed,
                };
            }

            return x;
        });

        setData(newData);
    };

    return (
        <div className="playground-container">
            {data.length > 1 &&
                data.slice(0, 10).map((x, index) => {
                    return (
                        <div key={index}>
                            <input
                                type="checkbox"
                                checked={x.completed}
                                onChange={() => handleToggle(x.id)}
                            />
                            {`${x.id}. "${x.title}"`}
                        </div>
                    );
                })}
        </div>
    );
};
