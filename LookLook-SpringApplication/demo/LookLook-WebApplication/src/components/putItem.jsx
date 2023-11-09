import React from "react";
import styles from "./putItem.module.css"
import { useState } from "react";

function PutItem({id, name, price, size, color, stock, quantity, onClick}) {


    return (
        <div className={styles.putItemDiv}>
            <div className={styles.nameDiv}>{name} ({size}, {color})</div>
            <div className={styles.quantDiv}>


                <button type="button" aria-label="수량 내리기" style={{marginLeft:'3px'}}
                        onClick={() => onClick(-1)} disabled={quantity === 1}>-</button>

                <input value={quantity}
                       type="number" min={1} max={stock} readOnly></input>

                <button type="button" aria-label="수량 올리기"
                        onClick={() => onClick(1)} disabled={quantity > 98}>+</button>




            </div>
            <div className={styles.priceDiv}>{Number(price).toLocaleString()}원</div>
        </div>
    );
}

export default PutItem;