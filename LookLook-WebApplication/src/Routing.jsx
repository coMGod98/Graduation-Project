import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Main from "./pages/main";
import Product from "./pages/product";
import ManList from "./pages/manList";
import WomanList from "./pages/womanList";
import OuterList from "./pages/outerList";
import ShoesList from "./pages/shoesList";
import FashionList from "./pages/fashionList";
import Mypage from "./pages/mypage";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SignupResult from "./pages/signupResult";
import SearchResult from "./pages/searchResult";

class Routing extends React.Component {
  render() {
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

          <Route path="/product/:id" element={<Product />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/searchResult" element={<SearchResult />} />
          
        </Routes>
      </Router>
    );
  }
}

export default Routing;
