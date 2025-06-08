import "./styles.css";
import { createRoot } from "react-dom/client";
import { lazy, StrictMode, Suspense } from "react";

import { Game } from "./component/Game";
import { ReactPlaygroundOne } from "./component/ReactPlaygroundOne";
import { AppContextProvider } from "./component/AppContextProvider";
const ReactPlaygroundTwo = lazy(
    () =>
        new Promise((resolve) =>
            setTimeout(
                () => resolve(import("./component/ReactPlaygroundTwo")),
                5000
            )
        )
);

const root = createRoot(document.getElementById("root"));

root.render(
    //<StrictMode>
    <AppContextProvider>
        <Game />
        <ReactPlaygroundOne />
        <Suspense fallback={<div>Lazy Loading Component.....</div>}>
            <ReactPlaygroundTwo />
        </Suspense>
    </AppContextProvider>
    //</StrictMode>
);
