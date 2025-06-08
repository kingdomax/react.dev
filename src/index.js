import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import { Game } from "./component/Game";
import { ReactPlaygroundOne } from "./component/ReactPlaygroundOne";
import { ReactPlaygroundTwo } from "./component/ReactPlaygroundTwo";
import { AppContextProvider } from "./component/AppContextProvider";

const root = createRoot(document.getElementById("root"));
root.render(
    //<StrictMode>
    <AppContextProvider>
        <Game />
        <ReactPlaygroundOne />
        <ReactPlaygroundTwo />
    </AppContextProvider>
    //</StrictMode>
);
