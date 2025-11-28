// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";

// Global styles
import "./App.css";
import "./components/styles/hero.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // !!! StrictMode может вызывать двойные вызовы useEffect
  //     которые на мобильных создают белые мигания.
  //     Поэтому для продакшена его лучше отключить.
  // <React.StrictMode>

    <HashRouter>
      <App />
    </HashRouter>

  // </React.StrictMode>
);
