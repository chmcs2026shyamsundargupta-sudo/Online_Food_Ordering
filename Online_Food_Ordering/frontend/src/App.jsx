import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-order" element={<CreateOrderPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;