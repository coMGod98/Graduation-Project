import React from "react";
import styles from "./prodRequestList.module.css"

function ProdRequestList() {
  return (
    <div className={styles.section}>
      <div className={styles.item1}>
        <input type="checkbox"></input>
      </div>
      <div className={styles.item2}>12345678</div>
      <div className={styles.item3}>상품명1</div>
      <div className={styles.item4}>abc123</div>
      <div className={styles.item5}>#,###원</div>
      <div className={styles.item6}>5</div>
      <div className={styles.item7}>대분류 &gt; 소분류</div>
    </div>
  );
}

export default ProdRequestList;