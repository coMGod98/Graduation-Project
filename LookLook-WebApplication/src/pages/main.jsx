import React, { useState } from "react";
import Header from "../components/header";
import Banner from "../components/banner";
import HotList from "../components/hotList";
import NewList from "../components/newList";
import styles from "./main.module.css";
import { Link } from "react-router-dom";
import Products from "../products.json"

// import { useDispatch, useSelector } from "react-redux";
// import { down, up } from "../store/counterSlice.js";


function Main() {
  // const dispatch = useDispatch();
  // const count = useSelector((state) => {
  //   console.log(state);
  //   return state.counter.value;
  // });
  const prods = Products.slice(0, 4);
  return (
    <>
      <Header />
      <Banner />
      <div className={styles.mainSection}>
        <div className={styles.mainHeader}>인기 상품</div>
        <HotList list={prods}/>
        <div className={styles.mainHeader}>신상품</div>
        <NewList list={prods}/>
        
      </div>

      {/* <div>
        <h1>Count:{count}</h1>
        <button
          onClick={() => {
            dispatch(up());
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            dispatch(down());
          }}
        >
          -1
        </button>
      </div> */}
    </>
  );
}
export default Main;