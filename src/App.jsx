import React from "react";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import CartProvider from "./context/CartContext"; // import cartcontext component

//components import
import Home from "./Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import PaymentSuccess from "./components/PaymentSuccess";

import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <ToastContainer />
      

      <BrowserRouter>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-successful" element={<PaymentSuccess />} />
          </Routes>
          <Cart />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
