import React from "react";
import styles from "./prodInfoList.module.css"

import CategoryRenameHigh from "../categoryRenameHigh";
import CategoryRename from "../categoryRename";

function ProdInfoList({list}) {
    return (
        <div className={styles.section}>
            <div className={styles.item1}>{list.pid}</div>
            <div className={styles.item2}>{list.itemName}</div>
            <div className={styles.item3}>{list.userId}</div>
            <div className={styles.item4}>{list.price}원</div>
            {/*<div className={styles.item5}>{list.stock}</div>*/}
            <div className={styles.item6}><CategoryRenameHigh cate={list.category}/> &gt; <CategoryRename cate={list.category}/></div>
            {/*<div className={styles.item7}>{String("2123-12-34").substring(0, 10)}</div>*/}
            <div className={styles.item7}>{String(list.regTime).substring(0, 10)}</div>
        </div>
    );
}

export default ProdInfoList;