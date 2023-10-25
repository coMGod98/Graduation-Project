import React from "react";
import Header from "../components/header";
import Banner from "../components/banner";
import HotList from "../components/hotList";
import NewList from "../components/newList";
import styles from "./main.module.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <>
      <Header />
      <Banner />
      <div className={styles.mainSection}>
        <div className={styles.mainHeader}>인기 상품</div>
        <HotList />
        <div className={styles.mainHeader}>신상품</div>
        <NewList />
        
      </div>
      
    </>
  );
}
export default Main;