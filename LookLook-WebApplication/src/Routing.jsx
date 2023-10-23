import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Main from "./pages/main";
import Product from "./pages/product";
import ManList from "./pages/manList";
import WomanList from "./pages/womanList";
import OuterList from "./pages/outerList";
import ShoesList from "./pages/shoesList";
import FashionList from "./pages/fashionList";
import MyPage from "./pages/myPage";
import Cart from "./pages/cart";
import OrderSheet from "./pages/orderSheet";
import OrderResult from "./pages/orderResult";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SignupResult from "./pages/signupResult";
import SearchResult from "./pages/searchResult";
import Admin from "./pages/admin"

import products from "./products.json"

// class Routing extends React.Component {
function Routing() {
  const [prods, setProds] = useState(products);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupResult" element={<SignupResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/:menu" element={<Admin />} />

        <Route path="/manList/:cate" element={<ManList />} />
        <Route path="/womanList/:cate" element={<WomanList />} />
        <Route path="/outerList/:cate" element={<OuterList />} />
        <Route path="/shoesList/:cate" element={<ShoesList />} />
        <Route path="/fashionList/:cate" element={<FashionList />} />

        <Route path="/product/:id" element={<Product />} />
        <Route path="/myPage/:menu" element={<MyPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderSheet" element={<OrderSheet />} />
        <Route path="/orderResult" element={<OrderResult />} />
        <Route path="/searchResult" element={<SearchResult />} />
        
      </Routes>
    </Router>
  );
}

export default Routing;
