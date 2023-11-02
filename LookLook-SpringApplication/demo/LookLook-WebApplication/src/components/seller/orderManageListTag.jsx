import React from "react";
import styles from "./orderManageListTag.module.css"

function OrderManageListTag() {
    return (
        <div className={styles.section}>
            <div className={styles.item1}>주문번호</div>
            <div className={styles.item2}>상품명</div>
            <div className={styles.item3}>수량</div>
            <div className={styles.item4}>주문자명</div>
            <div className={styles.item5}>결제정보</div>
            <div className={styles.item6}>결제금액</div>
            <div className={styles.item7}>주문상태</div>
            <div className={styles.item8}>주문상태 변경</div>
        </div>
    );
}

export default OrderManageListTag;