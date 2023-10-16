import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Main from "./pages/main";
import Product from "./pages/product";
import ProductShow from "./pages/productShow";
import Mypage from "./pages/mypage";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Signup from "./pages/signup";
import WomanKnit from "./pages/woman/womanKnit";
import SignupResult from "./pages/signupResult";

class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupResult" element={<SignupResult />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productShow" element={<ProductShow />} />
          <Route path="/WomanKnit/:id" element={<WomanKnit />} />
          <Route path="/product" element={<Product />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/cart" element={<Cart />} />
          
        </Routes>
      </Router>
    );
  }
}

export default Routing;
