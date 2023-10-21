import React from "react";
import Header from "../components/header";
import styles from "./orderResult.module.css";
import { Link } from "react-router-dom";

function OrderResult() {
  return (
    <>
      <Header />
      <div className={styles.orderResultSection}>
        <div className={styles.orderResultWrap}>
          <div className={styles.orderWrap}>
            <div className={styles.orderDiv}>장바구니</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div style={{backgroundColor: 'rgb(184, 223, 255)'}} 
            className={styles.orderDiv}>주문서 작성</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div className={styles.orderDiv}>주문 완료</div>
          </div>


          <div className={styles.resultHeaderWrap}>
            <img src={require("../images/check.png")} alt="check"/>
            <div>
              <h1>고객님의 주문이 완료되었습니다.</h1>
              <p>주문번호: ~~~</p>
              <p>주문일자: ~~~</p>
            </div>
          </div>


          <div className={styles.payInfoHeader}>배송 정보</div>
          <div className={styles.payInfo}>
            dd
          </div>


          

          <div className={styles.shopBtnWrap}>
            <Link to="/">
              <button>쇼핑 계속하기</button>
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}
export default OrderResult;