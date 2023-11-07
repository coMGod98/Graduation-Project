import React from "react";
import styles from "./prodInfoList.module.css"

function ProdInfoList() {
  return (
    <div className={styles.section}>
      <div className={styles.item1}>12345678</div>
      <div className={styles.item2}>상품명1</div>
      <div className={styles.item3}>abc123</div>
      <div className={styles.item4}>#,###원</div>
      <div className={styles.item5}>5</div>
      <div className={styles.item6}>대분류 &gt; 소분류</div>
      <div className={styles.item7}>{String("2123-12-34").substring(0, 10)}</div>
    </div>
  );
}

export default ProdInfoList;