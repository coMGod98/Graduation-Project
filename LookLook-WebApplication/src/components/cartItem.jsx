import React from "react";
import styles from "./cartItem.module.css"
import { useState } from "react";

function CartItem() {
  

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
        <button type="button" aria-label="수량 내리기">-</button>
        <input value={1}
        type="number" min={1} max={1} readOnly></input>
        <button type="button" aria-label="수량 올리기">+</button>
      </div>
      <div className={styles.cartItemTag5}>###원</div>
    </div>



    // <div className={styles.cartItemDiv}>
    //   <div className={styles.cartItemTag1}>
    //     <input type="checkbox"></input>
    //   </div>
    //   <div className={styles.cartItemTag2}>{list.id}</div>
    //   <div className={styles.cartItemTag3}>{list.name}</div>
    //   <div className={styles.cartItemTag4}>{list.price}원</div>
    //   <div className={styles.cartItemTag5}>
    //     <button onClick={() => {
    //       removeProduct(list.id);
    //       }}>
    //       ✕
    //     </button>
    //   </div>
    // </div>
  );
}

export default CartItem;