import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [appContext, setAppContext] = useState({ secretKey: "abc" });

    return (
        <AppContext.Provider value={{ appContext, setAppContext }}>
            {children}
        </AppContext.Provider>
    );
};
