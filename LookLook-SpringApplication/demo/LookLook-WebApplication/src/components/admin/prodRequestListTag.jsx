import React from "react";
import styles from "./prodRequestListTag.module.css"

function ProdRequestListTag() {
  return (
    <div className={styles.section}>
      <div className={styles.item1}>
        <input type="checkbox"></input>
      </div>
      <div className={styles.item2}>상품ID</div>
      <div className={styles.item3}>상품명</div>
      <div className={styles.item4}>판매자ID</div>
      <div className={styles.item5}>가격</div>
      <div className={styles.item6}>재고량</div>
      <div className={styles.item7}>카테고리</div>
    </div>
  );
}

export default ProdRequestListTag;