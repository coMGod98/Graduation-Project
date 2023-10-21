import React from "react";
import Header from "../components/header";
import Banner from "../components/banner";
import HotList from "../components/hotList";
import NewList from "../components/newList";
import styles from "./main.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Main() {

  const [msg, setMsg] = useState([]);
  useEffect(() => {
    fetch("/api/hello")
        .then((res) => {return res.json();})
        .then((data) => {setMsg(data);})
  }, []);
  
  return (
    <>
      <Header />
      {msg.map((content, idx) => <li key={`${idx} - ${content}`}>{content}</li>)}
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