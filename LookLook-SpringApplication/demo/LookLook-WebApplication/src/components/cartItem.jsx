import React from "react";
import styles from "./cartItem.module.css"
import { useState } from "react";

function CartItem({list, num}) {

    const deleteItemClick = () => {

        const accessToken = sessionStorage.getItem("accessToken");
        fetch(`/cart/${list.cartItemId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'delete',
        })
            .then(res => {
                alert("삭제 성공!");
                console.log("삭제 성공", res);
                window.location.reload();
            })
            .catch(err => {
                console.log("삭제 실패", err);
            })
    }

    return (
        <div className={styles.cartItemDiv}>
            <div className={styles.cartItemTag1}>{num}</div>
            <div className={styles.cartItemTag2}>
                <div className={styles.imgWrap}>
                    <img src={list.mainImgUrl} alt="sample" />
                </div>
                <p>{list.itemName} ({list.size}, {list.color})</p>
            </div>
            <div className={styles.cartItemTag3}>
                <p>{list.count}개</p>
            </div>
            <div className={styles.cartItemTag4}><p>{Number(list.price).toLocaleString()}원</p></div>
            <div className={styles.cartItemTag5}>
                <button onClick={deleteItemClick}>X</button>
            </div>
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