import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./components/UserContext.jsx";
import { Save } from "lucide-react";
import { SaveProvider } from "./components/SaveContext.jsx";
import { RecipeProvider } from "./components/RecipeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <SaveProvider>
        <RecipeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RecipeProvider>
      </SaveProvider>
    </UserProvider>
  </StrictMode>
);
