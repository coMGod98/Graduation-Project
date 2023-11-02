import React from "react";
import styles from "./orderProdInfoList.module.css"

function OrderProdInfoList({list, num}) {
  return (
    <div className={styles.section}>
      <div className={styles.info1}>{num}</div>
      <div className={styles.info2}>
        {/*<img src={require("../images/looklook_logo.png")} alt="sample" />*/}
        <p>1</p>
      </div>
      <div className={styles.info3}>1</div>
      <div className={styles.info4}>{Number(0).toLocaleString()}원</div>
    </div>
  );
}

export default OrderProdInfoList;