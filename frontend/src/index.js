import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global CSS (if needed)
import App from "./App"; // Main App Component
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router> {/* Enables Routing */}
      <App />
    </Router>
  </React.StrictMode>
);


