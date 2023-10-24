import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { store } from '../src/app/app'
import { Provider } from 'react-redux'

const rootContainer = document.getElementById("root");

createRoot(rootContainer).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
