import React from "react";
import styles from "./orderManageList.module.css"

function OrderManageList() {
    return (
        <div className={styles.section}>
            <div className={styles.item1}>
                <input type="checkbox"></input>
            </div>
            <div className={styles.item2}>12345678</div>
            <div className={styles.item3}>남성 가을 가디건(M/화이트)</div>
            <div className={styles.item4}>1개</div>
            <div className={styles.item5}>홍길동</div>
            <div className={styles.item6}>카드/일시불</div>
            <div className={styles.item7}>#,###원</div>
            <div className={styles.item8}>결제 완료</div>
        </div>
    );
}

export default OrderManageList;