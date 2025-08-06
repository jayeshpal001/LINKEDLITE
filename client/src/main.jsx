// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ContextWrapper } from "./contexts/ContextWrapper.jsx";
// import { AuthProvider } from "./contexts/AuthContext.jsx";
// import { PostProvider } from "./contexts/PostContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </BrowserRouter>
);
