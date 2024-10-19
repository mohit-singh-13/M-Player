import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
