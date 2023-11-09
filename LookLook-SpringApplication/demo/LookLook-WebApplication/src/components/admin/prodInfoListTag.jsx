import React from "react";
import styles from "./prodInfoListTag.module.css"

function UserManageListTag() {
    return (
        <div className={styles.section}>
            <div className={styles.item1}>상품ID</div>
            <div className={styles.item2}>상품명</div>
            <div className={styles.item3}>판매자ID</div>
            <div className={styles.item4}>가격</div>
            {/*<div className={styles.item5}>재고량</div>*/}
            <div className={styles.item6}>카테고리</div>
            <div className={styles.item7}>등록일자</div>
        </div>
    );
}

export default UserManageListTag;