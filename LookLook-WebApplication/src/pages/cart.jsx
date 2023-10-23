import React from "react";
import Header from "../components/header";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Cart(prods) {

  return (
    <>
      <Header />
      <div className={styles.CartSection}>
        <div className={styles.CartWrap}>
          <div className={styles.CartHeader}>장바구니</div>
          
          <div className={styles.orderWrap}>
            <div style={{backgroundColor: 'rgb(184, 223, 255)'}}
            className={styles.orderDiv}>장바구니</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div className={styles.orderDiv}>주문서 작성</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div className={styles.orderDiv}>주문 완료</div>
          </div>

          <div className={styles.CartListWrap}>
            <div> 전체 개 상품명(옵션) 수량 판매가</div>



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