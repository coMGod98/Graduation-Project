import React from "react";
import Header from "../components/header";
import styles from "./orderSheet.module.css";
import { Link } from "react-router-dom";

function OrderSheet() {
  return (
    <>
      <Header />
      <div className={styles.OrderSection}>
        <div className={styles.OrderWrap}>
          <div className={styles.OrderHeader}>주문서 작성</div>

          <div className={styles.orderWrap}>
            <div className={styles.orderDiv}>장바구니</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div style={{backgroundColor: 'rgb(184, 223, 255)'}} 
            className={styles.orderDiv}>주문서 작성</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div className={styles.orderDiv}>주문 완료</div>
          </div>

          
          <div className={styles.orderInfoHeader}>
            배송 정보
          </div>

          <div className={styles.orderInfoHeader}>
            상품 정보
          </div>

          <div className={styles.orderInfoHeader}>
            결제 정보
          </div>

          <div className={styles.orderInfoHeader}>
            결제 금액
          </div>

          <div className={styles.payBtnWrap}>
            <Link to="/orderResult"><button>결제하기</button></Link>
            
          </div>







        </div>
      </div>
    </>
  );
}
export default OrderSheet;