import React, { useState } from "react";
import Header from "../components/header";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CartItem from "../components/cartItem";
import Products from "../products.json";

function Cart(prods) {

  // const list = Products.slice(0, 4);
  
  // const removeProduct = id => {
  //   setProduct(
  //     product.filter(list => {
  //       return list.id !== id;
  //     })
  //   );
  //   setCheckedArr(
  //     checkedArr.filter(checked => {
  //       return checked.id !== id;
  //     })
  //   );
  // };


  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(10);

  return (
    
    <>
      <Header />
      <div className={styles.CartSection}>
        <div className={styles.CartWrap}>
          <div className={styles.CartHeader}>장바구니</div>
          {sessionStorage.setItem("size", "M")}
          
          <div className={styles.orderWrap}>
            <div style={{backgroundColor: 'rgb(184, 223, 255)'}}
            className={styles.orderDiv}>장바구니</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div className={styles.orderDiv}>주문서 작성</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div className={styles.orderDiv}>주문 완료</div>
          </div>

          <div className={styles.CartListWrap}>
            <div className={styles.cartListTag}>
              <div className={styles.cartTag1}>
                <input type="checkbox"></input>
              </div>
              <div className={styles.cartTag2}>전체 개</div>
              <div className={styles.cartTag3}>상품명(옵션)</div>
              <div className={styles.cartTag4}>수량</div>
              <div className={styles.cartTag5}>판매가</div>
            </div>
            <CartItem />
            <CartItem />



          </div>
          <div className={styles.btnWrap}>
            <button>선택 삭제</button>
            <div>배송비 : ###원   총 상품금액: ###원</div>
          </div>
          <div className={styles.orderBtnWrap}>
            <Link to="/orderSheet">
              <button>주문하기</button>
            </Link>
            <button style={{backgroundColor: 'rgb(40, 128, 179)'}}>아바타 입어보기</button>
          </div>

          

        </div>
      </div>
    </>
  );
}
export default Cart;