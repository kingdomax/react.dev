import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [secretKey, setSecretKey] = useState("abc");

    return (
        <AppContext.Provider value={{ secretKey, setSecretKey }}>
            {children}
        </AppContext.Provider>
    );
};
