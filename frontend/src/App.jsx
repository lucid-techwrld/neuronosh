import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import RecipePage from "./pages/RecipePage";
import SiginPage from "./pages/SiginPage";
import SavedPage from "./pages/SavedPage";
import OTPpage from "./pages/OTPpage";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:name" element={<RecipePage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Route>
        <Route path="/auth" element={<SiginPage />} />
        <Route path="/verify" element={<OTPpage />} />
      </Routes>
    </>
  );
};

export default App;
