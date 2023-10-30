import React from "react";
import styles from "./prodRequestList.module.css"

function ProdRequestList() {
  return (
    <div className={styles.section}>
      <div className={styles.item1}>12345678</div>
      <div className={styles.item2}>상품명1</div>
      <div className={styles.item3}>abc123</div>
      <div className={styles.item4}>#,###원</div>
      <div className={styles.item5}>5</div>
      <div className={styles.item6}>카테고리</div>
        <div className={styles.item7}>
            <input />
        </div>
    </div>
  );
}

export default ProdRequestList;