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
                () => resolve(import("./component/SetIntervalCounter")),
                5000,
            ),
        ),
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
        <div
            style={{
                width: "100px",
                height: "100px",
                boxSizing: "border-box",
                border: "1px solid black",
            }}
        >
            <div
                style={{
                    width: "80px",
                    height: "80px",
                    border: "1px solid blue",
                    margin: "10px",
                }}
            >
                Content
            </div>
        </div>
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "dodgerblue",
                padding: "12px",
            }}
        >
            <button></button>
            <code style={{ color: "#fff" }}>Title</code>
            <button style={{ marginLeft: "auto" }}>Button</button>
        </div>
    </AppContextProvider>,
    //</StrictMode>
);
