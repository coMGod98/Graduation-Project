import React from "react";
import styles from "./cartItem.module.css"
import { useState } from "react";

function CartItem({id, name, price, size, color, stock, quantity, onClick}) {
  

  return (
    <div className={styles.cartItemDiv}>
      <div className={styles.cartItemTag1}>
        <input type="checkbox"></input>
      </div>
      <div className={styles.cartItemTag2}>1</div>
      <div className={styles.cartItemTag3}>
        <img src={require("../images/looklook_logo.png")} alt="sample" />
        <p>상품명1</p>
      </div>
      <div className={styles.cartItemTag4}>
        <button type="button" aria-label="수량 내리기"
        onClick={() => onClick(-1)} disabled={quantity === 1}>-</button>
        <input value={quantity}
        type="number" min={1} max={stock} readOnly></input>
        <button type="button" aria-label="수량 올리기"
        onClick={() => onClick(1)} disabled={stock < 1 || stock === quantity}>+</button>
      </div>
      <div className={styles.cartItemTag5}>{price}원</div>
    </div>
  );
}

export default CartItem;