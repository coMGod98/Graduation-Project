import React from "react";
import Header from "../components/header";
import Banner from "../components/banner";
import HotList from "../components/hotList";
import NewList from "../components/newList";
import styles from "./main.module.css";
import Products from "../products.json";

function Main() {
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
        </>
    );
}
export default Main;