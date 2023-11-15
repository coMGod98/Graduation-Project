import React from "react";
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import axios from 'axios';

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
import Seller from "./pages/seller"
import AvartarPage from "./pages/avatarPage";



// class Routing extends React.Component {}
function Routing() {
  // useEffect(() => {
  //   localStorage.setItem("accessToken", "");
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupResult" element={<SignupResult />} />
        <Route path="/login" element={<Login />} />

        <Route path="/manList/:cate" element={<ManList />} />
        <Route path="/womanList/:cate" element={<WomanList />} />
        <Route path="/outerList/:cate" element={<OuterList />} />
        <Route path="/shoesList/:cate" element={<ShoesList />} />
        <Route path="/fashionList/:cate" element={<FashionList />} />
        <Route path="/searchResult/:keyword" element={<SearchResult />} />

        <Route path="/myPage/:menu" element={<MyPage />} />

        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderSheet" element={<OrderSheet />} />
        <Route path="/orderResult" element={<OrderResult />} />
       
        <Route path="/avatarPage" element={<AvartarPage />} />
        <Route path="/admin/:menu" element={<Admin />} />
        <Route path="/seller/:menu" element={<Seller />} />
        
      </Routes>
    </Router>
  );
}

export default Routing;
