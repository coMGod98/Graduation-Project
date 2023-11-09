import React from "react";
import styles from "./orderProdInfoList.module.css"

function OrderProdInfoList({list, num}) {
    return (
        <div className={styles.section}>
            <div className={styles.info1}>{num}</div>
            <div className={styles.info2}>
                {/*<img src={require("../images/looklook_logo.png")} alt="sample" />*/}
                <p>{list.itemName}({list.size}, {list.color})</p>
            </div>
            <div className={styles.info3}>{list.count}</div>
            <div className={styles.info4}>{Number(list.price).toLocaleString()}원</div>
        </div>
    );
}

export default OrderProdInfoList;