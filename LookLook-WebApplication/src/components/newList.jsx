import React from "react";
import styles from "./list.module.css";
import { Link } from "react-router-dom";

function NewList() {
  return (
    <div className={styles.productContainer}>

      <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="new1" 
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div>
      <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="new2" 
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div>
      <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="new3" 
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div>
      <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="new4" 
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div>
      

    </div>
  )
}
export default NewList;