import React, {useEffect} from "react";
import Header from "../components/header";
import Banner from "../components/banner";
import RecList from "../components/recList";
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
                <div className={styles.mainHeader}>LOOKLOOK 추천 상품</div>
                <RecList />
                <div className={styles.mainHeader}>신상품</div>
                <NewList />

            </div>
        </>
    );
}
export default Main;