import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "pages/LandingPage";
import DetailsPage from "pages/DetailsPage";
import DetailsPage_ from "pages/DetailsPage_";
import Checkout from "pages/Checkout";

import "assets/scss/style.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/properties/:id" element={<DetailsPage_ />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
