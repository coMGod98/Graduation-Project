import React from "react";
import styles from "./orderManageList.module.css"

function OrderManageList() {
    return (
        <div className={styles.section}>
            <div className={styles.item1}>12345678</div>
            <div className={styles.item2}>남성 가을 가디건(M/화이트)</div>
            <div className={styles.item3}>1개</div>
            <div className={styles.item4}>홍길동</div>
            <div className={styles.item5}>카드/일시불</div>
            <div className={styles.item6}>#,###원</div>
            <div className={styles.item7}>결제 완료</div>
            <div className={styles.item8}>
                <input />
            </div>
        </div>
    );
}

export default OrderManageList;