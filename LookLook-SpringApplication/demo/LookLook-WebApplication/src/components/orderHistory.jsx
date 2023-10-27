import React from "react";
import styles from "./orderHistory.module.css";

function OrderHistory() {
  return (
    <div className={styles.orderHisDiv}>
      <div className={styles.orderDate}>1234-12-34</div>
      <div className={styles.orderNum}>12345678</div>
      <div className={styles.orderProd}>
        <img src={require("../images/looklook_logo.png")} alt="prod_img"/>
        <p>주문 상품명~~~</p>
      </div>
      <div className={styles.orderPay}>
        <p>#,###원</p>
        <p>~~카드</p>
        <p>일시불</p>
      </div>
      <div className={styles.orderState}>배송완료</div>
    </div>
  );
}
export default OrderHistory;