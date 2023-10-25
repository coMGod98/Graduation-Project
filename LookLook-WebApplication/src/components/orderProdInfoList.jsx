import React from "react";
import styles from "./orderProdInfoList.module.css"

function OrderProdInfoList() {
  return (
    <div className={styles.section}>
      <div className={styles.info1}>1</div>
      <div className={styles.info2}>
        <img src={require("../images/looklook_logo.png")} alt="sample" />
        <p>상품명1</p>
      </div>
      <div className={styles.info3}>1</div>
      <div className={styles.info4}>#,###원</div>
    </div>
  );
}

export default OrderProdInfoList;